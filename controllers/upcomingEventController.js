// backend/controllers/upcomingEventController.js
const UpcomingEvent = require("../models/UpcomingEvent");

// CREATE
const createUpcomingEvent = async (req, res) => {
  try {
    const event = await UpcomingEvent.create(req.body);
    return res.status(201).json(event);
  } catch (err) {
    console.error("Create UpcomingEvent error:", err);
    return res.status(400).json({ message: err.message });
  }
};

// READ ALL
const getUpcomingEvents = async (req, res) => {
  try {
    const events = await UpcomingEvent.find().sort({ createdAt: -1 });
    return res.json(events);
  } catch (err) {
    console.error("Get UpcomingEvents error:", err);
    return res.status(500).json({ message: err.message });
  }
};

// READ SINGLE
const getSingleUpcomingEvent = async (req, res) => {
  try {
    const event = await UpcomingEvent.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Not found" });
    return res.json(event);
  } catch (err) {
    console.error("Get single UpcomingEvent error:", err);
    return res.status(500).json({ message: err.message });
  }
};

// UPDATE
const updateUpcomingEvent = async (req, res) => {
  try {
    const updated = await UpcomingEvent.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Not found" });
    return res.json(updated);
  } catch (err) {
    console.error("Update UpcomingEvent error:", err);
    return res.status(400).json({ message: err.message });
  }
};

// DELETE
const deleteUpcomingEvent = async (req, res) => {
  try {
    await UpcomingEvent.findByIdAndDelete(req.params.id);
    return res.json({ message: "Event deleted" });
  } catch (err) {
    console.error("Delete UpcomingEvent error:", err);
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createUpcomingEvent,
  getUpcomingEvents,
  getSingleUpcomingEvent,
  updateUpcomingEvent,
  deleteUpcomingEvent,
};
