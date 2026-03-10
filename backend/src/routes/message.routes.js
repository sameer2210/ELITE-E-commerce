import express from 'express';
import {
  createMessage,
  deleteMessage,
  getMessageById,
  getMessages,
  updateMessage,
} from '../controllers/message.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.route('/').get(protect, getMessages).post(protect, createMessage);

router
  .route('/:id')
  .get(protect, getMessageById)
  .put(protect, updateMessage)
  .patch(protect, updateMessage)
  .delete(protect, deleteMessage);

export default router;
