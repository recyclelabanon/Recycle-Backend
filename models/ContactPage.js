/*const mongoose = require("mongoose");

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
module.exports = mongoose.models.Contact || mongoose.model("Contact", contactSchema);*/








/*const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema(
  {
    heading: { type: String, default: "" },
    description: { type: String, default: "" },

    workingHours: { type: String, default: "" },
    address: { type: String, default: "" },
    phone: { type: String, default: "" },
    email: { type: String, default: "" },
    visitUs: { type: String, default: "" },
    shopHours: { type: String, default: "" },

    iconWorkingHours: { type: String, default: "" },
    iconAddress: { type: String, default: "" },
    iconPhone: { type: String, default: "" },
    iconEmail: { type: String, default: "" },
    iconVisitUs: { type: String, default: "" },
    iconShopHours: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Contact || mongoose.model("ContactPage", contactSchema);*/



const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema(
  {
    headerTitle: { type: String, default: "" },
    headerSubtitle: { type: String, default: "" },

    heading: { type: String, default: "" },
    description: { type: String, default: "" },
    workingHours: { type: String, default: "" },
    address: { type: String, default: "" },
    phone: { type: String, default: "" },
    email: { type: String, default: "" },
    visitUs: { type: String, default: "" },
    shopHours: { type: String, default: "" },

    iconWorkingHours: { type: String, default: "" },
    iconAddress: { type: String, default: "" },
    iconPhone: { type: String, default: "" },
    iconEmail: { type: String, default: "" },
    iconVisitUs: { type: String, default: "" },
    iconShopHours: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.ContactPage ||
  mongoose.model("ContactPage", ContactSchema);
