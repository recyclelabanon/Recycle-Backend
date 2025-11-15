const DonationPageHero = require("../models/DonationPageHero");

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
};
