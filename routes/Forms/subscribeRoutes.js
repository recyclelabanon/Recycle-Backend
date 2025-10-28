const express = require('express');
const router = express.Router();
const {
  subscribeForm,
  getSubscribeEmails,
  deleteSubscribeEmail,
} = require('../../controllers/Forms/SubscribeController.js');
const {
  authenticateUser,
  authorizeRoles,
} = require('../../middleware/auth.js');

// Public: Subscribe to the newsletter
router.post('/', subscribeForm);

// Admin-only: View and delete subscriber emails
router.get('/', authenticateUser, authorizeRoles('admin'), getSubscribeEmails);
router.delete('/:id', authenticateUser, authorizeRoles('admin'), deleteSubscribeEmail);

module.exports = router;