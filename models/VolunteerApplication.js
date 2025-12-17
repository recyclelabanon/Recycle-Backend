const mongoose = require("mongoose");

const VolunteerApplicationSchema = new mongoose.Schema(
  {
    // 🔹 Applicant Info
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    location: { type: String },

    // 🔹 Profile
    backgroundSkills: { type: String },
    motivation: { type: String },

    // 🔹 Files
    cvUrl: { type: String, required: true },
    portfolioUrl: { type: String },

    // 🔹 Availability
    availabilityPeriod: {
      type: String, // e.g. "June–August", "Winter", "6 months"
    },
    daysPerWeek: {
      type: String, // "1–2 days", "3–4 days", "Full time"
    },

    // 🔹 Category & Type
    categories: [{ type: String }], // Agroecology, Media, Cooking, etc.
    applicationType: {
      type: String,
      enum: ["volunteer", "internship"],
      default: "volunteer",
    },

    // 🔹 Admin Screening
    status: {
      type: String,
      enum: ["new", "screened", "shortlisted", "approved", "rejected"],
      default: "new",
    },
    adminNotes: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "VolunteerApplication",
  VolunteerApplicationSchema
);
