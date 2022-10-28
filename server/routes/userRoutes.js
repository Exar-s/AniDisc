import express from 'express';
const router = express.Router();
import {
  getUser,
  updateProfilePic,
  updateSignature,
} from '../controllers/userController.js';
import { upload } from '../middleware/uploadMiddleware.js';
import { userExtractor } from '../middleware/authMiddleware.js';

router.get('/:username', getUser);
router.put(
  '/profilepic',
  upload.single('image'),
  userExtractor,
  updateProfilePic
);
router.put('/signature', userExtractor, updateSignature);

export default router;
