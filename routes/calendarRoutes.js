const express = require("express");
const router = express.Router();
const { getPublicCalendarEvents } = require("../controllers/calendarController");

router.get("/public", getPublicCalendarEvents);

module.exports = router;
