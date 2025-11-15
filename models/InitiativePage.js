const mongoose = require('mongoose');

const ProgramSchema = new mongoose.Schema({
  title: { type: String, required: true },
  logo: { type: String }, // URL
  color: { type: String },
  cta: { type: String },
  shortDescription: { type: String },
  image: { type: String }, // hero/image url
  layout: { type: String, enum: ['left', 'right'], default: 'right' },
}, { timestamps: true });

const InitiativePageSchema = new mongoose.Schema({
  pageTitle: { type: String, default: 'Ecological Programmes' },
  pageSubtitle: { type: String, default: 'Fostering ecological change through interconnected initiatives' },
  backgroundImage: { type: String }, // url
  programs: [ProgramSchema]
}, { timestamps: true });

module.exports = mongoose.model('InitiativePage', InitiativePageSchema);
