const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/partnerwithusController");

// Public
router.post("/apply", ctrl.apply);
router.get("/settings", ctrl.getSettings);

// Admin: Categories/Settings
router.post("/admin/types", ctrl.createType);
router.delete("/admin/types/:id", ctrl.deleteType);
router.post("/admin/interests", ctrl.createInterest);
router.delete("/admin/interests/:id", ctrl.deleteInterest);

// Admin: Applications
router.get("/admin/applications", ctrl.getApplications);
router.patch("/admin/applications/:id/status", ctrl.updateStatus);
router.delete("/admin/applications/:id", ctrl.deleteApplication);

module.exports = router;
