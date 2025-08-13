const { PrismaClient } = require('../../generated/prisma');
const prisma = new PrismaClient();
//create resume

const createResume = async (req, res) => {
  try {
    const { clerkId } = req.body;

    if (!clerkId) {
      return res.status(400).json({ message: "ClerkId is required" });
    }

    //  Find the user
    const user = await prisma.user.findUnique({
      where: { clerkId }
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const emptyResumeData = {
      jobTitle: "",
      fullName: "",
      email: "",
      phone: "",
      country: "",
      state: "",
      city: "",
      linkedinUrl: "",
      personalSite: "",
      skills: []
    };

    // Create an empty resume
    const resume = await prisma.resume.create({
      data: {
        userId: user.id,
        ...emptyResumeData,
        skills: [],

        // Initialize empty arrays for experiences and education
        workExperiences: {
          create: []
        },
        educations: {
          create: []
        }
      }
    });

    // Send just the resume data
    res.status(201).json(resume);

  } catch (error) {
    console.error("Something went wrong", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllResume=  async (req, res) => {
  try {
    const  {userId}  = req.params;
    const user = await prisma.user.findUnique({
        where: { clerkId: userId }
    });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const resumes = await prisma.resume.findMany({
      where: { userId: user.id }
    });
    res.status(200).json(resumes);
  } catch (error) {
    console.error('Error fetching resumes:', error);
    res.status(500).json({ error: 'Failed to fetch resumes' });
  }
}

 const getResumeById = async (req, res) => {
  try {
    const { resumeId } = req.params; 
    if (!resumeId) {
      return res.status(400).json({ message: "Resume ID is required" });
    }

    const resume = await Resume.findById(resumeId);

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    res.status(200).json(resume);
  } catch (error) {
    console.error("Error fetching resume:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateResume = async (req, res) => {
  try {
    const { resumeId } = req.params;
    const { resumeData, workExperiences, educations } = req.body;

    if (!resumeId) {
      return res.status(400).json({ message: "Resume ID is required" });
    }

    const dataToUpdate = {};

    // Resume basic info update only if sent
    if (resumeData) {
      Object.assign(dataToUpdate, {
        jobTitle: resumeData?.jobTitle,
        fullName: resumeData?.fullName,
        email: resumeData?.email,
        phone: resumeData?.phone,
        country: resumeData?.country,
        state: resumeData?.state,
        city: resumeData?.city,
        linkedinUrl: resumeData?.linkedinUrl,
        personalSite: resumeData?.personalSite,
        skills: resumeData?.skills
      });
    }

    // Work experiences update only if sent
    if (workExperiences) {
      dataToUpdate.workExperiences = {
        deleteMany: {},
        create: workExperiences.map(exp => ({
          position: exp.position,
          company: exp.company,
          startDate: exp.startDate ? new Date(exp.startDate) : null,
          endDate: exp.endDate ? new Date(exp.endDate) : null,
          description: exp.description
        }))
      };
    }

    // Educations update only if sent
    if (educations) {
      dataToUpdate.educations = {
        deleteMany: {},
        create: educations.map(edu => ({
          degree: edu.degree,
          university: edu.school,
          startDate: edu.startDate ? new Date(edu.startDate) : null,
          endDate: edu.endDate ? new Date(edu.endDate) : null
        }))
      };
    }

    const updatedResume = await prisma.resume.update({
      where: { id: resumeId },
      data: dataToUpdate,
      include: {
        workExperiences: true,
        educations: true
      }
    });

    res.status(200).json({ message: "Resume updated successfully", resume: updatedResume });
  } catch (error) {
    console.error("Error updating resume:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


const deleteResume = async (req, res) => {
  try {
    const { resumeId } = req.params;
    if (!resumeId) {
      return res.status(400).json({ message: "Resume ID is required" });
    }
    const deletedResume = await prisma.resume.delete({
      where: { id: resumeId }
    });
    res.status(200).json({ message: "Resume deleted successfully", resume: deletedResume });
  } catch (error) {
    console.error("Error deleting resume:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }}
module.exports={createResume,getAllResume,getResumeById,updateResume,deleteResume}