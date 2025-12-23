const mongoose = require("mongoose");

const CalendarEventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,

    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },

    eventType: {
      type: String,
      enum: ["event", "residency"],
      default: "event",
    },

    visibility: {
      type: String,
      enum: ["internal", "public"],
      default: "internal",
    },

    approved: {
      type: Boolean,
      default: false,
    },

    allowBooking: { type: Boolean, default: false },
    allowResidencyApply: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CalendarEvent", CalendarEventSchema);
