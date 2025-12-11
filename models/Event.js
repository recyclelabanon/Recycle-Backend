const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    image: { type: String }, // Cloudinary URL
    heroImage: { type: String }, // optional background/hero
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    location: { type: String },
    status: { type: String, enum: ["CURRENT", "UPCOMING", "PAST"], default: "UPCOMING" },
    spotsTotal: { type: Number, default: 0 },
    spotsRemaining: { type: Number, default: 0 },
    highlights: [String],
    timeline: [{ title: String, date: Date, description: String }],
    media: [{ type: String }], // array of image/video URLs
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", EventSchema);
