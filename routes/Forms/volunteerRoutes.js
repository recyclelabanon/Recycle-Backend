const express = require('express');
const router = express.Router();
const {
  volunteerForm,
  getAllVolunteer,
  deleteVolunteerForm,
} = require('../../controllers/Forms/volunteerController.js');
const { validateVolunteerForm } = require('../../Validators/volunteerValidator.js');
const {
  authenticateUser,
  authorizeRoles,
} = require('../../middleware/auth.js');

// Public: Submit volunteer form
router.post('/', validateVolunteerForm, volunteerForm);

// Admin-only: View and delete volunteer submissions
router.get('/', authenticateUser, authorizeRoles('admin'), getAllVolunteer);
router.delete('/:id', authenticateUser, authorizeRoles('admin'), deleteVolunteerForm);

module.exports = router;
