const express = require('express');
require("dotenv").config();
const router = express.Router();
// const {requireAuth} = require("@clerk/express")
// const {createResume,getResumeById,getAllResume,updateResume, deleteResume} = require('../../controller/resume/index');
const { saveResume,getResumeById } = require('../../controller/resume/autoSave');
// const { autoSaveResume } = require('../../controller/resume/autoSave')


// Create a new resume
router.post('/create', saveResume);

// Get all resumes for a user
// router.get('/user/:userId',getAllResume);

// router.patch('/update/:resumeId',updateResume);
//Get resume by id for a user
router.get('/user/:clerkId/:resumeId',getResumeById);

// router.delete('/delete/:resumeId', deleteResume);

// Auto-save route
// router.patch('/auto-save/:resumeId', autoSaveResume);

module.exports = router;
