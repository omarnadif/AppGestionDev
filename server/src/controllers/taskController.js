import TaskModel from '../models/taskModel.js';

class TaskController {
    static async getTasks(req, res) {
        try {
            const tasks = await TaskModel.getAllTasks();
            console.log(tasks);
            res.status(200).json(tasks);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async createTask(req, res) {
        try {
            const taskData = req.body;
            const newTask = await TaskModel.createTask(taskData);
            res.status(201).json(newTask);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default TaskController;
