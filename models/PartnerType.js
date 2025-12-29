const mongoose = require("mongoose");

const PartnerTypeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("PartnerType", PartnerTypeSchema);
