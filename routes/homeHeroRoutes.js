const express = require("express");
const router = express.Router();
const { upload } = require("../config/multer");
const heroController = require("../controllers/homeHeroController");
const { getHeroPublic } = require("../controllers/homeHeroController");

// Public GET
router.get("/public", getHeroPublic);

// Public GET hero admin form data
router.get("/", heroController.getHero);

// Public PUT — remove authenticateUser & isAdmin
router.put("/", upload.single("backgroundImage"), heroController.updateHero);

module.exports = router;
