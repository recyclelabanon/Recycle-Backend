const Event = require("../models/EventCalendar");

exports.getPublicCalendarEvents = async (req, res) => {
  try {
    const events = await Event.find({
      status: "approved",
      visibility: "public",
      showOnCalendar: true,
    }).sort({ startDate: 1 });

    res.json(events);
  } catch (err) {
    res.status(500).json({ message: "Calendar load failed", error: err.message });
  }
};
exports.getPublicEventById = async (req, res) => {
  try {
    const event = await Event.findOne({
      _id: req.params.id,
      status: "approved",
      visibility: "public"
    });

    if (!event) return res.status(404).json({ message: "Event not found or not public" });
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: "Event load failed", error: err.message });
  }
};
