const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const {
  getBlogHero,
  saveBlogHero,
} = require("../controllers/blogHeroController");

// Public
router.get("/", getBlogHero);

// Admin
router.post("/", upload.single("backgroundImage"), saveBlogHero);

module.exports = router;
