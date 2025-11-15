const mongoose = require("mongoose");

const programmeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    phone: String,
    email: String,
    hours: String,
    website: String,
    icon: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Programme", programmeSchema);
