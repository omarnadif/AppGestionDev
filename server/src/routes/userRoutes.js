import { Router } from 'express';
import UserController from '../controllers/userController.js';
import { uploadMiddleware } from '../controllers/userController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
const router = Router();

router.get('/', authMiddleware,UserController.getUsers);
router.post('/', UserController.createUser);
router.get('/me', authMiddleware, UserController.getMe);
router.post('/avatar', authMiddleware, uploadMiddleware, UserController.uploadAvatar);
router.get('/:id', authMiddleware,UserController.getUserById);
router.delete('/:id',authMiddleware, UserController.deleteUser);
router.put('/:id', authMiddleware,UserController.updateUser);



export default router;
