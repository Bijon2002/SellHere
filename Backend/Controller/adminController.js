const User = require('../models/userModel');
const user = require('../models/userModel');

// Get all users - Admin only
exports.getAllUsers = async (req, res) => {
  try {
    const users = await user.find().select('-password');//exculde passwords
    res.status(200).json({ success: true, users });
    } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users' });
    }
};

// Update user role - Admin only
// exports.updateUserRole = async (req, res) => {
//     try {
//         const{role}=req.body;

//         const user = await User.findById(req.params.id);
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }
//         user.role = role;
//         await user.save();
//         res.status(200).json({ success: true, message: 'User role updated successfully' });
//     } catch (error) {
//         res.status(500).json({ message: 'Failed to update user role' });
//     }    
// };


// SOFT DELETE (Deactivate user)
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.isActive = false;
        await user.save();
        res.status(200).json({ success: true, message: 'User deactivated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to deactivate user' });
    }
};