const CareerApplication = require("../models/CareerApplication");
const CareerRole = require("../models/CareerRole");
const sendCareerEmail = require("../utils/sendCareerEmail");

/* ===============================
   Get Roles
================================ */
exports.getRoles = async (_, res) => {
  try {
    const roles = await CareerRole.find().sort("name");
    res.json(roles);
  } catch (err) {
    res.status(500).json({ message: "Failed to load roles" });
  }
};

/* ===============================
   Apply for Career
   ✅ FIXED DOWNLOAD PATH
   ✅ EMAIL ENABLED
================================ */
exports.apply = async (req, res) => {
  try {
    const {
      fullName,
      email,
      role,
      message,
      referenceName,
      referenceContact,
    } = req.body;

    if (!req.files || !req.files.resume) {
      return res.status(400).json({ message: "Resume is required" });
    }

    const resumeFile = req.files.resume[0];
    const portfolioFile = req.files.portfolio?.[0];

    // ✅ STORE PUBLIC RELATIVE URL (NOT OS PATH)
    const resumeUrl = `uploads/careers/${resumeFile.filename}`;
    const portfolioUrl = portfolioFile
      ? `uploads/careers/${portfolioFile.filename}`
      : null;

    const application = await CareerApplication.create({
      fullName,
      email,
      role,
      message,
      resumeUrl,
      portfolioUrl,
      referenceName,
      referenceContact,
    });

    // ✅ EMAIL WILL BE SENT
    await sendCareerEmail(application);

    res.status(201).json({
      success: true,
      application,
    });
  } catch (err) {
    console.error("Career apply error:", err);
    res.status(500).json({
      success: false,
      message: err.message || "Internal server error",
    });
  }
};

/* ===============================
   Admin: Get Applications
================================ */
exports.getApplications = async (req, res) => {
  try {
    const { status, role } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (role) filter.role = role;

    const apps = await CareerApplication.find(filter).sort("-createdAt");
    res.json(apps);
  } catch (err) {
    res.status(500).json({ message: "Failed to load applications" });
  }
};

/* ===============================
   Admin: Update Status
================================ */
exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const app = await CareerApplication.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    res.json(app);
  } catch (err) {
    res.status(500).json({ message: "Failed to update status" });
  }
};

/* ===============================
   Admin: Delete Application
================================ */
exports.deleteApplication = async (req, res) => {
  try {
    const { id } = req.params;
    await CareerApplication.findByIdAndDelete(id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
};

/* ===============================
   Admin: Manage Roles
================================ */
exports.createRole = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "Name is required" });
    const role = await CareerRole.create({ name });
    res.status(201).json(role);
  } catch (err) {
    res.status(500).json({ message: "Failed to create role" });
  }
};

exports.deleteRole = async (req, res) => {
  try {
    const { id } = req.params;
    await CareerRole.findByIdAndDelete(id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
};





