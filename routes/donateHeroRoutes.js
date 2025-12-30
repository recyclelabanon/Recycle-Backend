const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");

const {
  getDonateHero,
  updateDonateHero,
} = require("../controllers/donateHeroController");

// PUBLIC
router.get("/", getDonateHero);

// ADMIN — with image upload
router.put("/update", upload.single("backgroundImage"), updateDonateHero);

module.exports = router;
