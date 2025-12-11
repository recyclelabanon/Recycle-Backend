const Hero = require("../models/InitiativesHero");
const { uploadToCloudinary } = require("../utils/cloudinary");

// ==================== GET HERO ====================
exports.getHero = async (req, res) => {
  try {
    const hero = await Hero.findOne();
    res.json(hero);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch hero" });
  }
};

// ==================== UPDATE / CREATE HERO ====================
exports.updateHero = async (req, res) => {
  try {
    const { title, subtitle } = req.body;

    let backgroundImage = req.body.backgroundImage;

    // If file uploaded → upload to Cloudinary
    if (req.file) {
      backgroundImage = await uploadToCloudinary(
        req.file.buffer,
        "ecosouk/initiatives/hero"
      );
    }

    let hero = await Hero.findOne();

    if (!hero) {
      hero = new Hero({ title, subtitle, backgroundImage });
    } else {
      hero.title = title;
      hero.subtitle = subtitle;
      hero.backgroundImage = backgroundImage;
    }

    await hero.save();
    res.json(hero);
  } catch (err) {
    console.error("HERO UPDATE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};
