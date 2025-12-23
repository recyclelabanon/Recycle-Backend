const Residency = require("../models/ResidencyApplication");
const sendResidencySubmissionEmail = require("../utils/sendResidencySubmissionEmail");
const sendResidencyStatusEmail = require("../utils/sendResidencyStatusEmail");

exports.apply = async (req, res) => {
  const attachments = req.files?.map(f => `uploads/residency/${f.filename}`) || [];

  const app = await Residency.create({
    ...req.body,
    attachments,
  });

  await sendResidencySubmissionEmail(app);

  res.status(201).json({ success: true });
};

exports.getAll = async (req, res) => {
  const apps = await Residency.find().sort("-createdAt");
  res.json(apps);
};

exports.updateStatus = async (req, res) => {
  const app = await Residency.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );

  await sendResidencyStatusEmail(app);

  res.json(app);
};
