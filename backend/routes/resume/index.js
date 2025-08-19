const express = require('express');
require("dotenv").config();
const router = express.Router();
// const {requireAuth} = require("@clerk/express")
// const {createResume,getResumeById,getAllResume,updateResume, deleteResume} = require('../../controller/resume/index');
const { saveResume,getResumeById,getAllResume,deleteResume } = require('../../controller/resume/index');


// Create a new resume
router.post('/create', saveResume);

// Get all resumes for a user
router.get('/user/:userId',getAllResume);

//Get resume by id for a user
router.get('/user/:clerkId/:resumeId',getResumeById);

router.delete('/delete/:clerkId/:resumeId', deleteResume);



module.exports = router;
