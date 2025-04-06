// src/middleware/validators.js
const { body } = require('express-validator');

const validateSignup = [
  body('username').notEmpty().withMessage('Username is required'),
  body('email').isEmail().withMessage('A valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];

const validateEmployee = [
  body('first_name').notEmpty().withMessage('First name is required'),
  body('last_name').notEmpty().withMessage('Last name is required'),
  body('email').isEmail().withMessage('A valid email is required'),
  body('designation').notEmpty().withMessage('Designation is required'),
  body('salary').isFloat({ min: 1000 }).withMessage('Salary must be at least 1000'),
  body('date_of_joining').notEmpty().withMessage('Date of joining is required'),
  body('department').notEmpty().withMessage('Department is required'),
];

module.exports = { validateSignup, validateEmployee };
