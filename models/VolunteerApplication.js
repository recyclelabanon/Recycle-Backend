const mongoose = require("mongoose");

const VolunteerApplicationSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    location: String,

    backgroundSkills: String,
    motivation: String,

    availabilityPeriod: String,
    daysPerWeek: String,

    categories: [String],

    applicationType: {
      type: String,
      enum: ["volunteer", "internship"],
      default: "volunteer",
    },

    cvUrl: { type: String, required: true },
    portfolioUrl: String,

    status: {
      type: String,
      enum: ["new", "screened", "shortlisted", "approved", "rejected"],
      default: "new",
    },

    adminNotes: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("VolunteerApplication", VolunteerApplicationSchema);
