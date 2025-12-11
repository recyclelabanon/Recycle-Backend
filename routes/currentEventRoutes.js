const express = require("express");
const {
  createCurrentEvent,
  getCurrentEvents,
  getSingleCurrentEvent,
  updateCurrentEvent,
  deleteCurrentEvent,
} = require("../controllers/currentEventController");

const router = express.Router();

router.post("/", createCurrentEvent);
router.get("/", getCurrentEvents);
router.get("/:id", getSingleCurrentEvent);
router.put("/:id", updateCurrentEvent);
router.delete("/:id", deleteCurrentEvent);

module.exports = router;
