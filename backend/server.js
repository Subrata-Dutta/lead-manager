
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const leadRoutes = require("./routes/leads");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/leads", leadRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Lead Manager API is running!");
});

// Connect MongoDB and start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully!");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });
