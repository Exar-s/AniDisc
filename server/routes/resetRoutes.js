import express from 'express';
const router = express.Router();
import { reset } from '../controllers/resetController.js';

router.get('/', reset);

export default router;
