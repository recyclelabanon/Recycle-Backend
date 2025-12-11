// models/TeamPage.js
const mongoose = require("mongoose");

const MemberSchema = new mongoose.Schema({
  image: { type: String, default: "" },       
  name: { type: String, default: "" },
  designation: { type: String, default: "" },
  description: { type: String, default: "" },
  linkedin: { type: String, default: "" },
  email: { type: String, default: "" },
});

const TeamSectionSchema = new mongoose.Schema({
  category: { type: String, default: "" },
  members: { type: [MemberSchema], default: [] },
});

const TeamPageSchema = new mongoose.Schema({
  hero: {
    title: { type: String, default: "" },
    subtitle: { type: String, default: "" },
    backgroundImage: { type: String, default: "" },
  },
  workWithUs: {
    type: [
      {
        title: { type: String, default: "" },
        text: { type: String, default: "" },
        buttonText: { type: String, default: "" },
        buttonLink: { type: String, default: "" },
      },
    ],
    default: [],
  },
  teamSections: { type: [TeamSectionSchema], default: [] },

  lastUpdated: { type: Date, default: Date.now },
});

module.exports = mongoose.model("TeamPage", TeamPageSchema);



