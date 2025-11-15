// models/FooterSettings.js
const mongoose = require("mongoose");

const FooterSettingsSchema = new mongoose.Schema({
  supportTitle: { type: String, default: "Support the Movement" },
  supportSubtitle: { type: String, default: "Help us accelerate Lebanon’s transition toward a regenerative and ecological future. Your support makes a real impact." },
  donateLabel: { type: String, default: "Donate Now" },
  shopLabel: { type: String, default: "Shop at EcoSouk" },

  // Contact block
  contactTitle: { type: String, default: "Contact Us" },
  address: { type: String, default: "Saint Louise Street, Kehdy Building, Fassouh, Beirut, Lebanon" },
  contactEmail: { type: String, default: "contact@recyclelebanon.org" },
  contactPhone: { type: String, default: "+961 71 131 115" },

  // Branding & icons (Cloudinary URLs)
  logoUrl: { type: String, default: "" },
  linkedinIconUrl: { type: String, default: "" },

  // Footer copyright text
  copyrightText: { type: String, default: `© ${new Date().getFullYear()} Recycle Lebanon. All rights reserved.` },
}, { timestamps: true });

module.exports = mongoose.model("FooterSettings", FooterSettingsSchema);
