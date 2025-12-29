const express = require("express");
const router = express.Router();
const { getPublicCalendarEvents, getPublicEventById } = require("../controllers/calendarController");

router.get("/public", getPublicCalendarEvents);
router.get("/public/:id", getPublicEventById);

module.exports = router;
