// routes/navbarRoutes.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const { getNavbar, updateNavbar } = require("../controllers/navbarController");

const upload = multer({ storage: multer.memoryStorage() });

// GET navbar
router.get("/", getNavbar);

// PUT navbar (admin)
router.put("/", upload.single("logo"), updateNavbar);

module.exports = router;
