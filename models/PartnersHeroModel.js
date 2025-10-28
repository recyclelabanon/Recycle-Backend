const mongoose = require("mongoose");

const partnersHeroSchema = new mongoose.Schema({
  title: { type: String, default: "Allies and Benefactors" },
  subtitle: { type: String, default: "Our partners in creating change" },
  backgroundImage: {
    type: String,
    default: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=2074&q=80",
  },
});

module.exports = mongoose.model("PartnersHero", partnersHeroSchema);
