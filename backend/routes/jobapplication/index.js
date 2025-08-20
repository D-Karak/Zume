const express = require("express");
const { createJob, getJobs, updateJob, deleteJob } = require("../../controller/jobapplication/index");

const router = express.Router();

router.post("/:clerkId", createJob);
router.get("/:clerkId", getJobs);
router.put("/:clerkId/:jobId", updateJob);
router.delete("/:clerkId/:jobId", deleteJob);

module.exports = router;
