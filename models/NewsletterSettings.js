const mongoose = require("mongoose");

const NewsletterSettingsSchema = new mongoose.Schema({
  title: { type: String, default: "Receive whispers of change" },
  subtitle: { type: String, default: "Join our journey and receive reflections of our environmental impact." }
});

module.exports = mongoose.model("NewsletterSettings", NewsletterSettingsSchema);
