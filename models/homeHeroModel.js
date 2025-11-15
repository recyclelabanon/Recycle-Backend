const mongoose = require("mongoose");

const homeHeroSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  buttonText: { type: String, default: "Learn More" },
  backgroundImage: { type: String }, // store /uploads path
});

module.exports = mongoose.model("HomeHero", homeHeroSchema);
