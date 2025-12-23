const router = require("express").Router();
const ctrl = require("../controllers/calendarController");

/* PUBLIC */
router.get("/public", ctrl.getPublicCalendarEvents);

/* ADMIN */
router.get("/admin", ctrl.getAllCalendarEvents);
router.post("/admin", ctrl.createEvent);
router.patch("/admin/:id", ctrl.updateEvent);
router.delete("/admin/:id", ctrl.deleteEvent);

module.exports = router;
