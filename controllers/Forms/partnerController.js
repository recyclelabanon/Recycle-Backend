const { validationResult }= require("express-validator");

const {Partner} = require("../../models/Form"); // Adjust the path as necessary


exports.partnerForm = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { organizationName, contactPerson, email, phone, partnershipInterest } = req.body;

    // Create a new partner document
    const partner = new Partner({
      organizationName,
      contactPerson,
      email,
      phone,
      partnershipInterest,
    });

    // Save the document to the database
    await partner.save();

    // Send success response
    res.status(201).json({ message: "Partnership request submitted successfully", partner });
  } catch (error) {
    console.error("Error submitting partnership request:", error);
    res.status(500).json({ message: "Error submitting partnership request", error: error.message });
  }
};

exports.getAllPartner = async (req, res) => {
  try {
    const partner = await Partner.find({});
    res.status(200).json(partner);
  } catch (error) {
    console.error("Error retrieving partner data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deletePartnerForm = async (req, res) => {
  try {
    const { id } = req.params;

    const deletePartner = await Partner.findByIdAndDelete(id);
    if (!deletePartner) {
      return res.status(404).json({ error: "Partner not found" });
    }

    res.status(200).json({ message: "Partner deleted" });
  } catch (error) {
    console.error("Error deleting Partner:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
