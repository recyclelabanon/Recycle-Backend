const { validationResult }= require("express-validator");
const {Volunteer} = require("../../models/Form"); // Adjust the path as necessary


exports.volunteerForm = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullName, email, availability, areaOfInterest, motivation } = req.body;

    // Create a new volunteer document
    const volunteer = new Volunteer({
      fullName,
      email,
      availability,
      areaOfInterest,
      motivation,
    });

    // Save the document to the database
    await volunteer.save();

    // Send success response
    res.status(201).json({ message: "Volunteer application submitted successfully", volunteer });
  } catch (error) {
    console.error("Error submitting volunteer application:", error);
    res.status(500).json({ message: "Error submitting volunteer application", error: error.message });
  }
};

exports.getAllVolunteer = async (req, res) => {
  try {
    const volunteer = await Volunteer.find({});
    res.status(200).json(volunteer);
  } catch (error) {
    console.error("Error retrieving volunteer data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteVolunteerForm = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteVolunteer = await Volunteer.findByIdAndDelete(id);
    if (!deleteVolunteer) {
      return res.status(404).json({ error: "Volunteer not found" });
    }

    res.status(200).json({ message: "Volunteer deleted" });
  } catch (error) {
    console.error("Error deleting Volunteer:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
