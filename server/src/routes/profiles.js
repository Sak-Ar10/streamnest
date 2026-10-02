import { Router } from 'express';
import { z } from 'zod';
import { validate } from '../middleware/validate.js';
import { requireAuth } from '../middleware/auth.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import * as profileController from '../controllers/profileController.js';

const router = Router();
router.use(requireAuth); // All profile routes require auth

const profileSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  avatar: z.string().min(1, 'Avatar is required'),
  is_kids: z.boolean().default(false),
});

router.get('/', asyncHandler(profileController.getProfiles));
router.post('/', validate(profileSchema), asyncHandler(profileController.createProfile));
router.patch('/:id', validate(profileSchema.partial()), asyncHandler(profileController.updateProfile));
router.delete('/:id', asyncHandler(profileController.deleteProfile));

export default router;
