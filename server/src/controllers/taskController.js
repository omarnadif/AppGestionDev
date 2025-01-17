import TaskModel from '../models/taskModel.js';

class TaskController {
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

    static async createTask(req, res) {
        try {
            const taskData = req.body;
            const requiredFields = [
                'name',
                'status',
                'completion_percentage',
                'project_id',
                'assigned_to',
                'start_date',
                'end_date'
            ];

            const missingFields = requiredFields.filter(field => !taskData[field] && taskData[field] !== 0);
            if (missingFields.length > 0) {
                return res.status(400).json({ 
                    error: `Missing required fields: ${missingFields.join(', ')}` 
                });
            }

            const newTask = await TaskModel.createTask(taskData);
            res.status(201).json(newTask);
        } catch (error) {
            console.error('Error creating task:', error);
            res.status(500).json({ error: error.message });
        }
    }

    // Nouveau contrôleur pour la mise à jour
    static async updateTask(req, res) {
        try {
            const taskId = req.params.id;
            const updateData = req.body;

            // Validation des données de mise à jour
            if (Object.keys(updateData).length === 0) {
                return res.status(400).json({ 
                    error: 'No update data provided' 
                });
            }

            const updatedTask = await TaskModel.updateTask(taskId, updateData);
            
            if (!updatedTask) {
                return res.status(404).json({ 
                    error: 'Task not found' 
                });
            }

            res.status(200).json(updatedTask);
        } catch (error) {
            console.error('Error updating task:', error);
            res.status(500).json({ error: error.message });
        }
    }

    // Nouveau contrôleur pour la suppression
    static async deleteTask(req, res) {
        try {
            const taskId = req.params.id;
            await TaskModel.deleteTask(taskId);
            res.status(200).json({ 
                message: 'Task successfully deleted' 
            });
        } catch (error) {
            console.error('Error deleting task:', error);
            res.status(500).json({ error: error.message });
        }
    }
}

export default TaskController;