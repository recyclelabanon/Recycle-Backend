// controllers/hireUs.controller.js
const HireUsSection = require('../models/hireUs.model');

/**
 * GET /api/v1/hire-us
 * Return the single HireUs document (create default if missing)
 */
exports.getHireUs = async (req, res) => {
  try {
    let doc = await HireUsSection.findOne();
    if (!doc) {
      doc = await HireUsSection.create({
        sectionTitle: 'Join Forces',
        services: [
          {
            title: 'Consultancy',
            items: [],
            partners: [],
            cta: { text: '', buttonText: '', buttonLink: '' },
            secondary: { text: '', buttonLink: '' }
          }
        ]
      });
    }
    res.json(doc);
  } catch (err) {
    console.error('GET HireUs error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

/**
 * POST /api/v1/hire-us
 * Create new document (rare) or overwrite
 */
exports.createHireUs = async (req, res) => {
  try {
    const payload = req.body;
    const doc = new HireUsSection(payload);
    await doc.save();
    res.json(doc);
  } catch (err) {
    console.error('CREATE HireUs error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

/**
 * PATCH /api/v1/hire-us (update existing)
 * Accept JSON with { sectionTitle, services }
 */
exports.updateHireUs = async (req, res) => {
  try {
    const payload = req.body;
    let doc = await HireUsSection.findOne();
    if (!doc) {
      doc = new HireUsSection(payload);
    } else {
      // replace fields safely
      doc.sectionTitle = payload.sectionTitle ?? doc.sectionTitle;
      doc.services = Array.isArray(payload.services) ? payload.services : doc.services;
    }
    await doc.save();
    res.json({ success: true, section: doc });
  } catch (err) {
    console.error('UPDATE HireUs error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};
