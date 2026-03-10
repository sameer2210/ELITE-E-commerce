import express from 'express';
import {
  createReview,
  deleteReview,
  getReviewById,
  getReviews,
  updateReview,
} from '../controllers/review.controller.js';
import { protect, requireRole } from '../middleware/auth.middleware.js';

const router = express.Router();

router
  .route('/')
  .get(getReviews)
  .post(protect, requireRole('client', 'admin'), createReview);

router
  .route('/:id')
  .get(getReviewById)
  .put(protect, requireRole('client', 'admin'), updateReview)
  .patch(protect, requireRole('client', 'admin'), updateReview)
  .delete(protect, requireRole('client', 'admin'), deleteReview);

export default router;
