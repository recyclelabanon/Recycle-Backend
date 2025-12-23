const CalendarEvent = require("../models/CalendarEvent");

/* PUBLIC CALENDAR */
exports.getPublicCalendarEvents = async (req, res) => {
  try {
    const events = await CalendarEvent.find({
      approved: true,
      visibility: "public",
    }).sort("startDate");

    res.json(events);
  } catch (err) {
    res.status(500).json({ message: "Failed to load calendar events" });
  }
};

/* ADMIN */
exports.getAllCalendarEvents = async (req, res) => {
  const events = await CalendarEvent.find().sort("-createdAt");
  res.json(events);
};

exports.createEvent = async (req, res) => {
  const event = await CalendarEvent.create(req.body);
  res.status(201).json(event);
};

exports.updateEvent = async (req, res) => {
  const event = await CalendarEvent.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(event);
};

exports.deleteEvent = async (req, res) => {
  await CalendarEvent.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};
