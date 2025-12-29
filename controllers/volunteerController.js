const VolunteerApplication = require("../models/VolunteerApplication");
const VolunteerCategory = require("../models/VolunteerCategory");

// ===============================
// Public: Apply
// ===============================
exports.apply = async (req, res) => {
  try {
    const {
      fullName,
      email,
      location,
      backgroundSkills,
      motivation,
      availabilityPeriod,
      daysPerWeek,
      categories,
      applicationType,
    } = req.body;

    if (!req.files || !req.files.cv) {
      return res.status(400).json({ message: "CV is required" });
    }

    const cvFile = req.files.cv[0];
    const portfolioFile = req.files.portfolio?.[0];

    const cvUrl = `uploads/volunteers/${cvFile.filename}`;
    const portfolioUrl = portfolioFile
      ? `uploads/volunteers/${portfolioFile.filename}`
      : null;

    const application = await VolunteerApplication.create({
      fullName,
      email,
      location,
      backgroundSkills,
      motivation,
      availabilityPeriod,
      daysPerWeek,
      categories: Array.isArray(categories) ? categories : [categories],
      applicationType,
      cvUrl,
      portfolioUrl,
    });

    res.status(201).json({ success: true, application });
  } catch (err) {
    console.error("Volunteer apply error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ===============================
// Public: Get Categories
// ===============================
exports.getCategories = async (_, res) => {
  try {
    const categories = await VolunteerCategory.find().sort("name");
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: "Failed to load categories" });
  }
};

// ===============================
// Admin: Manage Categories
// ===============================
exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "Name is required" });
    const category = await VolunteerCategory.create({ name });
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ message: "Failed to create category" });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await VolunteerCategory.findByIdAndDelete(id);
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
    const { status, category, availabilityPeriod } = req.query;
    const filter = {};

    if (status) filter.status = status;
    if (category) filter.categories = category;
    if (availabilityPeriod) filter.availabilityPeriod = availabilityPeriod;

    const apps = await VolunteerApplication.find(filter).sort("-createdAt");
    res.json(apps);
  } catch (err) {
    res.status(500).json({ message: "Failed to load applications" });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const app = await VolunteerApplication.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    res.json(app);
  } catch (err) {
    res.status(500).json({ message: "Failed to update status" });
  }
};

exports.deleteApplication = async (req, res) => {
  try {
    const { id } = req.params;
    await VolunteerApplication.findByIdAndDelete(id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
};
