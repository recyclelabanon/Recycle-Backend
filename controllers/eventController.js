const Event = require("../models/Event");

// Helper: determine status by dates if not provided
const computeStatus = (startDate, endDate) => {
  const now = new Date();
  if (startDate <= now && endDate >= now) return "CURRENT";
  if (startDate > now) return "UPCOMING";
  return "PAST";
};

const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ startDate: 1 });
    return res.json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const createEvent = async (req, res) => {
  try {
    const data = req.body;
    // parse dates
    const startDate = new Date(data.startDate);
    const endDate = new Date(data.endDate);
    const status = data.status || computeStatus(startDate, endDate);

    const event = new Event({
      title: data.title,
      description: data.description,
      image: data.image,
      heroImage: data.heroImage,
      startDate,
      endDate,
      location: data.location,
      status,
      spotsTotal: data.spotsTotal || 0,
      spotsRemaining: data.spotsRemaining || 0,
      highlights: data.highlights || [],
      timeline: data.timeline || [],
      media: data.media || [],
    });

    await event.save();
    res.status(201).json(event);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating event", err });
  }
};

const updateEvent = async (req, res) => {
  try {
    const update = req.body;
    if (update.startDate) update.startDate = new Date(update.startDate);
    if (update.endDate) update.endDate = new Date(update.endDate);

    if (!update.status && (update.startDate || update.endDate)) {
      const eventDoc = await Event.findById(req.params.id);
      const start = update.startDate || eventDoc.startDate;
      const end = update.endDate || eventDoc.endDate;
      update.status = computeStatus(new Date(start), new Date(end));
    }

    const updated = await Event.findByIdAndUpdate(req.params.id, update, { new: true });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating event", err });
  }
};

const deleteEvent = async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: "Event deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting event", err });
  }
};

const getCurrentEvents = async (req, res) => {
  try {
    const now = new Date();
    const events = await Event.find({ startDate: { $lte: now }, endDate: { $gte: now } }).sort({ startDate: 1 });
    res.json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const getUpcomingEvents = async (req, res) => {
  try {
    const now = new Date();
    const events = await Event.find({ startDate: { $gt: now } }).sort({ startDate: 1 });
    res.json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const getPastEvents = async (req, res) => {
  try {
    const now = new Date();
    const events = await Event.find({ endDate: { $lt: now } }).sort({ startDate: -1 });
    res.json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  getCurrentEvents,
  getUpcomingEvents,
  getPastEvents,
};
