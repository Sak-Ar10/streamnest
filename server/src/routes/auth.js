import { Router } from 'express';
import { z } from 'zod';
import { validate } from '../middleware/validate.js';
import { requireAuth } from '../middleware/auth.js';
import { authLimiter } from '../middleware/rateLimit.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import * as authController from '../controllers/authController.js';

const router = Router();

const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email format'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
});

// Apply rate limiting to all auth routes
router.use(authLimiter);

router.post(
  '/signup',
  validate(signupSchema),
  asyncHandler(authController.signup)
);

router.post(
  '/login',
  validate(loginSchema),
  asyncHandler(authController.login)
);

router.post(
  '/logout',
  asyncHandler(authController.logout)
);

router.get(
  '/me',
  requireAuth,
  asyncHandler(authController.getMe)
);

export default router;
