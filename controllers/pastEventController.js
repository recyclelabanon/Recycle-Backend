const PastEvent = require("../models/PastEvent");

const getPastEvents = async (req, res) => {
  try {
    const events = await PastEvent.find().sort({ createdAt: -1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createPastEvent = async (req, res) => {
  try {
    const event = new PastEvent(req.body);
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updatePastEvent = async (req, res) => {
  try {
    const event = await PastEvent.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deletePastEvent = async (req, res) => {
  try {
    const event = await PastEvent.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json({ message: "Event deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getPastEvents,
  createPastEvent,
  updatePastEvent,
  deletePastEvent,
};
