import { Router } from 'express';

import AuthController from '../controllers/authController.js';

const router = Router();

router.post('/signup', AuthController.signup);
router.post('/login', AuthController.login);
router.get('/logout', AuthController.logout);

export default router;