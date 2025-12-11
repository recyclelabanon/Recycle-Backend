const mongoose = require("mongoose");

const partnerSchema = new mongoose.Schema({
  name: String,
  category: String, // coalition / donor / project / government
  img: String       // cloudinary URL
});

const TeampartnersSchema = new mongoose.Schema({
  heroTitle: String,
  heroSubtitle: String,
  heroBackground: String, // cloudinary URL

  networkTitle: String,
  joinTitle: String,
  joinDescription: String,
  joinButtonText: String,

  coalitions: [partnerSchema],
  donors: [partnerSchema],
  governmentPartners: [partnerSchema],
  projectPartners: [partnerSchema],

  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("TeampartnersPage", TeampartnersSchema);
