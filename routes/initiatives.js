const express = require('express');
const router = express.Router();
const controller = require('../controllers/initiativeController');

// Public read
router.get('/', controller.getPage);

// Admin updates (no auth included — add auth middleware as needed)
router.put('/page', controller.updatePageSettings);

// Programs
router.post('/programs', controller.addProgram);
router.put('/programs/:programId', controller.updateProgram);
router.delete('/programs/:programId', controller.deleteProgram);

module.exports = router;
