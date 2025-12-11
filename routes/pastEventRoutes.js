const express = require("express");
const router = express.Router();
const {
  getPastEvents,
  createPastEvent,
  updatePastEvent,
  deletePastEvent,
} = require("../controllers/pastEventController");

router.get("/", getPastEvents);
router.post("/", createPastEvent);
router.put("/:id", updatePastEvent);
router.delete("/:id", deletePastEvent);

module.exports = router;
