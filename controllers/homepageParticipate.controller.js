const cloudinary = require("cloudinary").v2;
const Participate = require("../models/homepageParticipate.model");
const fs = require("fs");

// ✅ Get data (always one document only)
exports.getParticipate = async (req, res) => {
  try {
    let data = await Participate.findOne();
    if (!data) data = await Participate.create({});
    res.json(data);
  } catch (err) {
    console.error("GET ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

// ✅ Save JSON Data
exports.saveParticipateData = async (req, res) => {
  try {
    console.log("Incoming Data:", req.body);

    // ✅ FIX — Parse opportunities if stringified
    if (typeof req.body.opportunities === "string") {
      req.body.opportunities = JSON.parse(req.body.opportunities);
    }

    let data = await Participate.findOne();

    if (!data) {
      data = await Participate.create(req.body);
    } else {
      await Participate.updateOne({}, { $set: req.body });
    }

    res.json({ success: true });
  } catch (err) {
    console.error("SAVE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

// ✅ Upload Image to Cloudinary (disk storage)
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
