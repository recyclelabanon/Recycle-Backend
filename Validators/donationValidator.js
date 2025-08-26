const { body } = require('express-validator');



exports.validateDonation = [
    body('donationType')
    .isIn(['one-time', 'monthly'])
    .withMessage('Invalid donation type'),

    body('amount')
    .isFloat({ min: 1 })
    .withMessage('Amount must be at least 1'),

    body('name')
    .notEmpty()
    .withMessage('Name is required'),

    body('email')
    .isEmail()
    .withMessage('Invalid email address'),
  ];