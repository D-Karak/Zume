const { PrismaClient } = require('../../generated/prisma');
const prisma = new PrismaClient();

// Create Job Application
const createJob = async (req, res) => {
    try {
        const { clerkId } = req.params;
        const { jobTitle, company, position, applyDate, lastUpdate, status, resumeId } = req.body;

        const user = await prisma.user.findUnique({ where: { clerkId } });
        if (!user) return res.status(404).json({ message: "User not found" });

        const job = await prisma.jobApplication.create({
            data: {
                jobTitle,
                company,
                position,
                applyDate: new Date(applyDate),
                lastUpdate: new Date(lastUpdate),
                status,
                resumeId,
                userId: user.id,
            },
        });

        res.json(job);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get All Jobs for a User
const getJobs = async (req, res) => {
    try {
        const { clerkId } = req.params;

        const user = await prisma.user.findUnique({
            where: { clerkId },
            include:{
                jobApplication:true
            }
        });
        // if(user)console.log(user)
        if (!user) return res.status(404).json({ message: "User not found" });

        res.json(user.jobApplication);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update Job
const updateJob = async (req, res) => {
    try {
        const { jobId, clerkId } = req.params;
        const data = req.body;

        const user = await prisma.user.findUnique({ where: { clerkId } });
        if (!user) return res.status(404).json({ message: "User not found" });

        const updated = await prisma.jobApplication.update({
            where: { id: jobId },
            data: {
                ...data,
                applyDate: new Date(data.applyDate),
                lastUpdate: new Date(data.lastUpdate),
            },
        });

        res.json(updated);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete Job
const deleteJob = async (req, res) => {
    try {
        const { jobId, clerkId } = req.params;

        const user = await prisma.user.findUnique({ where: { clerkId } });
        if (!user) return res.status(404).json({ message: "User not found" });

        await prisma.jobApplication.delete({ where: { id: jobId } });

        res.json({ message: "Job deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    createJob,
    getJobs,
    updateJob,
    deleteJob
};