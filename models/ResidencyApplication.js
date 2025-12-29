const mongoose = require("mongoose");

const ResidencyApplicationSchema = new mongoose.Schema(
  {
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "EventCalendar",
    },

    applicantName: String,
    email: String,
    phone: String,

    answers: Object,
    attachments: [String],

    status: {
      type: String,
      enum: ["new", "screened", "approved", "rejected"],
      default: "new",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "ResidencyApplication",
  ResidencyApplicationSchema
);
