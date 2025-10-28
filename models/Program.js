const mongoose = require('mongoose');

const ProgramSchema = new mongoose.Schema({
  title: { type: String, required: true },
  color: { type: String, default: '#2726CC' },
  icon: { type: String, default: 'FiStar' },
  description: { type: String },
  longDescription: { type: String },
  image: { type: String }, // default image path if needed
  images: [{ type: String }], // image bank
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
  headers: { type: Map, of: String } // optional for dynamic section headers
}, { timestamps: true });

module.exports = mongoose.model('Program', ProgramSchema);
