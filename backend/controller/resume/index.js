const { PrismaClient } = require('../../generated/prisma');
const prisma = new PrismaClient();
const path = require('path');
const { del, put } = require("@vercel/blob");
const { get } = require('http');

const saveResume = async (req, res) => {
  const { clerkId, resumeId, photo, workExperiences, educations, ...resumeData } = req.body;
  console.log("Received data:", req.body);
  try {
    if (!clerkId) {
      return res.status(400).json({ message: "Clerk ID is required" });
    }

    const user = await prisma.user.findUnique({
      where: { clerkId }
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if resume exists
    const existingResume = resumeId ? await prisma.resume.findUnique({
      where: { id: resumeId }
    }) : null;

    // Handle photo upload...
    let photoUrl = existingResume?.photoUrl || null;
    if (photo) {
      // Extract extension from base64 header
      const match = photo.match(/^data:image\/(\w+);base64,/);
      if (!match) {
        return res.status(400).json({ message: "Invalid image format" });
      }
      const extension = "." + match[1];

      // Convert base64 to Buffer
      const base64Data = photo.replace(/^data:image\/\w+;base64,/, "");
      const photoBuffer = Buffer.from(base64Data, "base64");

      // Delete old photo if exists
      if (photoUrl) {
        await del(photoUrl);
      }

      // Upload to Vercel Blob
      const blobKey = `resume_photos/${user.id}${extension}`;
      const blob = await put(blobKey, photoBuffer, { access: "public", allowOverwrite: true });
      photoUrl = blob.url;
    } else if (photoUrl === null || undefined) {
      if (existingResume?.photoUrl) {
        // If a photo already exists, delete it
        await del(existingResume.photoUrl);
      }
      photoUrl = null;
    }

    // Create or update resume
    if (existingResume) {
      const updatedResume = await prisma.resume.update({
        where: { id: resumeId },
        data: {
          ...resumeData,
          photoUrl,
          workExperiences: {
            deleteMany: {},
            create: workExperiences?.map(exp => ({
              ...exp,
              startDate: exp.startDate ? new Date(exp.startDate) : null,
              endDate: exp.endDate ? new Date(exp.endDate) : null,
            }))
          },
          educations: {
            deleteMany: {},
            create: educations?.map(edu => ({
              ...edu,
              startDate: edu.startDate ? new Date(edu.startDate) : null,
              endDate: edu.endDate ? new Date(edu.endDate) : null,
            }))
          },
          updatedAt: new Date()
        }
      });
      return res.status(200).json(updatedResume);
    } else {
      const newResume = await prisma.resume.create({
        data: {
          ...resumeData,
          userId: user.id,
          photoUrl,
          workExperiences: {
            create: workExperiences?.map(exp => ({
              ...exp,
              startDate: exp.startDate ? new Date(exp.startDate) : null,
              endDate: exp.endDate ? new Date(exp.endDate) : null,
            }))
          },
          educations: {
            create: educations?.map(edu => ({
              ...edu,
              startDate: edu.startDate ? new Date(edu.startDate) : null,
              endDate: edu.endDate ? new Date(edu.endDate) : null,
            }))
          }
        }
      });
      return res.status(201).json(newResume);
    }
  } catch (error) {
    console.error('Error saving resume:', error);
    return res.status(500).json({ message: "Error saving resume", error: error.message });
  }
};


const getResumeById = async (req, res) => {
  const { clerkId, resumeId } = req.params;
  // console.log(clerkId, resumeId);
  try {
    if (!clerkId || !resumeId) {
      return res.status(400).json({ message: "Clerk ID and Resume ID are required" });
    }
    const user = await prisma.user.findUnique({
      where: { clerkId }
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const resume = await prisma.resume.findUnique({
      where: { id: resumeId, userId: user.id },
      include: {
        workExperiences: true,
        educations: true
      }
    });
    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }
    res.status(200).json({ message: "Resume fetched successfully", resume });
  } catch (error) {
    console.error('Error fetching resume:', error);
    res.status(500).json({ message: "Error fetching resume", error: error.message });
  }
}

const getAllResume = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await prisma.user.findUnique({
      where: { clerkId: userId }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const resumes = await prisma.resume.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
      include: {
        workExperiences: true,
        educations: true
      }
    });
    if (resumes.length === 0) {
      return res.status(404).json({ message: "No resumes found for this user" });
    }
    const totalResumes = await prisma.resume.count({
      where: { userId: user.id }
    });
    res.status(200).json({ message: "Resumes fetched successfully", resumes, totalResumes });
  } catch (error) {
    console.error('Error fetching resumes:', error);
    res.status(500).json({ error: 'Failed to fetch resumes' });
  }
}

const deleteResume = async (req, res) => {
  try {
    const { resumeId, clerkId } = req.params;

    if (!clerkId) {
      return res.status(400).json({ message: "User is not found" });
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: clerkId },
    });

    if (!resumeId) {
      return res.status(400).json({ message: "Resume ID is required" });
    }

    // Delete child records first (parallelized)
    await Promise.all([
      prisma.workExperience.deleteMany({
        where: { resumeId },
      }),
      prisma.education.deleteMany({
        where: { resumeId },
      }),
    ]);

    // Now delete the resume itself
    const deletedResume = await prisma.resume.delete({
      where: { id: resumeId },
    });

    res.status(200).json({
      message: "Resume deleted successfully",
      resume: deletedResume,
    });
  } catch (error) {
    console.error("Error deleting resume:", error);
    res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};


module.exports = { saveResume, getResumeById, getAllResume, deleteResume };