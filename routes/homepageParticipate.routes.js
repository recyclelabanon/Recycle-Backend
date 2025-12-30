const express = require("express");
const router = express.Router();
const {
  getParticipate,
  saveParticipateData,
  uploadParticipateImage
} = require("../controllers/homepageParticipate.controller");

// Use the memory storage middleware (no disk writes)
const upload = require("../middleware/uploadMiddleware");

// ✅ Routes
router.get("/", getParticipate);
router.post("/", saveParticipateData);
router.post("/upload", upload.single("image"), uploadParticipateImage);

module.exports = router;
