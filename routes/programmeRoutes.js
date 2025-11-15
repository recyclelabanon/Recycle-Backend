const express = require("express");
const router = express.Router();
const {
  createProgramme,
  getProgrammes,
  getProgrammeById,
  updateProgramme,
  deleteProgramme,
} = require("../controllers/programmeController");

// ✅ import upload from cloudinary config
const { upload } = require("../config/cloudinary");

router.post("/", upload.single("icon"), createProgramme);
router.get("/", getProgrammes);
router.get("/:id", getProgrammeById);
router.put("/:id", upload.single("icon"), updateProgramme);
router.delete("/:id", deleteProgramme);

module.exports = router;
