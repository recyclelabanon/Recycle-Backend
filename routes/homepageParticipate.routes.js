const express = require("express");
const router = express.Router();
const {
  getParticipate,
  saveParticipateData,
  uploadParticipateImage
} = require("../controllers/homepageParticipate.controller");

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

// ✅ Routes
router.get("/", getParticipate);
router.post("/", saveParticipateData);
router.post("/upload", upload.single("image"), uploadParticipateImage);

module.exports = router;
