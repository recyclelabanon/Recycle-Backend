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
const multer = require("multer");

const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

// Safe optional upload middleware
const optionalUpload = (req, res, next) => {
  upload.single("backgroundImage")(req, res, (err) => {
    if (err) {
      console.error("Multer error:", err);
      return res.status(400).json({
        message: err.message,
      });
    }
    next();
  });
};

const {
  getDonationHero,
  updateDonationHero,
} = require("../controllers/donationHeroController");

router.get("/", getDonationHero);
router.put("/", optionalUpload, updateDonationHero);

module.exports = router;
