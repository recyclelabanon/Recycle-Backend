// models/Navbar.js
const mongoose = require("mongoose");

const SubMenuSchema = new mongoose.Schema({
  name: { type: String, required: true },
  path: { type: String, required: true },
});

const NavItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  path: { type: String }, // optional if submenu exists
  submenu: [SubMenuSchema],
});

const NavbarSchema = new mongoose.Schema({
  logoUrl: { type: String },
  items: [NavItemSchema],
});

module.exports = mongoose.model("Navbar", NavbarSchema);
