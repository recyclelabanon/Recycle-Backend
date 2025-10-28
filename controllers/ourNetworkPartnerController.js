const OurNetworkPartner = require("../models/OurNetworkPartnerModel");

// 🟢 Get all partners
const getAllPartners = async (req, res) => {
  try {
    const partners = await OurNetworkPartner.find().sort({ order: 1 });
    res.status(200).json(partners);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🟢 Add new partner
const addPartner = async (req, res) => {
  try {
    const { name, category, image, order } = req.body;
    const partner = new OurNetworkPartner({ name, category, image, order });
    await partner.save();
    res.status(201).json(partner);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🟢 Update partner
const updatePartner = async (req, res) => {
  try {
    const updated = await OurNetworkPartner.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🟢 Delete partner
const deletePartner = async (req, res) => {
  try {
    await OurNetworkPartner.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Partner deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🟢 Reorder partners
const reorderPartners = async (req, res) => {
  try {
    const { reordered } = req.body; // [{id, order}, ...]
    const updates = reordered.map(({ id, order }) =>
      OurNetworkPartner.findByIdAndUpdate(id, { order })
    );
    await Promise.all(updates);
    res.status(200).json({ message: "Reordered successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllPartners, addPartner, updatePartner, deletePartner, reorderPartners };
