const express = require("express");
const router = express.Router();
const multer = require("multer");
const { updateContact, getContact } = require("../controllers/contactController");

const upload = multer({ dest: "uploads/" });

// GET → Fetch Contact Data
router.get("/", getContact);

// PUT → Update Contact Info + Upload Icons
router.put(
  "/",
  upload.fields([
    { name: "iconAddress", maxCount: 1 },
    { name: "iconPhone", maxCount: 1 },
    { name: "iconEmail", maxCount: 1 },
    { name: "iconWorkingHours", maxCount: 1 },
    { name: "iconVisitUs", maxCount: 1 },
    { name: "iconShopHours", maxCount: 1 },
  ]),
  updateContact
);

module.exports = router;
