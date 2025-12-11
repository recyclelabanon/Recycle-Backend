const EventPageHero = require("../models/eventPageHeroModel");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer storage in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Utility: Upload buffer to Cloudinary
const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { folder: "event-page-hero" },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    ).end(buffer);
  });
};

// GET HERO SECTION
const getHero = async (req, res) => {
  try {
    const hero = await EventPageHero.findOne().sort({ createdAt: -1 });
    res.json(hero);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE or UPDATE HERO SECTION
const createOrUpdateHero = async (req, res) => {
  try {
    const { title, subtitle } = req.body;
    let backgroundImage = "";

    if (req.file) {
      // Correct Cloudinary upload
      const uploadResult = await uploadToCloudinary(req.file.buffer);
      backgroundImage = uploadResult.secure_url;
    }

    const hero = await EventPageHero.findOneAndUpdate(
      {},
      {
        title,
        subtitle,
        ...(backgroundImage && { backgroundImage }),
      },
      { new: true, upsert: true }
    );

    res.json(hero);
  } catch (err) {
    console.error("Cloudinary upload failed:", err);
    res.status(500).json({ message: "Hero update failed", error: err.message });
  }
};

module.exports = { getHero, createOrUpdateHero, upload };
