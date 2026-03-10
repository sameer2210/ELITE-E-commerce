import express from 'express';
import {
  createTechnology,
  deleteTechnology,
  getTechnologies,
  getTechnologyById,
  updateTechnology,
} from '../controllers/technology.controller.js';
import { adminOnly, protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router
  .route('/')
  .get(getTechnologies)
  .post(protect, adminOnly, createTechnology);

router
  .route('/:id')
  .get(getTechnologyById)
  .put(protect, adminOnly, updateTechnology)
  .patch(protect, adminOnly, updateTechnology)
  .delete(protect, adminOnly, deleteTechnology);

export default router;
