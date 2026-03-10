import express from 'express';
import {
  createDeveloperProfile,
  deleteDeveloperProfile,
  getDeveloperProfileById,
  getDeveloperProfiles,
  getMyDeveloperProfile,
  updateDeveloperProfile,
  upsertMyDeveloperProfile,
} from '../controllers/developerProfile.controller.js';
import {
  adminOnly,
  protect,
  requireRole,
} from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', getDeveloperProfiles);
router.get(
  '/me',
  protect,
  requireRole('developer', 'admin'),
  getMyDeveloperProfile
);
router.put(
  '/me',
  protect,
  requireRole('developer', 'admin'),
  upsertMyDeveloperProfile
);

router.post(
  '/',
  protect,
  requireRole('developer', 'admin'),
  createDeveloperProfile
);

router
  .route('/:id')
  .get(getDeveloperProfileById)
  .put(protect, requireRole('developer', 'admin'), updateDeveloperProfile)
  .patch(protect, requireRole('developer', 'admin'), updateDeveloperProfile)
  .delete(protect, adminOnly, deleteDeveloperProfile);

export default router;
