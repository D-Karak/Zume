require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app= express();

const clerkWebhookRouter = require("../routes/webhook/clerk/index.js");

app.use(express.json());

app.use("/api/webhook", clerkWebhookRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the backend server!");
});

const PORT=process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})