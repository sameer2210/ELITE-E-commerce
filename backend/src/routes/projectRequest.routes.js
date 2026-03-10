import express from 'express';
import {
  createProjectRequest,
  deleteProjectRequest,
  getProjectRequestById,
  getProjectRequests,
  updateProjectRequest,
} from '../controllers/projectRequest.controller.js';
import { protect, requireRole } from '../middleware/auth.middleware.js';

const router = express.Router();

router
  .route('/')
  .get(protect, getProjectRequests)
  .post(protect, requireRole('client', 'admin'), createProjectRequest);

router
  .route('/:id')
  .get(protect, getProjectRequestById)
  .put(protect, requireRole('client', 'admin'), updateProjectRequest)
  .patch(protect, requireRole('client', 'admin'), updateProjectRequest)
  .delete(protect, requireRole('client', 'admin'), deleteProjectRequest);

export default router;
