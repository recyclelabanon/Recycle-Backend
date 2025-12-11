const mongoose = require("mongoose");

const newsPageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  summary: { type: String },
  content: { type: String }, 
  date: { type: Date, required: true },
  author: { type: String },
  category: { type: String },

  image: { type: String },
  backgroundImage: { type: String },
  published: { type: Boolean, default: true },

  // ⭐ Add this field
  hero: {
    title: { type: String, default: "Eco Newsrooms" },
    subtitle: { type: String, default: "Stay updated with our latest environmental initiatives." },
    backgroundImage: { type: String, default: "" },
  }
}, { timestamps: true });

const NewsPage = mongoose.model("NewsPage", newsPageSchema);
module.exports = NewsPage;
