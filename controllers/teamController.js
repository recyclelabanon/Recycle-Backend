const Team = require("../models/Team");
const cloudinary = require("../utils/cloudinary");

// ✅ Get All Team Members
exports.getAllTeams = async (req, res) => {
  try {
    const teams = await Team.find();
    res.status(200).json(teams);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get Single Member by ID
exports.getTeamById = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) return res.status(404).json({ message: "Team member not found" });
    res.status(200).json(team);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Add New Member
exports.createTeam = async (req, res) => {
  try {
    let uploadedImage = null;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "team",
      });
      uploadedImage = { url: result.secure_url, public_id: result.public_id };
    }

    const newMember = await Team.create({
      fullName: req.body.fullName,
      position: req.body.position,
      category: req.body.category,
      introduction: req.body.introduction,
      profilePic: uploadedImage,
    });

    res.status(201).json(newMember);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Update Team Member
exports.updateTeam = async (req, res) => {
  try {
    const existingMember = await Team.findById(req.params.id);
    if (!existingMember)
      return res.status(404).json({ message: "Team member not found" });

    // If new image uploaded → delete old one from Cloudinary
    let updatedImage = existingMember.profilePic;
    if (req.file) {
      if (existingMember.profilePic?.public_id) {
        await cloudinary.uploader.destroy(existingMember.profilePic.public_id);
      }
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "team",
      });
      updatedImage = { url: result.secure_url, public_id: result.public_id };
    }

    const updatedMember = await Team.findByIdAndUpdate(
      req.params.id,
      {
        fullName: req.body.fullName,
        position: req.body.position,
        category: req.body.category,
        introduction: req.body.introduction,
        profilePic: updatedImage,
      },
      { new: true }
    );

    res.status(200).json(updatedMember);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Delete Team Member
exports.deleteTeam = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) return res.status(404).json({ message: "Team member not found" });

    // Delete Cloudinary image if exists
    if (team.profilePic?.public_id) {
      await cloudinary.uploader.destroy(team.profilePic.public_id);
    }

    await team.deleteOne();
    res.status(200).json({ message: "Team member deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
