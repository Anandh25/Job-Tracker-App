const express = require("express");
const cors = require("cors");

const app = express();

const jobRoutes = require("./routes/jobRoutes");
const authRoutes = require("./routes/authRoutes");

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/jobs", jobRoutes);
app.use("/api/auth", authRoutes);

// Health Check Route
app.get("/", (req, res) => {
  res.send("Job Tracker API is running");
});

module.exports = app;
