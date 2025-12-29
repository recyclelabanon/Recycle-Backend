const PartnerApplication = require("../models/PartnerApplication");
const PartnerType = require("../models/PartnerType");
const PartnershipInterest = require("../models/PartnershipInterest");
const sendPartnerEmail = require("../utils/sendPartnerEmail");

// ===============================
// Public: Apply
// ===============================
exports.apply = async (req, res) => {
  try {
    const {
      organizationName,
      partnerType,
      contactPerson,
      email,
      website,
      partnershipInterests,
      description,
    } = req.body;

    const application = await PartnerApplication.create({
      organizationName,
      partnerType,
      contactPerson,
      email,
      website,
      partnershipInterests: Array.isArray(partnershipInterests) ? partnershipInterests : [partnershipInterests],
      description,
    });

    await sendPartnerEmail(application);
    res.status(201).json({ success: true, application });
  } catch (err) {
    console.error("Partner apply error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ===============================
// Public: Get Types & Interests
// ===============================
exports.getSettings = async (req, res) => {
  try {
    const types = await PartnerType.find().sort("name");
    const interests = await PartnershipInterest.find().sort("name");
    res.json({ types, interests });
  } catch (err) {
    res.status(500).json({ message: "Failed to load settings" });
  }
};

// ===============================
// Admin: Manage Types
// ===============================
exports.createType = async (req, res) => {
  try {
    const { name } = req.body;
    const item = await PartnerType.create({ name });
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ message: "Failed to create type" });
  }
};

exports.deleteType = async (req, res) => {
  try {
    await PartnerType.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
};

// ===============================
// Admin: Manage Interests
// ===============================
exports.createInterest = async (req, res) => {
  try {
    const { name } = req.body;
    const item = await PartnershipInterest.create({ name });
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ message: "Failed to create interest" });
  }
};

exports.deleteInterest = async (req, res) => {
  try {
    await PartnershipInterest.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
};

// ===============================
// Admin: Manage Applications
// ===============================
exports.getApplications = async (req, res) => {
  try {
    const { type, interest, status } = req.query;
    const filter = {};

    if (type) filter.partnerType = type;
    if (interest) filter.partnershipInterests = interest;
    if (status) filter.status = status;

    const apps = await PartnerApplication.find(filter).sort("-createdAt");
    res.json(apps);
  } catch (err) {
    res.status(500).json({ message: "Failed to load applications" });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const app = await PartnerApplication.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(app);
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
};

exports.deleteApplication = async (req, res) => {
  try {
    await PartnerApplication.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
};
