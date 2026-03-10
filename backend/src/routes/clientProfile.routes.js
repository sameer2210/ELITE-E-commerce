import express from 'express';
import {
  createClientProfile,
  deleteClientProfile,
  getClientProfileById,
  getClientProfiles,
  getMyClientProfile,
  updateClientProfile,
  upsertMyClientProfile,
} from '../controllers/clientProfile.controller.js';
import {
  adminOnly,
  protect,
  requireRole,
} from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', getClientProfiles);
router.get(
  '/me',
  protect,
  requireRole('client', 'admin'),
  getMyClientProfile
);
router.put(
  '/me',
  protect,
  requireRole('client', 'admin'),
  upsertMyClientProfile
);

router.post('/', protect, requireRole('client', 'admin'), createClientProfile);

router
  .route('/:id')
  .get(getClientProfileById)
  .put(protect, requireRole('client', 'admin'), updateClientProfile)
  .patch(protect, requireRole('client', 'admin'), updateClientProfile)
  .delete(protect, adminOnly, deleteClientProfile);

export default router;
