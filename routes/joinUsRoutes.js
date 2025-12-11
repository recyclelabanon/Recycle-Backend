const express = require("express");
const {
  getJoinUs,
  updateJoinUs,
} = require("../controllers/joinUsController");

const router = express.Router();

// Public route
router.get("/", getJoinUs);

// Admin panel route
router.put("/", updateJoinUs);

module.exports = router;
