const mongoose = require("mongoose");

const programmeSchema = new mongoose.Schema({
  name: String,
  location: String,
  phone: String,
  email: String,
  hours: String,
  website: String,
  icon: String,
}, { timestamps: true });

module.exports = mongoose.model("Programme", programmeSchema);
