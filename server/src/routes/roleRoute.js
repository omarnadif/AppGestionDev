import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import RoleController from '../controllers/roleController.js';

const router = Router();

router.get('/getRoles', authMiddleware,RoleController.getRoles);
router.post('/', authMiddleware,RoleController.createRole);

export default router;
