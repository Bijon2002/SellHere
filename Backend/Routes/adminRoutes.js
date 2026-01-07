const express = require('express');
const router = express.Router();
const { isAuthenticated, isAdmin } = require('../middleware/authMiddleware');
const User = require('../models/userModel');

// @desc    Get all users (Admin only)
// @route   GET /api/v1/admin/users
// @access  Private/Admin
router.get('/users', isAuthenticated, isAdmin, async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    
    res.json({
      success: true,
      count: users.length,
      users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @desc    Get user by ID (Admin only)
// @route   GET /api/v1/admin/users/:id
// @access  Private/Admin
router.get('/users/:id', isAuthenticated, isAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.json({
      success: true,
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @desc    Update user status (Admin only)
// @route   PUT /api/v1/admin/users/:id/status
// @access  Private/Admin
router.put('/users/:id/status', isAuthenticated, isAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    user.isActive = req.body.isActive !== undefined ? req.body.isActive : user.isActive;
    await user.save();
    
    res.json({
      success: true,
      message: 'User status updated',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isActive: user.isActive
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;