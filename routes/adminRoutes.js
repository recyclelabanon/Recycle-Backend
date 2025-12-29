const express = require("express");
const router = express.Router();

const {
  createEvent,
  getAdminEvents,
  getEventById,
  updateEvent,
  approveEvent,
  toggleCalendar,
  deleteEvent,
} = require("../controllers/eventController00");

router.get("/events", getAdminEvents);
router.post("/events", createEvent);
router.get("/events/:id", getEventById);      // 👈 Added
router.put("/events/:id", updateEvent);
router.put("/events/:id/approve", approveEvent);
router.put("/events/:id/toggle-calendar", toggleCalendar);
router.delete("/events/:id", deleteEvent);

module.exports = router;
