const { isAuthenticated, isAdmin } = require('../middleware/authMiddleware');

// Admin-only user management
router.get('/', isAuthenticated, isAdmin, adminController.getAllUsers);
router.patch('/:id/role', isAuthenticated, isAdmin, adminController.updateUserRole);
router.delete('/:id', isAuthenticated, isAdmin, adminController.deleteUser);
