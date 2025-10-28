const mongoose = require("mongoose");

const opportunitySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Opportunity", opportunitySchema);
