const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    shortDescription: String,
    fullDescription: String,

    type: {
      type: String,
      enum: ["event", "residency"],
      default: "event",
    },

    topics: [String],

    startDate: Date,
    endDate: Date,
    location: String,
    price: Number,
    capacity: Number,

    visibility: {
      type: String,
      enum: ["public", "internal"],
      default: "internal",
    },

    status: {
      type: String,
      enum: ["draft", "approved"],
      default: "draft",
    },

    showOnCalendar: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("EventCalendar", EventSchema);
