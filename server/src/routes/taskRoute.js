import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import TaskController from '../controllers/taskController.js';

const router = Router();

router.get('/getTasks', authMiddleware,TaskController.getTasks);
router.post('/', authMiddleware,TaskController.createTask);
router.put('/:id', authMiddleware,TaskController.updateTask);  
router.delete('/:id', authMiddleware,TaskController.deleteTask);  

export default router;