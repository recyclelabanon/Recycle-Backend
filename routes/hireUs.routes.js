// routes/hireUs.routes.js
const express = require('express');
const router = express.Router();
const { getHireUs, createHireUs, updateHireUs } = require('../controllers/hireUs.controller');

// read
router.get('/', getHireUs);

// create (optional)
router.post('/', createHireUs);

// update (create if missing)
router.patch('/update', updateHireUs);

module.exports = router;
