import express from 'express';
const router = express.Router();
import {
  newPost,
  getAllPost,
  getPost,
  newComment,
} from '../controllers/postController.js';
import { upload } from '../middleware/uploadMiddleware.js';
import { userExtractor } from '../middleware/authMiddleware.js';

router.post('/', upload.single('image'), userExtractor, newPost);
router.get('/:animeID', getAllPost);
router.get('/single/:id', getPost);
router.post('/single/:id', userExtractor, newComment);

export default router;
