/*const DonationPageHero = require("../models/DonationPageHero");
const cloudinary = require("../config/cloudinary");
exports.getDonationHero = async (req, res) => {
  try {
    const hero = await DonationPageHero.findOne().sort({ createdAt: -1 });
    res.json(hero);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateDonationHero = async (req, res) => {
  try {
    const { title, subtitle } = req.body;
    const backgroundImage = req.file
      ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
      : undefined;

    let hero = await DonationPageHero.findOne();

    if (hero) {
      hero.title = title || hero.title;
      hero.subtitle = subtitle || hero.subtitle;
      if (backgroundImage) hero.backgroundImage = backgroundImage;
      await hero.save();
    } else {
      hero = await DonationPageHero.create({
        title,
        subtitle,
        backgroundImage,
      });
    }

    res.json(hero);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};*/











/*const DonationPageHero = require("../models/DonationPageHero");
const cloudinary = require("../config/cloudinary");

// GET – Public (Frontend)
exports.getDonationHero = async (req, res) => {
  try {
    let hero = await DonationPageHero.findOne();

    if (!hero) {
      hero = await DonationPageHero.create({
        title: "Support Our Mission",
        subtitle:
          "Every contribution makes a difference. Join us in creating a sustainable future.",
        backgroundImage: "",
      });
    }

    res.json(hero);
  } catch (error) {
    res.status(500).json({ message: "Failed to load donation hero" });
  }
};

// UPDATE – Admin
exports.updateDonationHero = async (req, res) => {
  try {
    const { title, subtitle } = req.body;

    let hero = await DonationPageHero.findOne();
    if (!hero) hero = new DonationPageHero();

    // Upload image if exists
    if (req.file) {
      const upload = await cloudinary.uploader.upload(req.file.path, {
        folder: "donation-page",
      });
      hero.backgroundImage = upload.secure_url;
    }

    hero.title = title;
    hero.subtitle = subtitle;

    await hero.save();

    res.json({
      success: true,
      hero,
    });
  } catch (error) {
    res.status(500).json({ message: "Hero update failed" });
  }
};*/







const DonationPageHero = require("../models/DonationPageHero");
const cloudinary = require("../config/cloudinary");

// ===============================
// GET HERO (PUBLIC)
// ===============================
exports.getDonationHero = async (req, res) => {
  try {
    let hero = await DonationPageHero.findOne().sort({
      createdAt: -1,
    });

    // Auto-create if not exists
    if (!hero) {
      hero = await DonationPageHero.create({
        title: "Support Our Mission",
        subtitle:
          "Every contribution makes a difference. Join us in creating a sustainable future.",
        backgroundImage: "",
      });
    }

    res.status(200).json(hero);
  } catch (err) {
    console.error("Get donation hero error:", err);
    res.status(500).json({
      message: err.message || "Failed to fetch donation hero",
    });
  }
};

// ===============================
// UPDATE HERO (ADMIN)
// ===============================
exports.updateDonationHero = async (req, res) => {
  try {
    const { title, subtitle } = req.body;

    let hero = await DonationPageHero.findOne();

    if (!hero) {
      hero = new DonationPageHero({
        title: "",
        subtitle: "",
        backgroundImage: "",
      });
    }

    // Update text safely
    if (typeof title === "string") hero.title = title;
    if (typeof subtitle === "string") hero.subtitle = subtitle;

    // Upload image only if provided
    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(
        req.file.path,
        { folder: "donation-page" }
      );
      hero.backgroundImage = uploadResult.secure_url;
    }

    await hero.save();

    res.status(200).json({
      success: true,
      hero,
    });
  } catch (err) {
    console.error("Update donation hero error:", err);
    res.status(500).json({
      message: err.message || "Failed to update donation hero",
    });
  }
};
