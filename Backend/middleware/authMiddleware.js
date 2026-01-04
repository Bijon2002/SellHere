const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.isAuthenticated = async (req, res, next) => {
  let token;
  
  // Check if token exists in Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];
      
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Get user from database (exclude password)
      req.user = await User.findById(decoded.id).select('-password');
      
      if (!req.user) {
        return res.status(401).json({ 
          success: false,
          message: 'User not found' 
        });
      }
      
      // Check if user account is active
      if (!req.user.isActive) {
        return res.status(403).json({ 
          success: false,
          message: 'Account is deactivated' 
        });
      }
      
      next();
    } catch (err) {
      console.error('Auth middleware error:', err.message);
      
      // Handle specific JWT errors
      if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({ 
          success: false,
          message: 'Invalid token' 
        });
      }
      
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ 
          success: false,
          message: 'Token expired' 
        });
      }
      
      res.status(401).json({ 
        success: false,
        message: 'Not authorized' 
      });
    }
  } else {
    res.status(401).json({ 
      success: false,
      message: 'Not authorized, no token provided' 
    });
  }
};

exports.isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ 
      success: false,
      message: 'Access denied. Admin privileges required.' 
    });
  }
};