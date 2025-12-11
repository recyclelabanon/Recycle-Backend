const express = require("express");
const router = express.Router();
const multer = require("multer");

// Use memory storage so Cloudinary can process buffer
const storage = multer.memoryStorage();
const upload = multer({ storage });


const {
  getTeampartnersPage,
  updateTeampartnersPage
} = require("../controllers/teampartnersPageController");

router.get("/", getTeampartnersPage);

router.put(
  "/update",
  upload.fields([
    { name: "heroBackground", maxCount: 1 },
    { name: "coalitions" },
    { name: "donors" },
    { name: "governmentPartners" },
    { name: "projectPartners" }
  ]),
  updateTeampartnersPage
);


module.exports = router;
