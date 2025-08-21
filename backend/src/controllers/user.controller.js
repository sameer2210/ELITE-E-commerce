// src/controllers/user.controller.js
import User from '../models/user.model.js';

//---------------------------------------------------------------------------  USER (SELF) CONTROLLERS

//  @route   GET /api/users/profile
export const getMyProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select('-password'); // hide password
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    next(err);
  }
};

//  @route   PUT /api/users/profile
export const updateMyProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // update only provided fields
    if (req.body.name) user.name = req.body.name;
    if (req.body.email) user.email = req.body.email;
    if (req.body.password) user.password = req.body.password; // hashed in model

    const updated = await user.save();
    res.json({
      _id: updated._id,
      name: updated.name,
      email: updated.email,
      isAdmin: updated.isAdmin,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete my account @route   DELETE /api/users/profile  @access  Private
export const deleteMyAccount = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.user._id);
    res.json({ message: 'Account deleted successfully' });
  } catch (err) {
    next(err);
  }
};

//----------------------------------------------------------------------  ADMIN CONTROLLERS

// @desc    Get all users  @route   GET /api/users  @access  Admin
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    next(err);
  }
};

// @desc    Get user by ID  @route   GET /api/users/:id @access  Admin
export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    next(err);
  }
};

// @desc    Update user by ID @route   PUT /api/users/:id @access  Admin
export const updateUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (req.body.name) user.name = req.body.name;
    if (req.body.email) user.email = req.body.email;
    if (req.body.isAdmin !== undefined) user.isAdmin = req.body.isAdmin;

    const updated = await user.save();
    res.json({
      _id: updated._id,
      name: updated.name,
      email: updated.email,
      isAdmin: updated.isAdmin,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete user by ID @route   DELETE /api/users/:id  @access  Admin
export const deleteUserById = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    next(err);
  }
};
