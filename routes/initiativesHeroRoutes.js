const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

const { getHero, updateHero } = require("../controllers/initiativesHeroController");

router.get("/", getHero);
router.post("/", upload.single("backgroundImage"), updateHero);

module.exports = router;
