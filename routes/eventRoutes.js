const express = require("express");
const router = express.Router();
const {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  getCurrentEvents,
  getUpcomingEvents,
  getPastEvents,
  getAllRegistrations,
  updateRegistrationStatus,
} = require("../controllers/eventController");

// public endpoints
router.get("/", getAllEvents);
router.get("/current", getCurrentEvents);
router.get("/upcoming", getUpcomingEvents);
router.get("/past", getPastEvents);
router.get("/:id", getEventById);

// admin (create/update/delete)
router.post("/", createEvent);
router.put("/:id", updateEvent);
router.delete("/:id", deleteEvent);

// global registrations admin
router.get("/registrations/admin", getAllRegistrations);
router.patch("/registrations/admin/:id/status", updateRegistrationStatus);

module.exports = router;
