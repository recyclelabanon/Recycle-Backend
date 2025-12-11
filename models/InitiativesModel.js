const mongoose = require("mongoose");

const InitiativesSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  title: String,
  shortDescription: String,
  longDescription: String,

  image: String,
  imageBank: [String],
  backgroundImage: String,

  accomplishments: [
    {
      label: String,
      value: String
    }
  ],

  callToActions: [
    {
      label: String,
      action: String
    }
  ],

  offers: [String],
  donations: [String],
  team: [String],
  partners: [String],
  donors: [String],

  heroTitle: String,
  heroSubtitle: String
});

module.exports = mongoose.model("InitiativeProgram", InitiativesSchema);
