const express = require("express");
const router = express.Router();
const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });

const {
  getHomepageWork,
  updateHomepageWork
} = require("../controllers/homepageWorkController");

router.get("/", getHomepageWork);

// ✔ Accept multiple dynamic image fields
router.put("/", upload.any(), updateHomepageWork);

module.exports = router;
