// backend/models/UpcomingEvent.js
const mongoose = require("mongoose");

const timelineSchema = new mongoose.Schema({
  title: String,
  date: String,
});

const UpcomingEventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    status: { type: String, default: "UPCOMING" },

    image: { type: String, required: true }, // Cloudinary or URL
    video: { type: String },

    description: { type: String, required: true },

    startDate: { type: String, required: true },
    endDate: { type: String, required: true },

    location: { type: String, required: true },

    spots: { type: Number, default: 0 }, // how many available
    registered: { type: Number, default: 0 }, // how many registered

    timeline: [timelineSchema],
    highlights: [String],
    galleryImages: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("UpcomingEvent", UpcomingEventSchema);
