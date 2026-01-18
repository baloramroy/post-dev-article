// -------- src/routes/category.routes.js --------
import express from 'express';
import { createCategory, getCategories } from '../controllers/category.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { adminMiddleware } from '../middleware/admin.middleware.js';


const router = express.Router();


router.get('/', getCategories); // public
router.post('/', authMiddleware, adminMiddleware, createCategory); // admin only


export default router;