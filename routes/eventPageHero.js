const express = require("express");
const router = express.Router();
const { getHero, createOrUpdateHero, upload } = require("../controllers/eventPageHeroController");

// GET hero
router.get("/", getHero);

// POST / PUT hero with image upload
router.post("/", upload.single("backgroundImage"), createOrUpdateHero);
router.put("/:id", upload.single("backgroundImage"), createOrUpdateHero);

module.exports = router;
