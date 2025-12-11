// backend/routes/upcomingEventRoutes.js
const express = require("express");
const router = express.Router();
const {
  createUpcomingEvent,
  getUpcomingEvents,
  getSingleUpcomingEvent,
  updateUpcomingEvent,
  deleteUpcomingEvent,
} = require("../controllers/upcomingEventController");

// CRUD routes
router.post("/", createUpcomingEvent);
router.get("/", getUpcomingEvents);
router.get("/:id", getSingleUpcomingEvent);
router.put("/:id", updateUpcomingEvent);
router.delete("/:id", deleteUpcomingEvent);

module.exports = router;
