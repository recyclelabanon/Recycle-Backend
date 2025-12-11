const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  getAboutUs,
  updateAboutUs,
} = require("../controllers/aboutUsController");

// ✅ MUST use memoryStorage
const upload = multer({ storage: multer.memoryStorage() });

// ✅ GET
router.get("/", getAboutUs);

// ✅ CREATE
router.post("/", upload.any(), updateAboutUs);

// ✅ UPDATE
router.put("/", upload.any(), updateAboutUs);

module.exports = router;
