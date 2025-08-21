import express from 'express';
import {
  deleteMyAccount,
  deleteUserById,
  getAllUsers,
  getMyProfile,
  getUserById,
  updateMyProfile,
  updateUserById,
} from '../controllers/user.controller.js';
import { adminOnly, protect } from './../middleware/auth.middleware.js';

const router = express.Router();

//   USER ROUTES (self)
router.get('/profile', protect, getMyProfile); // View own profile
router.put('/profile', protect, updateMyProfile); // Update own profile
router.delete('/profile', protect, deleteMyAccount); // Delete own account

//   ADMIN ROUTES (manage all)
router.get('/', protect, adminOnly, getAllUsers); // List all users
router.get('/:id', protect, adminOnly, getUserById); // View any user
router.put('/:id', protect, adminOnly, updateUserById); // Update any user
router.delete('/:id', protect, adminOnly, deleteUserById); // Delete any user

export default router;
