const Event = require("../models/EventCalendar");

// Create
exports.createEvent = async (req, res) => {
  try {
    const event = await Event.create(req.body);
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: "Event create failed", error: err.message });
  }
};

// Read (Admin)
exports.getAdminEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: "Fetch failed", error: err.message });
  }
};

// Read (Public Event Page)
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json(event);
  } catch (err) {
    res.status(500).json({ message: "Load event failed", error: err.message });
  }
};

// Update (General Edit)
exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err.message });
  }
};

// Approve
exports.approveEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      { status: "approved" },
      { new: true }
    );
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: "Approve failed", error: err.message });
  }
};

// Toggle Calendar Visibility
exports.toggleCalendar = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    event.showOnCalendar = !event.showOnCalendar;
    await event.save();
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: "Toggle failed", error: err.message });
  }
};
// Delete
exports.deleteEvent = async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: "Event deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed", error: err.message });
  }
};
