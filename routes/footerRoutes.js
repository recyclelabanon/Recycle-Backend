// routes/footerRoutes.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("../utils/cloudinary");
const FooterSettings = require("../models/FooterSettings");

const upload = multer({ storage: multer.memoryStorage() });

const streamUploadBuffer = (buffer, folder = "footer") => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );
    stream.end(buffer);
  });
};

// GET /api/v1/footer  -> returns settings (create defaults if missing)
router.get("/", async (req, res) => {
  try {
    let settings = await FooterSettings.findOne();
    if (!settings) {
      settings = await FooterSettings.create({});
    }
    res.json(settings);
  } catch (err) {
    console.error("Footer GET error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// PUT /api/v1/footer  -> update settings (supports file uploads: logo, linkedinIcon)
router.put("/", upload.fields([
  { name: "logo", maxCount: 1 },
  { name: "linkedinIcon", maxCount: 1 }
]), async (req, res) => {
  try {
    const body = req.body || {};
    let settings = await FooterSettings.findOne();
    if (!settings) settings = new FooterSettings();

    // Upload files if provided
    if (req.files && req.files.logo && req.files.logo[0]) {
      const result = await streamUploadBuffer(req.files.logo[0].buffer, "footer/logo");
      settings.logoUrl = result.secure_url;
    }

    if (req.files && req.files.linkedinIcon && req.files.linkedinIcon[0]) {
      const result = await streamUploadBuffer(req.files.linkedinIcon[0].buffer, "footer/icons");
      settings.linkedinIconUrl = result.secure_url;
    }

    // Update text fields (use nullish coalescing so empty string allowed from admin)
    settings.supportTitle = body.supportTitle ?? settings.supportTitle;
    settings.supportSubtitle = body.supportSubtitle ?? settings.supportSubtitle;
    settings.donateLabel = body.donateLabel ?? settings.donateLabel;
    settings.shopLabel = body.shopLabel ?? settings.shopLabel;
    settings.contactTitle = body.contactTitle ?? settings.contactTitle;
    settings.address = body.address ?? settings.address;
    settings.contactEmail = body.contactEmail ?? settings.contactEmail;
    settings.contactPhone = body.contactPhone ?? settings.contactPhone;
    settings.copyrightText = body.copyrightText ?? settings.copyrightText;

    await settings.save();
    res.json(settings);
  } catch (err) {
    console.error("Footer PUT error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
