
const express = require("express");
const router = express.Router();
const Lead = require("../models/Lead");
const verifyToken = require("../middleware/verifyToken");

// Protect all lead routes
router.use(verifyToken);

// GET: Only show the logged-in user's leads
router.get("/", async (req, res) => {
  try {
    const leads = await Lead.find({
      owner: req.user.uid,
    }).sort({ createdAt: -1 });

    res.json(leads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST: Add a lead belonging to the logged-in user
router.post("/", async (req, res) => {
  try {
    const lead = new Lead({
      ...req.body,
      owner: req.user.uid,
    });

    const savedLead = await lead.save();
    res.status(201).json(savedLead);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT: Update only the logged-in user's lead
router.put("/:id", async (req, res) => {
  try {
    const { owner, ...updates } = req.body;

    const updatedLead = await Lead.findOneAndUpdate(
      {
        _id: req.params.id,
        owner: req.user.uid,
      },
      updates,
      { new: true, runValidators: true }
    );

    if (!updatedLead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    res.json(updatedLead);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE: Delete only the logged-in user's lead
router.delete("/:id", async (req, res) => {
  try {
    const deletedLead = await Lead.findOneAndDelete({
      _id: req.params.id,
      owner: req.user.uid,
    });

    if (!deletedLead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    res.json({ message: "Lead deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
