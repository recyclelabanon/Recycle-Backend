/*const VolunteerApplication = require("../models/VolunteerApplication");
const sendVolunteerEmail = require("../utils/sendCareerEmail");


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
      : req.body.categories
      ? [req.body.categories]
      : [];

    if (!req.files?.cv) {
      return res.status(400).json({ message: "CV is required" });
    }

    const cvUrl = `uploads/volunteers/${req.files.cv[0].filename}`;
    const portfolioUrl = req.files.portfolio
      ? `uploads/volunteers/${req.files.portfolio[0].filename}`
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

   
    await sendVolunteerEmail(application);

    res.status(201).json({ success: true });
  } catch (err) {
    console.error("Volunteer apply error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};


exports.getApplications = async (req, res) => {
  try {
    const { status, category, type, availability } = req.query;

    const filter = {};
    if (status) filter.status = status;
    if (type) filter.applicationType = type;
    if (availability) filter.availabilityPeriod = availability;
    if (category) filter.categories = category;

    const apps = await VolunteerApplication.find(filter).sort("-createdAt");
    res.json(apps);
  } catch {
    res.status(500).json({ message: "Failed to load applications" });
  }
};


exports.updateStatus = async (req, res) => {
  try {
    const app = await VolunteerApplication.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status,
        adminNotes: req.body.adminNotes,
      },
      { new: true }
    );

    res.json(app);
  } catch {
    res.status(500).json({ message: "Update failed" });
  }
};


exports.deleteApplication = async (req, res) => {
  try {
    await VolunteerApplication.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch {
    res.status(500).json({ success: false });
  }
};*/





const VolunteerApplication = require("../models/VolunteerApplication");

const sendVolunteerSubmissionEmail = require("../utils/sendVolunteerSubmissionEmail");
const sendVolunteerStatusEmail = require("../utils/sendVolunteerStatusEmail");


/* ===============================
   APPLY (Volunteer / Internship)
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

    // ✅ Normalize categories (checkbox safe)
    const categories = Array.isArray(req.body.categories)
      ? req.body.categories
      : req.body.categories
      ? [req.body.categories]
      : [];

    // ✅ CV required
    if (!req.files || !req.files.cv) {
      return res.status(400).json({ message: "CV is required" });
    }

    // ✅ Store relative paths only
    const cvUrl = `uploads/volunteers/${req.files.cv[0].filename}`;
    const portfolioUrl = req.files.portfolio
      ? `uploads/volunteers/${req.files.portfolio[0].filename}`
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
      status: "new",
    });

    // 📧 Email admin on submission
    await sendVolunteerSubmissionEmail(application);

    res.status(201).json({
      success: true,
      applicationId: application._id,
    });
  } catch (err) {
    console.error("Volunteer apply error:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/* ===============================
   ADMIN: GET APPLICATIONS
   (Filters supported)
================================ */
exports.getApplications = async (req, res) => {
  try {
    const { status, category, type, availability } = req.query;

    const filter = {};

    if (status) filter.status = status;
    if (type) filter.applicationType = type;
    if (availability) filter.availabilityPeriod = availability;
    if (category) filter.categories = category;

    const applications = await VolunteerApplication.find(filter)
      .sort("-createdAt");

    res.json(applications);
  } catch (err) {
    console.error("Load volunteer applications error:", err);
    res.status(500).json({ message: "Failed to load applications" });
  }
};

/* ===============================
   ADMIN: UPDATE STATUS
   (Approve / Reject → Email user)
================================ */
exports.updateStatus = async (req, res) => {
  try {
    const { status, adminNotes } = req.body;

    const application = await VolunteerApplication.findByIdAndUpdate(
      req.params.id,
      {
        status,
        adminNotes,
      },
      { new: true }
    );

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    // 📧 Email applicant on approve / reject
    if (["approved", "rejected"].includes(status)) {
      await sendVolunteerStatusEmail(application);
    }

    res.json(application);
  } catch (err) {
    console.error("Update status error:", err);
    res.status(500).json({ message: "Update failed" });
  }
};

/* ===============================
   ADMIN: DELETE APPLICATION
================================ */
exports.deleteApplication = async (req, res) => {
  try {
    const deleted = await VolunteerApplication.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.json({ success: true });
  } catch (err) {
    console.error("Delete volunteer application error:", err);
    res.status(500).json({ success: false });
  }
};

