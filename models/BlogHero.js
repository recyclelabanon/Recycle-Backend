const mongoose = require("mongoose");

const blogHeroSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    subtitle: {
      type: String,
      required: true,
      trim: true,
    },
    backgroundImage: {
      type: String,
      required: false, // 🔴 FIX: must NOT be required
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("BlogHero", blogHeroSchema);
