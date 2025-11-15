const ContactHero = require('../models/ContactHero');
const cloudinary = require('cloudinary').v2;

// Cloudinary config
cloudinary.config({
  cloud_name: 'YOUR_CLOUD_NAME',
  api_key: 'YOUR_API_KEY',
  api_secret: 'YOUR_API_SECRET',
});

// GET Hero
exports.getHero = async (req, res) => {
  try {
    const hero = await ContactHero.findOne().sort({ createdAt: -1 });
    res.json(hero);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
};

// CREATE / UPDATE Hero
exports.updateHero = async (req, res) => {
  try {
    const { title, subtitle } = req.body;
    let backgroundImage;

    if (req.file) {
      // Upload to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'contact-hero',
      });
      backgroundImage = result.secure_url;
    }

    let hero = await ContactHero.findOne();
    if (hero) {
      hero.title = title;
      hero.subtitle = subtitle;
      if (backgroundImage) hero.backgroundImage = backgroundImage;
      await hero.save();
    } else {
      hero = await ContactHero.create({ title, subtitle, backgroundImage });
    }

    res.json(hero);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Server Error' });
  }
};
