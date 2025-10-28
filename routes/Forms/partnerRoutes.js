const express = require('express');
const router = express.Router();
const {
  partnerForm,
  getAllPartner,
  deletePartnerForm,
} = require('../../controllers/Forms/partnerController.js');
const { validatePartnerForm } = require('../../Validators/partnerValidator.js');
const {
  authenticateUser,
  authorizeRoles,
} = require('../../middleware/auth.js');

// Public: Submit a partner form
router.post('/', validatePartnerForm, partnerForm);

// Admin-only: View and delete partner entries
router.get('/', authenticateUser, authorizeRoles('admin'), getAllPartner);
router.delete('/:id', authenticateUser, authorizeRoles('admin'), deletePartnerForm);

module.exports = router;