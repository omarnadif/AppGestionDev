import { Router } from 'express';
import UserController from '../controllers/userController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/me', authMiddleware, UserController.getCurrentUser);
router.put('/me', authMiddleware, UserController.updateCurrentUser);
router.get('/:id', authMiddleware, UserController.getUserById);
router.delete('/:id', authMiddleware, UserController.deleteUser);

export default router;