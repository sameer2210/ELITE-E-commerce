import express from 'express';
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategoryById,
  updateCategory,
} from '../controllers/category.controller.js';
import { adminOnly, protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.route('/').get(getCategories).post(protect, adminOnly, createCategory);

router
  .route('/:id')
  .get(getCategoryById)
  .put(protect, adminOnly, updateCategory)
  .patch(protect, adminOnly, updateCategory)
  .delete(protect, adminOnly, deleteCategory);

export default router;
