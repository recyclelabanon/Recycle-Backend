const mongoose = require("mongoose");

const CareerApplicationSchema = new mongoose.Schema(
  {
    fullName: String,
    email: String,
    role: String,
    message: String,

    resumeUrl: String,
    portfolioUrl: String,

    referenceName: String,
    referenceContact: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "CareerApplication",
  CareerApplicationSchema
);
