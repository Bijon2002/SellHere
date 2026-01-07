const express = require('express');
const { 
  registerUser, 
  loginUser,
  getUserProfile,
  updateUserProfile,
  refreshToken,
  logout
} = require('../Controller/authController');
const { isAuthenticated } = require('../middleware/authMiddleware');
const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/refresh-token', refreshToken);
router.post('/logout', logout);

// Protected routes (require authentication)
router.get('/me', isAuthenticated, getUserProfile);      // Get user profile
router.put('/profile', isAuthenticated, updateUserProfile); // Update profile

// Test route
router.get('/test', (req, res) => res.json({ 
  success: true,
  message: 'Auth routes working!' 
}));

module.exports = router;