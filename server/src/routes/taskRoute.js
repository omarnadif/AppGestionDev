import { Router } from 'express';
import TaskController from '../controllers/taskController.js';

const router = Router();

router.get('/getTasks', TaskController.getTasks);
router.post('/', TaskController.createTask);

export default router;
