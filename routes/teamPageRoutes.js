// routes/teamPageRoutes.js
const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");

const {
  getTeamPage,
  updateTeamPage,
} = require("../controllers/teamPageController");

router.get("/", getTeamPage);

router.post("/update", upload.any(), updateTeamPage);

module.exports = router;





