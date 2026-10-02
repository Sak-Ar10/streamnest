import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import * as listController from '../controllers/listController.js';

const router = Router();
router.use(requireAuth);

router.get('/:profileId/list', asyncHandler(listController.getList));
router.post('/:profileId/list', asyncHandler(listController.addToList));
router.delete('/:profileId/list/:titleId', asyncHandler(listController.removeFromList));

export default router;
