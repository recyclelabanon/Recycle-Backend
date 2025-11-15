const mongoose = require("mongoose");

const donationHeroSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String, required: true }
});

module.exports = mongoose.model("DonationHero", donationHeroSchema);
