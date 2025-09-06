require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const app = express();

const clerkWebhookRouter = require("../routes/webhook/clerk/index.js");
const resumeRouter = require("../routes/resume/index.js");
const jobRouter = require("../routes/jobapplication/index.js");
// Enable CORS with a safe, dynamic origin check.
// Allow: the configured FRONTEND_URL, localhost (dev), and any vercel.app subdomain (for previews).
const normalize = (u) => (typeof u === 'string' ? u.replace(/\/$/, '') : u);
const configuredFrontend = normalize(process.env.FRONTEND_URL);
const allowedOrigins = [configuredFrontend, 'http://localhost:3000', 'http://localhost:5173', 'http://127.0.0.1:3000'];

app.use(cors({
  origin: (origin, callback) => {
    // Allow non-browser requests (like curl or server-to-server)
    if (!origin) return callback(null, true);

    const cleanedOrigin = origin.replace(/\/$/, '');
    // Allow explicit configured origin or common localhost dev ports
    if (allowedOrigins.includes(cleanedOrigin)) return callback(null, true);

    // Allow any Vercel subdomain (production and preview deployments)
    if (cleanedOrigin.endsWith('.vercel.app')) return callback(null, true);

    // Otherwise block and log for debugging
    console.warn(`Blocked CORS request from origin: ${origin}`);
    return callback(new Error('Not allowed by CORS'));
  },
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

const PORT=process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})