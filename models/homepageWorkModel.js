const mongoose = require("mongoose");

const programSchema = new mongoose.Schema({
  collective: String,
  titleLine1: String,
  titleLine2: String,
  icon: String,
  tagline: String,
  description: String,
  linkText: String,
  image: String,
  color: String
});

const workSchema = new mongoose.Schema({
  heading: String,
  paragraph: String,
  programs: [programSchema]
});

module.exports = mongoose.model("HomepageWork", workSchema);
