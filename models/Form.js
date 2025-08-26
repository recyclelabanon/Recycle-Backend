const mongoose = require('mongoose');

// Career Schema
const careerSchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  position: { type: String, required: true, trim: true },
  resumePath: { type: String, required: true, trim: true },
  coverLetter: { type: String, required: true, trim: true },
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'interviewed', 'accepted', 'rejected'],
    default: 'pending',
  }
}, { timestamps: true });

const Career = mongoose.model("Career", careerSchema);

// Contact Schema
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  message: { type: String, required: true, trim: true }
}, { timestamps: true });

const Contact = mongoose.model("Contact", contactSchema);

// Donation Schema
const donationSchema = new mongoose.Schema({
  donationType: {
    type: String,
    enum: ['one-time', 'monthly'],
    required: true,
  },
  amount: { type: Number, required: true, min: 1 },
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  message: { type: String, default: '', trim: true },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending',
  }
}, { timestamps: true });

const Donation = mongoose.model("Donation", donationSchema);

// Partner Schema
const partnerSchema = new mongoose.Schema({
  organizationName: { type: String, required: true, trim: true },
  contactPerson: { type: String, required: true, trim: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  phone: { type: String, required: true, trim: true },
  partnershipInterest: { type: String, required: true, trim: true },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  }
}, { timestamps: true });

const Partner = mongoose.model("Partner", partnerSchema);

// Subscribe Schema
const subscribeSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true }
}, { timestamps: true });

const Subscribe = mongoose.model("Subscribe", subscribeSchema);

// Volunteer Schema
const volunteerSchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  availability: {
    type: String,
    enum: ['weekdays', 'weekends', 'both'],
    required: true,
  },
  areaOfInterest: { type: String, required: true, trim: true },
  motivation: { type: String, required: true, trim: true },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  }
}, { timestamps: true });

const Volunteer = mongoose.model("Volunteer", volunteerSchema);

// Export all models
module.exports = {
  Career,
  Contact,
  Donation,
  Partner,
  Subscribe,
  Volunteer
};

