require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const plansRoutes = require("./routes/plans.routes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
  })
  .catch((err) => {
    console.log("❌ MongoDB Error:", err);
  });

// Routes
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Backend Running Successfully",
  });
});

app.use("/api/plans", plansRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});