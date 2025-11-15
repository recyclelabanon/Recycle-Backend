const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    position: { type: String, required: true },
    category: {
      type: String,
      enum: ["core", "board", "advisory"],
      default: "core",
    },
    introduction: { type: String },
    profilePic: {
      url: { type: String },
      public_id: { type: String },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Team", teamSchema);
