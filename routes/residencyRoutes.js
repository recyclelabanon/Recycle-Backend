const express = require("express");
const router = express.Router();

const {
  applyResidency,
  getApplications,
} = require("../controllers/residencyController");

router.post("/:id/apply", applyResidency);
router.get("/applications", getApplications);

module.exports = router;
