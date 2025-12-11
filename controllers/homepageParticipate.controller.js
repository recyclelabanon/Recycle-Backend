const cloudinary = require("cloudinary").v2;
const Participate = require("../models/homepageParticipate.model");
const fs = require("fs");

// ===============================
// ✅ Get data (never create in GET)
// ===============================
exports.getParticipate = async (req, res) => {
  try {
    let data = await Participate.findOne();

    if (!data) {
      // Return placeholder data — do NOT create
      return res.json({
        heading: "",
        subheading: "",
        opportunities: []
      });
    }

    res.json(data);
  } catch (err) {
    console.error("GET ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

// ===============================
// ✅ Save / Update data
// ===============================
exports.saveParticipateData = async (req, res) => {
  try {
    console.log("Incoming Data:", req.body);

    if (typeof req.body.opportunities === "string") {
      req.body.opportunities = JSON.parse(req.body.opportunities);
    }

    let data = await Participate.findOne();

    if (!data) {
      await Participate.create(req.body);   // Create only here
    } else {
      await Participate.updateOne({}, { $set: req.body });
    }

    res.json({ success: true });
  } catch (err) {
    console.error("SAVE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

// ===============================
// ✅ Upload Image
// ===============================
exports.uploadParticipateImage = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file provided" });

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "participate"
    });

    fs.unlinkSync(req.file.path);
    res.json({ url: result.secure_url });
  } catch (error) {
    console.error("UPLOAD ERROR:", error);
    res.status(500).json({ error: "Upload failed" });
  }
};
