const express = require('express');
const {
  contactForm,
  getAllContacts,
  deleteContactForm,
} = require('../../controllers/Forms/contactController.js');
const {
  authenticateUser,
  authorizeRoles,
} = require('../../middleware/auth.js');

const router = express.Router();

router.post('/', contactForm);


router.get('/', authenticateUser, authorizeRoles('admin'), getAllContacts);
router.delete('/:id', authenticateUser, authorizeRoles('admin'), deleteContactForm);

module.exports = router;
