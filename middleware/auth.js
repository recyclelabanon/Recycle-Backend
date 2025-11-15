/*const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { ForbiddenError, UnauthenticatedError } = require('../utils/errors');


const authenticateUser = async (req, res, next) => {
  try {
    
    const authHeader = req.headers.authorization || req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthenticatedError('Authentication invalid: No token provided');
    }

    
    const token = authHeader.split(' ')[1];
    
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    
    const user = await User.findById(decoded.userId);

    if (!user) {
      return next(new UnauthenticatedError('Authentication invalid: User not found'));
    }

    
    req.user = {
      ...user.toObject(), 
      userId: user._id,   
      token: token        
    };

    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return next(new UnauthenticatedError('Authentication invalid: Invalid token'));
    }
    return next(error);
  }
};


  @param {...String} roles - Allowed roles
 
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      throw new UnauthenticatedError('Authentication required');
    }
    
    if (!roles.includes(req.user.role)) {
      throw new ForbiddenError('Unauthorized to access this route');
    }
    next();
  };
};


const authenticateToken = authenticateUser;
const isAdmin = authorizeRoles('admin');

module.exports = {
  authenticateUser,
  authorizeRoles,
  authenticateToken, 
  isAdmin           
};*/





const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { ForbiddenError, UnauthenticatedError } = require('../utils/errors');

/**
 * Main authentication middleware that verifies JWT token and attaches user to request
 */
const authenticateUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthenticatedError('Authentication invalid: No token provided');
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId);
    if (!user) {
      return next(new UnauthenticatedError('Authentication invalid: User not found'));
    }

    req.user = {
      ...user.toObject(),
      userId: user._id,
      token: token
    };

    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return next(new UnauthenticatedError('Authentication invalid: Invalid token'));
    }
    return next(error);
  }
};

/**
 * Role-based authorization middleware
 * Automatically bypassed in development mode for testing
 */
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    // ✅ Skip role checking in development
    if (process.env.NODE_ENV === 'development') {
      console.log('⚠️ DEV MODE: Skipping role check. Allowed roles:', roles);
      return next();
    }

    // ✅ Normal check for production
    if (!req.user) {
      throw new UnauthenticatedError('Authentication required');
    }

    if (!roles.includes(req.user.role)) {
      throw new ForbiddenError('Unauthorized to access this route');
    }

    next();
  };
};

// Aliases for backward compatibility
const authenticateToken = authenticateUser;
const isAdmin = authorizeRoles('admin');

module.exports = {
  authenticateUser,
  authorizeRoles,
  authenticateToken,
  isAdmin
};
