const mongoose = require("mongoose");

const ResidencyApplicationSchema = new mongoose.Schema(
  {
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
    },

    applicantName: String,
    email: String,
    phone: String,

    answers: Object,
    attachments: [String],

    status: {
      type: String,
      default: "submitted",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "ResidencyApplication",
  ResidencyApplicationSchema
);
