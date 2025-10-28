const express = require("express");
const Opportunity = require("../models/Opportunity");
const router = express.Router();

// Get all opportunities
router.get("/", async (req, res) => {
  try {
    const data = await Opportunity.find();
    res.json(data);
  } catch (err) {
    console.error("🔥 Error fetching opportunities:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Add a new opportunity
router.post("/", async (req, res) => {
  try {
    const newItem = new Opportunity(req.body);
    await newItem.save();
    res.json(newItem);
  } catch (err) {
    console.error("🔥 Error adding opportunity:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Delete opportunity
router.delete("/:id", async (req, res) => {
  try {
    await Opportunity.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error("🔥 Error deleting opportunity:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
