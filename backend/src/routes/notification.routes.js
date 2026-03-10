import express from 'express';
import {
  createNotification,
  deleteNotification,
  getNotifications,
  markNotificationRead,
} from '../controllers/notification.controller.js';
import { adminOnly, protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router
  .route('/')
  .get(protect, getNotifications)
  .post(protect, adminOnly, createNotification);

router.patch('/:id/read', protect, markNotificationRead);
router.delete('/:id', protect, deleteNotification);

export default router;
