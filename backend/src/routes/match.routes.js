import express from 'express';
import {
  createMatch,
  deleteMatch,
  getMatchById,
  getMatches,
  updateMatch,
} from '../controllers/match.controller.js';
import { adminOnly, protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.route('/').get(protect, getMatches).post(protect, adminOnly, createMatch);

router
  .route('/:id')
  .get(protect, getMatchById)
  .put(protect, adminOnly, updateMatch)
  .patch(protect, adminOnly, updateMatch)
  .delete(protect, adminOnly, deleteMatch);

export default router;
