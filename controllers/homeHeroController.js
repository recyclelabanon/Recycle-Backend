const HomeHero = require("../models/homeHeroModel");
const { uploadToCloudinary } = require("../utils/cloudinary");

// Public GET
exports.getHeroPublic = async (req, res) => {
  try {
    const hero = await HomeHero.findOne();
    res.json(hero);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Admin GET
exports.getHero = async (req, res) => {
  try {
    const hero = await HomeHero.findOne();
    res.json(hero);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Admin UPDATE
exports.updateHero = async (req, res) => {
  try {
    let hero = await HomeHero.findOne();
    const { title, subtitle, buttonText } = req.body;

    let backgroundImage = hero?.backgroundImage;

    // If user uploaded a new image → upload to Cloudinary
    if (req.file) {
      backgroundImage = await uploadToCloudinary(
        req.file.buffer,
        "ecosouk/home-hero"
      );
    }

    if (!hero) {
      hero = new HomeHero({
        title,
        subtitle,
        buttonText,
        backgroundImage,
      });
    } else {
      hero.title = title;
      hero.subtitle = subtitle;
      hero.buttonText = buttonText;
      hero.backgroundImage = backgroundImage;
    }

    await hero.save();
    res.json({ success: true, hero });
  } catch (err) {
    console.error("HOME HERO UPDATE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};
