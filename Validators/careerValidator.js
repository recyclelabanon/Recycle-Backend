const { body } = require('express-validator');

exports.validateCareerForm = [
  // Validate fullName
  body('fullName')
    .trim()
    .notEmpty()
    .withMessage('Full name is required')
    .isLength({ min: 3 })
    .withMessage('Full name must be at least 3 characters long'),

  // Validate email
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email address'),

  // Validate position
  body('position')
    .trim()
    .notEmpty()
    .withMessage('Position is required')
    .isLength({ min: 3 })
    .withMessage('Position must be at least 3 characters long'),

  // Validate coverLetter
  body('coverLetter')
    .trim()
    .notEmpty()
    .withMessage('Cover letter is required')
    .isLength({ min: 50 })
    .withMessage('Cover letter must be at least 50 characters long'),
];