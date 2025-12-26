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
