const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Valid types
const allowedMimeTypes = [
  'image/jpeg',
  'image/png',
  'image/jpg',
  'image/gif',
  'video/mp4',
  'video/quicktime', // .mov
  'application/pdf'
];

// Determine Cloudinary resource type
function getResourceType(mimeType) {
  if (mimeType.startsWith('image/')) return 'image';
  if (mimeType.startsWith('video/')) return 'video';
  if (mimeType === 'application/pdf') return 'raw';
  return 'raw';
}

// Cloudinary Storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const resourceType = getResourceType(file.mimetype);

    return {
      folder: 'event-manager',
      resource_type: resourceType,
      public_id: `${Date.now()}-${file.originalname.split('.')[0]}`,
      format: file.mimetype.split('/')[1]
    };
  }
});

// Multer Upload with File Filter
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('File type not allowed'), false);
    }
  }
});

module.exports = {
  cloudinary,
  upload
};
