const express = require("express");
const router = express.Router();
const parser = require("../middleware/upload");
const { getDonationHero, updateDonationHero } = require("../controllers/donationHeroController");

// Correct routes
router.get("/", getDonationHero);
router.post("/", parser.single("backgroundImage"), updateDonationHero);

module.exports = router;
