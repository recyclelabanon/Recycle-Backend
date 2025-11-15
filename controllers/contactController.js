const Contact = require("../models/Contact");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ Get Contact Data
exports.getContact = async (req, res) => {
  try {
    const contact = await Contact.findOne().sort({ updatedAt: -1 });
    if (!contact) return res.status(200).json({});
    res.json(contact);
  } catch (err) {
    console.error("❌ Error fetching contact:", err);
    res.status(500).json({ message: err.message });
  }
};

// ✅ Update or Create Contact
exports.updateContact = async (req, res) => {
  try {
    const updateData = { ...req.body };

    // ✅ Upload icons from memory (Cloudinary)
    if (req.files && Object.keys(req.files).length > 0) {
      for (const key in req.files) {
        const file = req.files[key][0];
        if (!file) continue;

        await new Promise((resolve) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { folder: "contact-icons", resource_type: "image" },
            (error, result) => {
              if (error) {
                console.error(`❌ Cloudinary upload failed for ${key}:`, error.message);
              } else {
                updateData[key] = result.secure_url;
              }
              resolve();
            }
          );
          uploadStream.end(file.buffer);
        });
      }
    }

    // ✅ Update existing or create new
    let contact = await Contact.findOne().sort({ updatedAt: -1 });
    if (contact) {
      contact = await Contact.findByIdAndUpdate(contact._id, updateData, { new: true });
    } else {
      contact = await Contact.create(updateData);
    }

    res.json(contact);
  } catch (err) {
    console.error("❌ Error in updateContact:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
