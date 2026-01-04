const express = require('express');
const router = express.Router();
const { isAuthenticated, isAdmin } = require('../middleware/authMiddleware');
const {
  getProducts,
  getSingleProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getProductReviews,
  deleteReview
} = require('../Controller/productController');

// Public routes
router.get('/', getProducts); // GET /api/products
router.get('/:id', getSingleProducts); // GET /api/products/:id
router.get('/:id/reviews', getProductReviews); // GET /api/products/:id/reviews

// Protected routes (require login)
router.post('/:id/reviews', isAuthenticated, createProductReview); // POST /api/products/:id/reviews
router.delete('/:id/reviews', isAuthenticated, deleteReview); // DELETE /api/products/:id/reviews

// Admin-only routes
router.post('/', isAuthenticated, isAdmin, addProduct); // POST /api/products
router.put('/:id', isAuthenticated, isAdmin, updateProduct); // PUT /api/products/:id
router.delete('/:id', isAuthenticated, isAdmin, deleteProduct); // DELETE /api/products/:id

module.exports = router;