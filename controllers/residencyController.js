const ResidencyApplication = require("../models/ResidencyApplication");

exports.applyResidency = async (req, res) => {
  try {
    const app = await ResidencyApplication.create(req.body);
    res.json(app);
  } catch (err) {
    res.status(500).json({ message: "Application failed", error: err.message });
  }
};

exports.getApplications = async (req, res) => {
  try {
    const apps = await ResidencyApplication.find().populate("eventId");
    res.json(apps);
  } catch (err) {
    res.status(500).json({ message: "Fetch failed", error: err.message });
  }
};
