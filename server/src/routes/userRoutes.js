import { Router } from 'express';
import UserController from '../controllers/userController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
const router = Router();

router.get('/', authMiddleware,UserController.getUsers);
router.post('/', UserController.createUser);
router.get('/:id', authMiddleware,UserController.getUserById);
router.delete('/:id',authMiddleware, UserController.deleteUser);
router.put('/:id', authMiddleware,UserController.updateUser);

export default router;
