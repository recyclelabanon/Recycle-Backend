const { body } = require('express-validator');


exports.validateVolunteerForm = [
  // Validate fullName
  body("fullName")
    .trim()
    .notEmpty()
    .withMessage("Full name is required")
    .isLength({ min: 3 })
    .withMessage("Full name must be at least 3 characters long"),

  // Validate email
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address"),

  // Validate availability
  body("availability")
    .trim()
    .notEmpty()
    .withMessage("Availability is required")
    .isIn(["weekdays", "weekends", "both"])
    .withMessage("Invalid availability option"),

  // Validate areaOfInterest
  body("areaOfInterest")
    .trim()
    .notEmpty()
    .withMessage("Area of interest is required")
    .isLength({ min: 3 })
    .withMessage("Area of interest must be at least 3 characters long"),

  // Validate motivation
  body("motivation")
    .trim()
    .notEmpty()
    .withMessage("Motivation is required")
    .isLength({ min: 20 })
    .withMessage("Motivation must be at least 20 characters long"),
];