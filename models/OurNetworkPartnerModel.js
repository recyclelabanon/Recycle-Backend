const mongoose = require("mongoose");

const ourNetworkPartnerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: {
    type: String,
    enum: ["coalition", "donor", "government", "project"],
    required: true,
  },
  image: { type: String, required: true },
  order: { type: Number, default: 0 }, // for sorting
});

module.exports = mongoose.model("OurNetworkPartner", ourNetworkPartnerSchema);
