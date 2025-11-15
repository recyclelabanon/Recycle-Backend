const mongoose = require("mongoose");

const donateHeroSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  backgroundImage: { type: String, required: true },
});

module.exports = mongoose.model("DonateHero", donateHeroSchema);
