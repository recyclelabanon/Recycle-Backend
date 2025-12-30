const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// Configure Cloudinary (it uses the same config as the other file, assuming env vars are set)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "recycle-lebanon/careers", // Separate folder for organization
    resource_type: "auto", // Allow documents/pdfs if needed for careers (e.g. resumes)
    allowed_formats: ["jpg", "jpeg", "png", "pdf", "doc", "docx"],
  },
});

module.exports = multer({ storage });
