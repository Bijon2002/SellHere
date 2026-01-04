const mongoose = require('mongoose');
const Product = require('../models/productModel');
const User = require('../models/userModel');
require('dotenv').config({ path: './Config/config.env' });

// Connect to DB
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const sampleProducts = [
  {
    name: "Wireless Bluetooth Headphones",
    price: 89.99,
    description: "High-quality wireless headphones with noise cancellation",
    category: "Electronics",
    stock: 50,
    ratings: 4.5,
    numOfReviews: 120,
    images: [{
      public_id: "headphones_1",
      url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
    }]
  },
  {
    name: "Cotton T-Shirt",
    price: 19.99,
    description: "100% cotton comfortable t-shirt",
    category: "Clothing",
    stock: 100,
    ratings: 4.2,
    numOfReviews: 85,
    images: [{
      public_id: "tshirt_1",
      url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab"
    }]
  },
  {
    name: "JavaScript Programming Book",
    price: 39.99,
    description: "Complete guide to modern JavaScript programming",
    category: "Books",
    stock: 30,
    ratings: 4.8,
    numOfReviews: 45,
    images: [{
      public_id: "book_1",
      url: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c"
    }]
  },
  {
    name: "Coffee Maker",
    price: 129.99,
    description: "Automatic coffee maker with timer",
    category: "Home & Kitchen",
    stock: 25,
    ratings: 4.3,
    numOfReviews: 67,
    images: [{
      public_id: "coffee_1",
      url: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085"
    }]
  },
  {
    name: "Yoga Mat",
    price: 29.99,
    description: "Non-slip yoga mat for exercises",
    category: "Sports",
    stock: 75,
    ratings: 4.0,
    numOfReviews: 32,
    images: [{
      public_id: "yogamat_1",
      url: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0"
    }]
  }
];

const seedProducts = async () => {
  try {
    // First, get an admin user to assign as createdBy
    const adminUser = await User.findOne({ role: 'admin' });
    
    if (!adminUser) {
      console.log('No admin user found. Please create one first.');
      process.exit(1);
    }
    
    // Clear existing products
    await Product.deleteMany();
    console.log('Products cleared');
    
    // Add createdBy to each product
    const productsWithCreator = sampleProducts.map(product => ({
      ...product,
      createdBy: adminUser._id
    }));
    
    // Insert sample products
    await Product.insertMany(productsWithCreator);
    console.log(`${productsWithCreator.length} products added`);
    
    process.exit();
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
};

seedProducts();