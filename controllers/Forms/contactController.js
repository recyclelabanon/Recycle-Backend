const {Contact} = require("../../models/Form"); // Adjust the path as necessary
const validator = require("validator");

// Submit contact form
exports.contactForm = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const existingContact = await Contact.findOne({ email });
    if (existingContact) {
      return res
        .status(400)
        .json({ error: "Contact with this email already exists" });
    }

    await Contact.create({ name, email, message });
    res.status(201).json({ message: "Contact form submitted successfully" });
  } catch (error) {
    console.error("Error submitting contact form:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get all contact submissions
exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({});
    res.status(200).json(contacts);
  } catch (error) {
    console.error("Error retrieving contact data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete a specific contact form entry
exports.deleteContactForm = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedContact = await Contact.findByIdAndDelete(id);
    if (!deletedContact) {
      return res.status(404).json({ error: "Contact not found" });
    }

    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    console.error("Error deleting contact:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

