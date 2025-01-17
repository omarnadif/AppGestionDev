import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import AuthController from '../controllers/authController.js';

const router = Router();

router.post('/signup', AuthController.signup);
router.post('/login', AuthController.login);
router.get('/logout', authMiddleware,AuthController.logout);

export default router;