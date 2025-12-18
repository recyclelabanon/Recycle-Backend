const PartnerApplication = require("../models/PartnerApplication");
const sendPartnerEmail = require("../utils/sendPartnerEmail");

/* ===============================
   APPLY – PARTNER WITH US
================================ */
exports.apply = async (req, res) => {
  try {
    const {
      organizationName,
      partnerType,
      contactPerson,
      email,
      website,
      description,
    } = req.body;

    const partnershipInterests = Array.isArray(req.body.partnershipInterests)
      ? req.body.partnershipInterests
      : req.body.partnershipInterests
      ? [req.body.partnershipInterests]
      : [];

    const application = await PartnerApplication.create({
      organizationName,
      partnerType,
      contactPerson,
      email,
      website,
      partnershipInterests,
      description,
    });

    // 📧 Notify admin
    await sendPartnerEmail(application);

    res.status(201).json({ success: true });
  } catch (err) {
    console.error("Partner apply error:", err);
    res.status(500).json({ success: false });
  }
};

/* ===============================
   ADMIN – GET APPLICATIONS
================================ */
exports.getApplications = async (req, res) => {
  try {
    const { type, interest, status } = req.query;

    const filter = {};
    if (type) filter.partnerType = type;
    if (interest) filter.partnershipInterests = interest;
    if (status) filter.status = status;

    const apps = await PartnerApplication.find(filter).sort("-createdAt");
    res.json(apps);
  } catch {
    res.status(500).json({ message: "Failed to load applications" });
  }
};

/* ===============================
   ADMIN – UPDATE STATUS
================================ */
exports.updateStatus = async (req, res) => {
  const app = await PartnerApplication.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );
  res.json(app);
};

/* ===============================
   ADMIN – DELETE
================================ */
exports.deleteApplication = async (req, res) => {
  await PartnerApplication.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};
