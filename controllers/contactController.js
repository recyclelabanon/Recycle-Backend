/*const Contact = require("../models/Contact");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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

exports.updateContact = async (req, res) => {
  try {
    const updateData = { ...req.body };

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
};*/





// Backend/controllers/contactController.js
const Contact = require("../models/ContactPage");
const cloudinary = require("cloudinary").v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// Only these fields are allowed for admin
const ALLOWED_FIELDS = new Set([
  "headerTitle",
  "headerSubtitle",

  "heading",
  "description",
  "workingHours",
  "address",
  "phone",
  "email",
  "visitUs",
  "shopHours",

  "iconWorkingHours",
  "iconAddress",
  "iconPhone",
  "iconEmail",
  "iconVisitUs",
  "iconShopHours",
]);

// Helper: upload buffer to Cloudinary
const uploadBufferToCloudinary = async (buffer, folder = "contact-icons") => {
  if (!buffer || !(buffer instanceof Buffer)) return null;

  return new Promise((resolve) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: "image" },
      (err, result) => {
        if (err) {
          console.error("Cloudinary upload error:", err);
          return resolve(null);
        }
        resolve(result.secure_url);
      }
    );
    stream.end(buffer);
  });
};

// GET contact info
exports.getContact = async (req, res) => {
  try {
    const contact = await Contact.findOne().sort({ updatedAt: -1 });
    res.json(contact || {});
  } catch (err) {
    console.error("Error fetching contact:", err);
    res.status(500).json({ message: "Failed to load contact", error: err.message });
  }
};

// UPDATE contact info (admin)
exports.updateContact = async (req, res) => {
  try {
    console.log("req.body (admin update):", req.body); // debug

    // 1️⃣ Keep only allowed text fields
    const updateData = {};
    for (const key of Object.keys(req.body || {})) {
      if (ALLOWED_FIELDS.has(key)) updateData[key] = req.body[key];
    }

    // 2️⃣ Handle icon uploads (from multer.memoryStorage)
    if (req.files && typeof req.files === "object") {
      for (const key of Object.keys(req.files)) {
        const fileArray = req.files[key];
        if (!Array.isArray(fileArray) || fileArray.length === 0) continue;

        const file = fileArray[0];
        if (!file || !file.buffer || file.buffer.length === 0) continue;

        const uploadedUrl = await uploadBufferToCloudinary(file.buffer, "contact-icons");

        if (uploadedUrl) {
          updateData[key] = uploadedUrl;
        }
      }
    }

    // 3️⃣ Update existing or create new
    let contact = await Contact.findOne().sort({ updatedAt: -1 });

    if (contact) {
      contact = await Contact.findByIdAndUpdate(contact._id, updateData, {
        new: true,
        runValidators: false,
      });
    } else {
      contact = await Contact.create(updateData);
    }

    res.json(contact);
  } catch (err) {
    console.error("Error in updateContact:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
