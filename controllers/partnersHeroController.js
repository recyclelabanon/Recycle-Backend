const PartnersHero = require("../models/PartnersHeroModel");

// ✅ GET Hero Section Data (auto-create default if missing)
const getPartnersHero = async (req, res) => {
  try {
    let hero = await PartnersHero.findOne();

    // If no document exists, create one
    if (!hero) {
      hero = new PartnersHero({
        title: "Allies and Benefactors",
        subtitle: "Our partners in creating change",
        backgroundImage:
          "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=2074&q=80",
      });
      await hero.save();
    }

    res.status(200).json(hero);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE Hero Section Data
const updatePartnersHero = async (req, res) => {
  try {
    const { title, subtitle, backgroundImage } = req.body;
    let hero = await PartnersHero.findOne();

    if (!hero) {
      hero = new PartnersHero({ title, subtitle, backgroundImage });
    } else {
      hero.title = title;
      hero.subtitle = subtitle;
      hero.backgroundImage = backgroundImage;
    }

    await hero.save();
    res.status(200).json(hero);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getPartnersHero, updatePartnersHero };
