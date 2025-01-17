import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import TaskController from '../controllers/taskController.js';

const router = Router();

router.get('/getTasks', authMiddleware,TaskController.getTasks);
router.post('/', authMiddleware,TaskController.createTask);

export default router;
