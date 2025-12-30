/*const express = require("express");
const router = express.Router();
const parser = require("../middleware/upload");
const { getDonationHero, updateDonationHero } = require("../controllers/donationHeroController");


router.get("/", getDonationHero);
router.post("/", parser.single("backgroundImage"), updateDonationHero)

module.exports = router;*/











/*const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const {
  getDonationHero,
  updateDonationHero,
} = require("../controllers/donationHeroController");

// Public
router.get("/", getDonationHero);

// Admin
router.put(
  "/",
  upload.single("backgroundImage"),
  updateDonationHero
);

module.exports = router;*/












const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");

const {
  getDonationHero,
  updateDonationHero,
} = require("../controllers/donationHeroController");

router.get("/", getDonationHero);
router.put("/", upload.single("backgroundImage"), updateDonationHero);

module.exports = router;
