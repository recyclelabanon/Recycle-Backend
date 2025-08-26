// routes/Forms/careerRoutes.js
const express = require('express');
const router = express.Router();
const {
  createCareer,
  getAllCareer,
  deleteCareerForm,
} = require('../../controllers/Forms/careerController.js');
const { validateCareerForm } = require('../../Validators/careerValidator.js');
const { authenticateUser, authorizeRoles } = require('../../middleware/auth.js');
const { upload } = require('../../config/cloudinary.js');

// Public: submit a career application with resume upload
router.post(
  '/',
  upload.single('resume'),
  validateCareerForm,
  createCareer
);

// Admin-only: view all and delete applications
router.get('/', authenticateUser, authorizeRoles('admin'), getAllCareer);
router.delete('/:id', authenticateUser, authorizeRoles('admin'), deleteCareerForm);

module.exports = router;
