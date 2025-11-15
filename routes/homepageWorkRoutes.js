const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const { getHomepageWork, updateHomepageWork } = require("../controllers/homepageWorkController");

router.get("/", getHomepageWork);

router.put("/", upload.any(), updateHomepageWork);

module.exports = router;
