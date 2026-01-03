const productModel = require('../models/productModel');

/**
 * @desc    Get all products (with search)
 * @route   GET /api/v1/products
 * @access  Public
 */
exports.getProducts = async (req, res) => {
  try {
    let query = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: 'i' // case insensitive
          }
        }
      : {};

    const products = await productModel.find(query);

    res.status(200).json({
      success: true,
      count: products.length,
      products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * @desc    Get single product
 * @route   GET /api/v1/products/:id
 * @access  Public
 */
exports.getSingleProducts = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.status(200).json({
      success: true,
      product
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'Invalid product ID'
    });
  }
};

/**
 * @desc    Add new product
 * @route   POST /api/v1/products
 * @access  Admin
 */
exports.addProduct = async (req, res) => {
  try {
    const product = await productModel.create(req.body);

    res.status(201).json({
      success: true,
      product
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * @desc    Update product
 * @route   PUT /api/v1/products/:id
 * @access  Admin
 */
exports.updateProduct = async (req, res) => {
  try {
    let product = await productModel.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    product = await productModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      success: true,
      product
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * @desc    Delete product
 * @route   DELETE /api/v1/products/:id
 * @access  Admin
 */
exports.deleteProduct = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    await product.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
