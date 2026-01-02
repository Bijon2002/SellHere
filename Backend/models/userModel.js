const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  // Basic Info
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },

  // Profile Info
  profilePic: { type: String, default: '' }, // URL or file path
  dob: { type: Date }, // Date of birth
  phone: { type: String }, // optional contact number

  // Account Status & Security
  isActive: { type: Boolean, default: true }, // block/unblock user
  emailVerified: { type: Boolean, default: false }, // optional verification
  lastLogin: { type: Date }, // track last login
  passwordResetToken: { type: String }, // for reset password
  passwordResetExpires: { type: Date },

  // Optional future fields
  // wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  // preferredLanguage: { type: String, default: 'en' },
  // preferredCurrency: { type: String, default: 'USD' },
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to match entered password with hashed password
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
}

module.exports = mongoose.model('User', userSchema);
