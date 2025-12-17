const VolunteerApplication = require("../models/VolunteerApplication");
const sendVolunteerEmail = require("../utils/sendVolunteerEmail");

/* ===============================
   Apply (Volunteer / Internship)
================================ */
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
      applicationType,
    } = req.body;

    const categories = Array.isArray(req.body.categories)
      ? req.body.categories
      : [req.body.categories].filter(Boolean);

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
      categories,
      applicationType,
      cvUrl,
      portfolioUrl,
    });

    // ✅ email notification
    await sendVolunteerEmail(application);

    res.status(201).json({ success: true, application });
  } catch (err) {
    console.error("Volunteer apply error:", err);
    res.status(500).json({ success: false });
  }
};

/* ===============================
   Admin: Get Applications
================================ */
exports.getApplications = async (req, res) => {
  try {
    const { status, category, type } = req.query;

    const filter = {};
    if (status) filter.status = status;
    if (type) filter.applicationType = type;
    if (category) filter.categories = category;

    const apps = await VolunteerApplication.find(filter).sort("-createdAt");
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
    const { status, adminNotes } = req.body;

    const app = await VolunteerApplication.findByIdAndUpdate(
      req.params.id,
      { status, adminNotes },
      { new: true }
    );

    res.json(app);
  } catch (err) {
    res.status(500).json({ message: "Failed to update status" });
  }
};

/* ===============================
   Admin: Delete
================================ */
exports.deleteApplication = async (req, res) => {
  try {
    await VolunteerApplication.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
};
