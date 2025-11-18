// server/index.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/bugtracker";
mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("MongoDB error:", err));

// ✅ Define Bug Schema
const bugSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: String,
  status: { type: String, enum: ["open", "in-progress", "resolved"], default: "open" },
  priority: { type: String, enum: ["low", "medium", "high"], default: "medium" },
  createdAt: { type: Date, default: Date.now },
});

const Bug = mongoose.model("Bug", bugSchema);

// ✅ API Routes
app.get("/api/bugs", async (req, res) => {
  const bugs = await Bug.find().sort({ createdAt: -1 });
  res.json(bugs);
});

app.post("/api/bugs", async (req, res) => {
  try {
    const bug = new Bug(req.body);
    await bug.save();
    res.status(201).json(bug);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put("/api/bugs/:id", async (req, res) => {
  try {
    const bug = await Bug.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!bug) return res.status(404).json({ error: "Bug not found" });
    res.json(bug);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete("/api/bugs/:id", async (req, res) => {
  try {
    const deleted = await Bug.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Bug not found" });
    res.json({ message: "Bug deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}

module.exports = app; // for testing
