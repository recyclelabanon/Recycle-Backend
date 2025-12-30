// middleware/multer.js
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const path = require('path');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure storage engine
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'recycle-lebanon/general',
    resource_type: 'auto', // Auto detect type (image, video, raw)
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'mp4', 'pdf'], // Add more if needed
  }
});

// Configure multer instance
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit (increased for videos/PDFs)
  }
  // No need for manual fileFilter as allowed_formats in CloudinaryStorage handles it partially,
  // but if strict validation is needed, we can keep it. 
  // For now, relying on Cloudinary's allowed_formats is often enough, 
  // but keeping a custom filter is safer if we want to reject before upload starts.
});

module.exports = {
  singleUpload: upload.single('file'),
  multiUpload: upload.array('files', 5) // Max 5 files
};