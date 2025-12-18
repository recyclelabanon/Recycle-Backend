const mongoose = require("mongoose");

const blogNewsPageSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    summary: { type: String, required: true },
    content: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    coverImage: { type: String },
    author: { type: String, default: "Admin" },
    publishedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("BlogNewsPage", blogNewsPageSchema);
