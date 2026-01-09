const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { isAuthenticated, isAdmin } = require('../middleware/authMiddleware');

router.get('/', isAuthenticated, isAdmin, adminController.getAllUsers);//
//router.patch('/:id/role', isAuthenticated, isAdmin, adminController.updateUserRole);
router.delete('/:id', isAuthenticated, isAdmin, adminController.deleteUser);

module.exports = router;
