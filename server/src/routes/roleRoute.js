import { Router } from 'express';
import RoleController from '../controllers/roleController.js';

const router = Router();

router.get('/getRoles', RoleController.getRoles);
router.post('/', RoleController.createRole);

export default router;
