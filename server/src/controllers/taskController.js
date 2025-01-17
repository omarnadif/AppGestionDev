import TaskModel from '../models/taskModel.js';

class TaskController {
    /**
     * GET /api/tasks/getTasks
     * Retrieves all tasks from the database.
     */
    static async getTasks(req, res) {
        try {
            const tasks = await TaskModel.getAllTasks();
            if (tasks.length === 0) {
                return res.status(404).json({ message: 'No tasks found.' });
            }
            res.status(200).json(tasks);
        } catch (error) {
            console.error('Error fetching tasks:', error);
            res.status(500).json({ error: 'Failed to fetch tasks.' });
        }
    }

    /**
     * POST /api/tasks/create
     * Creates a new task.
     */
    static async createTask(req, res) {
        try {
            const taskData = req.body;

            // Validate input data (basic validation example)
            if (!taskData.name || !taskData.status) {
                return res.status(400).json({ error: 'Missing required fields: name and status.' });
            }

            const newTask = await TaskModel.createTask(taskData);
            res.status(201).json(newTask);
        } catch (error) {
            console.error('Error creating task:', error);
            res.status(500).json({ error: 'Failed to create task.' });
        }
    }
}

export default TaskController;
