const mongoose = require("mongoose");

const ApplicationQuestionSchema = new mongoose.Schema(
  {
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
    },

    questionText: String,

    type: {
      type: String,
      enum: ["text", "textarea", "file", "select"],
      default: "text",
    },

    required: {
      type: Boolean,
      default: false,
    },

    options: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "ApplicationQuestion",
  ApplicationQuestionSchema
);
