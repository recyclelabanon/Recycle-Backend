const mongoose = require("mongoose");

const donationPageHeroSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    backgroundImage: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("DonationPageHero", donationPageHeroSchema);
