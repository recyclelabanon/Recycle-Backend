const mongoose = require("mongoose");

const VolunteerCategorySchema = new mongoose.Schema(
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

module.exports = mongoose.model("VolunteerCategory", VolunteerCategorySchema);
