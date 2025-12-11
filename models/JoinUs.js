const mongoose = require("mongoose");

const JoinUsSchema = new mongoose.Schema(
  {
    hero: {
      title: { type: String, default: "Be the change" },
      description: { type: String, default: "" },
      backgroundImage: { type: String, default: "" },
    },

    theme: {
      brandColor: { type: String, default: "#2726CC" },
    },

    tabs: [
      {
        id: {
          type: String,
          enum: ["careers", "volunteer", "partner"],
          required: true,
        },
        label: { type: String, required: true },
        enabled: { type: Boolean, default: true },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("JoinUs", JoinUsSchema);
