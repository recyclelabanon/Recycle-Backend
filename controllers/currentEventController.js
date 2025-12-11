const CurrentEvent = require("../models/CurrentEvent");

// CREATE event
const createCurrentEvent = async (req, res) => {
  try {
    const event = await CurrentEvent.create(req.body);
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET all events
const getCurrentEvents = async (req, res) => {
  try {
    const events = await CurrentEvent.find().sort({ createdAt: -1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET single event
const getSingleCurrentEvent = async (req, res) => {
  try {
    const event = await CurrentEvent.findById(req.params.id);
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE
const updateCurrentEvent = async (req, res) => {
  try {
    const updated = await CurrentEvent.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE
const deleteCurrentEvent = async (req, res) => {
  try {
    await CurrentEvent.findByIdAndDelete(req.params.id);
    res.json({ message: "Event deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createCurrentEvent,
  getCurrentEvents,
  getSingleCurrentEvent,
  updateCurrentEvent,
  deleteCurrentEvent,
};
