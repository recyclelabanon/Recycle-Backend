const Programme = require("../models/Programme");
const { cloudinary } = require("../utils/cloudinary"); // ✅ import cloudinary

// ✅ Create Programme
exports.createProgramme = async (req, res) => {
  try {
    const { name, location, phone, email, hours, website } = req.body;

    console.log("📥 Received data:", req.body);
    console.log("☁️ Uploaded file info:", req.file);

    // Basic validation
    if (!name || !location) {
      return res.status(400).json({ message: "Name and location are required." });
    }

    // ✅ If image uploaded, Cloudinary returns the file path as a URL
    const newProgramme = new Programme({
      name,
      location,
      phone,
      email,
      hours,
      website,
      icon: req.file ? req.file.path : null, // Cloudinary's hosted URL
    });

    await newProgramme.save();
    res.status(201).json(newProgramme);
  } catch (error) {
    console.error("❌ Error creating programme:", error);
    res.status(400).json({
      message: "Failed to create programme",
      error: error.message,
    });
  }
};

// ✅ Get all Programmes
exports.getProgrammes = async (req, res) => {
  try {
    const programmes = await Programme.find();
    res.status(200).json(programmes);
  } catch (error) {
    console.error("❌ Error fetching programmes:", error);
    res.status(500).json({
      message: "Failed to fetch programmes",
      error: error.message,
    });
  }
};

// ✅ Get single Programme by ID
exports.getProgrammeById = async (req, res) => {
  try {
    const programme = await Programme.findById(req.params.id);
    if (!programme)
      return res.status(404).json({ message: "Programme not found" });

    res.status(200).json(programme);
  } catch (error) {
    console.error("❌ Error fetching programme:", error);
    res.status(500).json({
      message: "Error fetching programme",
      error: error.message,
    });
  }
};

// ✅ Update Programme
exports.updateProgramme = async (req, res) => {
  try {
    const updatedFields = {
      ...req.body,
      icon: req.file ? req.file.path : req.body.icon, // Cloudinary URL if new file uploaded
    };

    const programme = await Programme.findByIdAndUpdate(
      req.params.id,
      updatedFields,
      { new: true }
    );

    if (!programme)
      return res.status(404).json({ message: "Programme not found" });

    res.status(200).json(programme);
  } catch (error) {
    console.error("❌ Error updating programme:", error);
    res.status(400).json({
      message: "Failed to update programme",
      error: error.message,
    });
  }
};

// ✅ Delete Programme
exports.deleteProgramme = async (req, res) => {
  try {
    const programme = await Programme.findByIdAndDelete(req.params.id);
    if (!programme)
      return res.status(404).json({ message: "Programme not found" });

    res.status(200).json({ message: "Programme deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting programme:", error);
    res.status(400).json({
      message: "Failed to delete programme",
      error: error.message,
    });
  }
};
