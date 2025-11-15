// models/hireUs.model.js
const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  title: { type: String, default: '' },
  items: { type: [String], default: [] },
  partners: { type: [String], default: [] },
  cta: {
    text: { type: String, default: '' },
    buttonText: { type: String, default: '' },
    buttonLink: { type: String, default: '' } // can be mailto:, absolute url or route
  },
  secondary: {
    text: { type: String, default: '' },
    buttonLink: { type: String, default: '' } // usually internal route
  }
});

const HireUsSectionSchema = new mongoose.Schema({
  sectionTitle: { type: String, default: 'Join Forces' },
  services: { type: [ServiceSchema], default: [] }
}, { timestamps: true });

module.exports = mongoose.model('HireUsSection', HireUsSectionSchema);
