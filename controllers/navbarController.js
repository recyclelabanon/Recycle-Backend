// controllers/navbarController.js
const Navbar = require("../models/Navbar");
const { uploadToCloudinary } = require("../utils/cloudinary");

exports.getNavbar = async (req, res) => {
  try {
    let navbar = await Navbar.findOne();
    if (!navbar) {
      navbar = await Navbar.create({ items: [] });
    }
    res.json(navbar);
  } catch (err) {
    console.error("Navbar GET error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateNavbar = async (req, res) => {
  try {
    const body = req.body || {};
    let navbar = await Navbar.findOne();
    if (!navbar) navbar = new Navbar();

    // Logo upload
    if (req.file) {
      const logoUrl = await uploadToCloudinary(req.file.buffer, "navbar/logo");
      navbar.logoUrl = logoUrl;
    }

    // Items (expect array in req.body.items)
    if (body.items) {
      // If coming as JSON string from form-data, parse it
      const items = typeof body.items === "string" ? JSON.parse(body.items) : body.items;
      navbar.items = items;
    }

    await navbar.save();
    res.json(navbar);
  } catch (err) {
    console.error("Navbar PUT error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
