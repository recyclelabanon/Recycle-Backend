/*const express = require("express");
const router = express.Router();
const multer = require("multer");
const { updateContact, getContact } = require("../controllers/contactController");

const upload = multer({ dest: "uploads/" });

router.get("/", getContact)

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

module.exports = router;*/





const express = require("express");
const router = express.Router();
const multer = require("multer");
const { getContact, updateContact } = require("../controllers/contactController");

const storage = multer.memoryStorage();
const upload = multer({ storage });

// GET → fetch contact info
router.get("/", getContact);

// PUT → update contact info (admin)
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
