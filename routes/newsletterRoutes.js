const express = require("express");
const router = express.Router();
const NewsletterSettings = require("../models/NewsletterSettings");
const Subscriber = require("../models/Subscriber");

// ✅ Get text settings
router.get("/settings", async (req, res) => {
  let settings = await NewsletterSettings.findOne();
  if (!settings) settings = await NewsletterSettings.create({});
  res.json(settings);
});

// ✅ Update text settings (Admin)
router.put("/settings", async (req, res) => {
  const { title, subtitle } = req.body;
  let settings = await NewsletterSettings.findOne();
  
  if (settings) {
    settings.title = title;
    settings.subtitle = subtitle;
    await settings.save();
  } else {
    settings = await NewsletterSettings.create({ title, subtitle });
  }

  res.json(settings);
});

// ✅ Subscribe user
router.post("/subscribe", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email required" });

  const exists = await Subscriber.findOne({ email });
  if (exists) return res.status(400).json({ message: "Already subscribed" });

  await Subscriber.create({ email });
  res.json({ message: "Subscribed!" });
});

// ✅ Get all subscribers
router.get("/subscribers", async (req, res) => {
  const subs = await Subscriber.find().sort({ createdAt: -1 });
  res.json(subs);
});

// ✅ Delete subscriber
router.delete("/subscribers/:id", async (req, res) => {
  await Subscriber.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
