const Partner = require("../models/Partner");
const cloudinary = require("cloudinary").v2;

// ✅ Get all partners
exports.getAllPartners = async (req, res) => {
  try {
    const partners = await Partner.find();
    res.status(200).json(partners);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ✅ Get partner by ID
exports.getPartnerById = async (req, res) => {
  try {
    const partner = await Partner.findById(req.params.id);
    if (!partner) return res.status(404).json({ message: "Partner not found" });
    res.status(200).json(partner);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ✅ Create new partner
exports.createPartner = async (req, res) => {
  try {
    let logoUrl = "";
    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: "partners",
      });
      logoUrl = uploadResult.secure_url;
    }

    const newPartner = new Partner({
      name: req.body.name,
      description: req.body.description,
      website: req.body.website,
      logo: logoUrl,
    });

    await newPartner.save();
    res.status(201).json(newPartner);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ✅ Update partner
exports.updatePartner = async (req, res) => {
  try {
    const partner = await Partner.findById(req.params.id);
    if (!partner) return res.status(404).json({ message: "Partner not found" });

    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: "partners",
      });
      partner.logo = uploadResult.secure_url;
    }

    partner.name = req.body.name || partner.name;
    partner.description = req.body.description || partner.description;
    partner.website = req.body.website || partner.website;

    await partner.save();
    res.status(200).json(partner);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ✅ Delete partner
exports.deletePartner = async (req, res) => {
  try {
    const partner = await Partner.findByIdAndDelete(req.params.id);
    if (!partner) return res.status(404).json({ message: "Partner not found" });
    res.status(200).json({ message: "Partner deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
