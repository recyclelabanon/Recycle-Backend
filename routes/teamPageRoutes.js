// routes/teamPageRoutes.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const {
  getTeamPage,
  updateTeamPage,
} = require("../controllers/teamPageController");

router.get("/", getTeamPage);

router.post("/update", upload.any(), updateTeamPage);

module.exports = router;





