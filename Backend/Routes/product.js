const express = require('express');
const { getProducts, getSingleProducts } = require('../Controller/productController');
const router = express.Router();

router.route('/products').get(getProducts);

router.route('/products/:id').get(getSingleProducts);


module.exports = router; 