// -------- src/routes/user.routes.js --------
import express from 'express';
import { getMe, updateProfile } from '../controllers/user.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';


const router = express.Router();
router.get('/me', authMiddleware, getMe);
router.put('/me', authMiddleware, updateProfile);


export default router;