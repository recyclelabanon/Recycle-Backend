const mongoose = require("mongoose");

const PartnerApplicationSchema = new mongoose.Schema(
  {
    organizationName: { type: String, required: true },

    partnerType: {
      type: String,
      required: true,
    },

    contactPerson: { type: String, required: true },
    email: { type: String, required: true },
    website: String,

    partnershipInterests: [String],

    description: String,

    status: {
      type: String,
      enum: ["new", "screened", "approved", "rejected"],
      default: "new",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "PartnerApplication",
  PartnerApplicationSchema
);
