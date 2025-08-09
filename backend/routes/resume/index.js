const express = require('express');
const router = express.Router();
const { PrismaClient } = require('../../generated/prisma');

const prisma = new PrismaClient();

// Create a new resume
router.post('/create', async (req, res) => {
  try {
    console.log('Received resume creation request:', req.body);
    const { userId, ...resumeData } = req.body;

    if (!userId) {
      console.error('No userId provided');
      return res.status(400).json({ error: 'userId is required' });
    }

    console.log('Looking up user with ID:', userId);
    // Try to find or create the user
    let user = await prisma.user.findUnique({
      where: { clerkId: userId }
    });

    if (!user) {
      console.log('User not found, creating new user with clerkId:', userId);
      // Create a new user if they don't exist
      try {
        user = await prisma.user.create({
          data: {
            clerkId: userId,
            email: resumeData.email, // Use the email from the resume
            firstName: resumeData.fullName.split(' ')[0], // Extract first name
            lastName: resumeData.fullName.split(' ').slice(1).join(' ') // Extract last name
          }
        });
        console.log('Created new user:', user);
      } catch (error) {
        console.error('Failed to create user:', error);
        return res.status(500).json({ error: 'Failed to create user' });
      }
    }

    console.log('Creating resume for user:', user.email);
    // Create resume
    const resume = await prisma.resume.create({
      data: {
        ...resumeData,
        userId: user.id, // Use the database user ID, not the Clerk ID
        // Convert skills to array if it's a string
        skills: Array.isArray(resumeData.skills) ? resumeData.skills : resumeData.skills.split(',').map(s => s.trim())
      }
    });

    console.log('Resume created successfully:', resume);
    res.status(201).json(resume);
  } catch (error) {
    console.error('Error creating resume:', {
      error: error.message,
      stack: error.stack,
      userId: req.body.userId
    });
    
    // Send appropriate error response based on error type
    if (error.code === 'P2002') {
      res.status(409).json({ error: 'A resume with this information already exists' });
    } else if (error.code === 'P2003') {
      res.status(400).json({ error: 'Invalid user ID provided' });
    } else {
      res.status(500).json({ error: 'Failed to create resume', details: error.message });
    }
  }
});

// Get all resumes for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const resumes = await prisma.resume.findMany({
      where: { userId }
    });
    res.json(resumes);
  } catch (error) {
    console.error('Error fetching resumes:', error);
    res.status(500).json({ error: 'Failed to fetch resumes' });
  }
});

module.exports = router;
