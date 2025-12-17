const express = require("express");
const router = express.Router();
const volunteerUpload = require("../middleware/volunteerUpload");
const ctrl = require("../controllers/volunteerController");

// Apply
router.post(
  "/apply",
  volunteerUpload.fields([
    { name: "cv", maxCount: 1 },
    { name: "portfolio", maxCount: 1 },
  ]),
  ctrl.apply
);

// Admin
router.get("/admin", ctrl.getApplications);
router.patch("/admin/:id/status", ctrl.updateStatus);
router.delete("/admin/:id", ctrl.deleteApplication);

module.exports = router;
