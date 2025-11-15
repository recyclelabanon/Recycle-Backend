const mongoose = require("mongoose");

const partnerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    website: { type: String },
    category: {
      type: String,
      enum: ["corporate", "ngo", "media", "education", "community", "other"],
      default: "other",
    },
    logo: {
      url: { type: String },
      public_id: { type: String },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Partner", partnerSchema);
