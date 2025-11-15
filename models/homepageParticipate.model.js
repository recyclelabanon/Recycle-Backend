const mongoose = require("mongoose");

const OpportunitySchema = new mongoose.Schema({
  title: { type: String, default: "" },
  date: { type: String, default: "" },
  type: { type: String, default: "" },
  icon: { type: String, default: "" },
  image: { type: String, default: "" },
  buttonLink: { type: String, default: "" },
});

const schema = new mongoose.Schema(
  {
    heading: { type: String, required: true },
    subheading: { type: String, required: true },

    opportunities: { type: [OpportunitySchema], default: [] },

    carouselImages: { type: [String], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("HomepageParticipate", schema);
