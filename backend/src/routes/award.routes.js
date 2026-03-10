import express from 'express';
import {
  createAward,
  deleteAward,
  getAwardById,
  getAwards,
  updateAward,
} from '../controllers/award.controller.js';
import { adminOnly, protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.route('/').get(getAwards).post(protect, adminOnly, createAward);

router
  .route('/:id')
  .get(getAwardById)
  .put(protect, adminOnly, updateAward)
  .patch(protect, adminOnly, updateAward)
  .delete(protect, adminOnly, deleteAward);

export default router;
