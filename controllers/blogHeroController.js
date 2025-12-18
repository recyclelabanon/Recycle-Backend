const BlogHero = require("../models/BlogHero");
const { cloudinary } = require("../config/cloudinary");
const fs = require("fs");

/**
 * GET blog hero (public)
 */
exports.getBlogHero = async (req, res) => {
  try {
    const hero = await BlogHero.findOne().sort({ createdAt: -1 });
    res.json(hero);
  } catch (err) {
    console.error("GET BLOG HERO ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * CREATE / UPDATE blog hero (admin)
 */
exports.saveBlogHero = async (req, res) => {
  try {
    const { title, subtitle } = req.body;

    if (!title || !subtitle) {
      return res.status(400).json({
        error: "Title and subtitle are required",
      });
    }

    let hero = await BlogHero.findOne();
    let imageUrl = hero?.backgroundImage || "";

    // ✅ CORRECT for diskStorage
    if (req.file?.path) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "bloghero",
      });

      imageUrl = result.secure_url;

      // 🧹 cleanup local file
      fs.unlink(req.file.path, () => {});
    }

    if (hero) {
      hero.title = title;
      hero.subtitle = subtitle;
      hero.backgroundImage = imageUrl;
      await hero.save();
    } else {
      hero = await BlogHero.create({
        title,
        subtitle,
        backgroundImage: imageUrl,
      });
    }

    res.json({
      success: true,
      hero,
    });
  } catch (err) {
    console.error("SAVE BLOG HERO ERROR:", err);
    res.status(500).json({
      error: err.message,
    });
  }
};
