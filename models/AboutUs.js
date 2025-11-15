const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
  url: String,
  position: { type: String, enum: ["left", "right"], default: "right" },
});

const SectionSchema = new mongoose.Schema({
  key: { type: String, required: true },
  title: String,
  contentHtml: String,
  dark: { type: Boolean, default: false },
  image: ImageSchema,
});

const ProgramSchema = new mongoose.Schema({
  key: { type: String, required: true },
  title: String,
  description: String,
  linkSlug: String,
  logo: ImageSchema,
});

const AboutUsSchema = new mongoose.Schema({
  hero: {
    title: String,
    subtitle: String,
    background: ImageSchema,
  },
  sections: [SectionSchema],
  impactStatementHtml: String,
  impactPrograms: [ProgramSchema],
});

module.exports = mongoose.model("AboutUs", AboutUsSchema);
