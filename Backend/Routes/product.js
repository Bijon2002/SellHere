const express = require('express');
const { getProducts, getSingleProducts } = require('../Controller/productController');
const router = express.Router();

router.route('/products').get(getProducts);

router.route('/products/:id').get(getSingleProducts);

// Admin-only routes
router.post('/', isAuthenticated, isAdmin, productController.addProduct);
router.put('/:id', isAuthenticated, isAdmin, productController.updateProduct);
router.delete('/:id', isAuthenticated, isAdmin, productController.deleteProduct);


module.exports = router; 