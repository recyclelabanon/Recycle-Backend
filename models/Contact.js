const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  heading: String,
  description: String,
  subHeading: String,
  subDescription: String,
  workingHours: String,
  address: String,
  phone: String,
  email: String,
  visitUs: String,
  shopHours: String,
  iconAddress: String,
  iconPhone: String,
  iconEmail: String,
  iconWorkingHours: String,
  iconVisitUs: String,
  iconShopHours: String,
});

// ✅ Prevent OverwriteModelError
module.exports = mongoose.models.Contact || mongoose.model("Contact", contactSchema);
