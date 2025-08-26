const { body } = require('express-validator');


exports.validatePartnerForm = [
  // Validate organizationName
  body("organizationName")
    .trim()
    .notEmpty()
    .withMessage("Organization name is required")
    .isLength({ min: 3 })
    .withMessage("Organization name must be at least 3 characters long"),

  // Validate contactPerson
  body("contactPerson")
    .trim()
    .notEmpty()
    .withMessage("Contact person name is required")
    .isLength({ min: 3 })
    .withMessage("Contact person name must be at least 3 characters long"),

  // Validate email
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address"),

  // Validate phone
  body("phone")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required")
    .matches(/^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$/)
    .withMessage("Invalid phone number format"),

  // Validate partnershipInterest
  body("partnershipInterest")
    .trim()
    .notEmpty()
    .withMessage("Partnership interest is required")
    .isLength({ min: 20 })
    .withMessage("Partnership interest must be at least 20 characters long"),
];