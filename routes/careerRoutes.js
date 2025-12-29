const express = require("express");
const router = express.Router();
const careerUpload = require("../middleware/careerUpload");
const ctrl = require("../controllers/careerController");

router.get("/roles", ctrl.getRoles);

router.post(
  "/apply",
  careerUpload.fields([
    { name: "resume", maxCount: 1 },
    { name: "portfolio", maxCount: 1 },
  ]),
  ctrl.apply
);

router.get("/admin/applications", ctrl.getApplications);
router.patch("/admin/applications/:id/status", ctrl.updateStatus);
router.delete("/admin/applications/:id", ctrl.deleteApplication);

// Admin Role Management
router.post("/admin/roles", ctrl.createRole);
router.delete("/admin/roles/:id", ctrl.deleteRole);


module.exports = router;
