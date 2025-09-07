require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const app = express();

const clerkWebhookRouter = require("../routes/webhook/clerk/index.js");
const resumeRouter = require("../routes/resume/index.js");
const jobRouter = require("../routes/jobapplication/index.js");
// Enable CORS
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));

// Middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use(bodyParser.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
  next();
});

// Routes
app.use("/api/webhook", clerkWebhookRouter);
app.use("/api/resume", resumeRouter);
app.use("/api/job", jobRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the backend server!");
});

// const PORT=process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// })