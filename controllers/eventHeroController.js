const EventHero = require("../models/EventHeroModel");

// Get hero section
const getHero = async (req, res) => {
  try {
    const hero = await EventHero.findOne();
    res.json(hero);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update hero section
const updateHero = async (req, res) => {
  try {
    const updatedHero = await EventHero.findOneAndUpdate({}, req.body, { new: true, upsert: true });
    res.json(updatedHero);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getHero, updateHero };
