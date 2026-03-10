import express from 'express';
import {
  createProject,
  deleteProject,
  getProjectById,
  getProjects,
  updateProject,
} from '../controllers/project.controller.js';
import { protect, requireRole } from '../middleware/auth.middleware.js';

const router = express.Router();

router
  .route('/')
  .get(getProjects)
  .post(protect, requireRole('developer', 'admin'), createProject);

router
  .route('/:id')
  .get(getProjectById)
  .put(protect, requireRole('developer', 'admin'), updateProject)
  .patch(protect, requireRole('developer', 'admin'), updateProject)
  .delete(protect, requireRole('developer', 'admin'), deleteProject);

export default router;
