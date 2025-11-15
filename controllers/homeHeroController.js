const HomeHero = require("../models/homeHeroModel");

// ✅ Public API (No auth, for frontend)
exports.getHeroPublic = async (req, res) => {
  try {
    const hero = await HomeHero.findOne();
    res.json(hero);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Admin Get Hero (Protected)
exports.getHero = async (req, res) => {
  try {
    const hero = await HomeHero.findOne();
    res.json(hero);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Admin Update Hero (Protected)
exports.updateHero = async (req, res) => {
  try {
    let hero = await HomeHero.findOne();

    const { title, subtitle, buttonText } = req.body;

    const backgroundImage = req.file
      ? `/uploads/${req.file.filename}`
      : hero?.backgroundImage;

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
    res.status(500).json({ message: err.message });
  }
};
