const express = require('express');
const { createOrder } = require('../Controller/orderController');
const router = express.Router();


router.route('/order').post(createOrder);

// Admin routes
router.get('/', isAuthenticated, isAdmin, orderController.getAllOrders);
router.patch('/:id/status', isAuthenticated, isAdmin, orderController.updateOrderStatus);

module.exports = router; 