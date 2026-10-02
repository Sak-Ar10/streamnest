import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import * as titleController from '../controllers/titleController.js';

const router = Router();
router.use(requireAuth);

router.get('/', asyncHandler(titleController.getTitles));
router.get('/browse', asyncHandler(titleController.getBrowse));
router.get('/genres', asyncHandler(titleController.getGenres));
router.get('/:id', asyncHandler(titleController.getTitleById));

export default router;
