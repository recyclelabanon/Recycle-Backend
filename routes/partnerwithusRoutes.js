const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/partnerwithusController");

// Apply
router.post("/apply", ctrl.apply);

// Admin
router.get("/admin", ctrl.getApplications);
router.patch("/admin/:id/status", ctrl.updateStatus);
router.delete("/admin/:id", ctrl.deleteApplication);

module.exports = router;
