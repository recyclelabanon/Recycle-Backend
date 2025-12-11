/*const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  summary: { type: String, required: true },
  author: { type: String, required: true },
  link: { type: String, required: true },
  content: { type: String, required: true },
  coverImage: { type: String },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Blog", blogSchema);*/








/*const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: String,
    summary: String,
    author: String,
    content: String,
    link: String,
    coverImage: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);*/






const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    summary: { type: String, required: true },
    author: { type: String, required: true },
    content: { type: String, required: true },
    link: { type: String },
    coverImage: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);

