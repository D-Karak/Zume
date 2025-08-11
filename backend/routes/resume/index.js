const express = require('express');
require("dotenv").config();
const router = express.Router();
// const {requireAuth} = require("@clerk/express")
const {createResume,getResumeById,getAllResume,updateResume, deleteResume} = require('../../controller/resume/index')


// Create a new resume
router.post('/create', createResume);

// Get all resumes for a user
router.get('/user/:userId',getAllResume);

router.patch('/update/:resumeId',updateResume);
//Get resume by id for a user
router.get('/user/:userId/:resumeId',getResumeById);

router.delete('/delete/:resumeId', deleteResume)
module.exports = router;
