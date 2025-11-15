const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const {
  getAllTeams,
  getTeamById,
  createTeam,
  updateTeam,
  deleteTeam,
} = require("../controllers/teamController");

router.get("/", getAllTeams);
router.get("/:id", getTeamById);
router.post("/", upload.single("profilePic"), createTeam);
router.put("/:id", upload.single("profilePic"), updateTeam);
router.delete("/:id", deleteTeam);

module.exports = router;
