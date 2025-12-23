const mongoose = require("mongoose");

const ResidencySchema = new mongoose.Schema(
  {
    residencyTitle: String,
    fullName: String,
    email: String,
    location: String,
    motivation: String,
    experience: String,
    attachments: [String],

    status: {
      type: String,
      enum: ["new", "approved", "rejected"],
      default: "new",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ResidencyApplication", ResidencySchema);
