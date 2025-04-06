// src/middleware/auth.js
const jwt = require('jsonwebtoken');
const { verifyToken } = require('../config/jwt');
const dotenv = require('dotenv');
dotenv.config();

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1]; // Format: "Bearer <token>"
    try {
      const user = verifyToken(token);
      req.user = user; // Attach user info to the request object
    } catch (error) {
      console.warn('Invalid token', error);
    }
  }
  next();
};

module.exports = authMiddleware;
