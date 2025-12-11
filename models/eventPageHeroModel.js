const mongoose = require("mongoose");

const eventPageHeroSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    backgroundImage: { type: String, required: true }, // Cloudinary URL
  },
  { timestamps: true }
);

const EventPageHero = mongoose.model("EventPageHero", eventPageHeroSchema);
module.exports = EventPageHero;
