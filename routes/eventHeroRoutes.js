const express = require("express");
const { getHero, updateHero } = require("../controllers/eventHeroController");
const router = express.Router();

router.get("/", getHero);
router.put("/", updateHero);

module.exports = router;
