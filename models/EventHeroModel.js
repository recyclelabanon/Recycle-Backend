const mongoose = require("mongoose");

const eventHeroSchema = new mongoose.Schema({
  title: { type: String, default: "Join Our Events" },
  subtitle: { type: String, default: "Be part of something bigger - connect, learn, and make an impact." },
  backgroundImage: { type: String, default: "https://image.shutterstock.com/image-photo/corporate-development-seminar-business-people-260nw-2485558527.jpg" },
});

module.exports = mongoose.model("EventHero", eventHeroSchema);
