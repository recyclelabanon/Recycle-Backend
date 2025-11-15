const express = require('express');
const router = express.Router();
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

const { getHero, updateHero } = require('../controllers/contactHeroController');

// Multer + Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'contact-hero',
    allowed_formats: ['jpg', 'jpeg', 'png'],
  },
});
const parser = multer({ storage });

// Routes
router.get('/', getHero);
router.post('/', parser.single('backgroundImage'), updateHero);

module.exports = router;
