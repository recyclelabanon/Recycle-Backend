const mongoose = require("mongoose");

const timelineSchema = new mongoose.Schema({
  title: String,
  date: String,
});

const pastEventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    status: { type: String, default: "PAST" },
    image: { type: String, required: true },
    video: { type: String },
    description: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    location: { type: String, required: true },
    timeline: [timelineSchema],
    highlights: [String],
    galleryImages: [String],
  },
  { timestamps: true }
);

const PastEvent = mongoose.model("PastEvent", pastEventSchema);
module.exports = PastEvent;
