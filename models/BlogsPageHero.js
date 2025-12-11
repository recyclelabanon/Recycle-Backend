const mongoose = require("mongoose");

const BlogsPageHeroSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    backgroundImage: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("BlogsPageHero", BlogsPageHeroSchema);
