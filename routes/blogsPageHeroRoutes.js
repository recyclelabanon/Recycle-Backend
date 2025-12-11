const express = require("express");
const router = express.Router();
const multer = require("multer");
const { getHero, updateHero } = require("../controllers/blogsPageHeroController");

// Multer for file upload (memory storage)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Public route to GET hero
router.get("/", getHero);

// Admin route to UPDATE hero
router.put("/", upload.single("backgroundImage"), updateHero);

module.exports = router;
