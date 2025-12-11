const express = require("express");
const router = express.Router();
const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });

const heroController = require("../controllers/homeHeroController");

router.get("/public", heroController.getHeroPublic);
router.get("/", heroController.getHero);
router.put("/", upload.single("backgroundImage"), heroController.updateHero);

module.exports = router;
