import { Router } from 'express';
import UserController from '../controllers/userController.js';

const router = Router();

router.get('/getUsers', UserController.getUsers);
router.post('/', UserController.createUser);

export default router;
