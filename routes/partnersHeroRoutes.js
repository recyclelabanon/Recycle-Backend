const express = require("express");
const { getPartnersHero, updatePartnersHero } = require("../controllers/partnersHeroController");

const router = express.Router();

router.get("/", getPartnersHero);
router.put("/", updatePartnersHero);

module.exports = router;
