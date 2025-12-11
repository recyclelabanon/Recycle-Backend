const mongoose = require("mongoose");

const currentEventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    status: { type: String, default: "CURRENT" },

    image: { type: String, required: true }, // cloudinary URL
    video: { type: String },

    description: { type: String, required: true },

    startDate: { type: String, required: true },
    endDate: { type: String, required: true },

    location: { type: String, required: true },

    fillPercent: { type: Number, default: 0 },
    remaining: { type: Number, default: 0 },

    timeline: [
      {
        title: String,
        date: String,
      },
    ],

    highlights: [String],

    galleryImages: [String], // Cloudinary URLs
  },
  { timestamps: true }
);

const CurrentEvent = mongoose.model("CurrentEvent", currentEventSchema);
module.exports = CurrentEvent;
