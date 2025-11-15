const express = require("express");
const router = express.Router();
const multer = require("multer");
const { getAboutUs, updateAboutUs } = require("../controllers/aboutUsController");
const upload = multer({ dest: "uploads/" });

// ✅ GET route (for frontend to fetch data)
router.get("/", getAboutUs);

// ✅ PUT route (for admin to update data)
router.put("/", upload.any(), updateAboutUs);

module.exports = router;
