import projectModel from '../models/projectModel.js';
import TaskModel from '../models/taskModel.js';


class ProjectController {
    static async getProjects(req, res) {
        try {
            console.log('getProjects');
            const projects = await projectModel.getAllProject();
            res.status(200).json(projects);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async createProject(req, res) {
        try {
            const projectData = req.body;
            const newProject = await projectModel.createProject(projectData);
            res.status(201).json(newProject);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getProjectById(req, res) {
        try {
            const projectId = req.params.id;
            const project = await projectModel.getProjectById(projectId);
            res.status(200).json(project);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async deleteProject(req, res) {
        try {
            const projectId = req.params.id;
            await projectModel.deleteProject(projectId);
            res.status(204).end();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async updateProject(req, res) {
        try {
            const projectId = req.params.id;
            const projectData = req.body;
            await projectModel.updateProject(projectId, projectData);
            res.status(204).end();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    static async getTasksByProjectId(req, res) {
        try {
            const projectId = req.params.id;
            const tasks = await TaskModel.getTasksByProjectId(projectId);
            res.status(200).json(tasks);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async createTaskForProject(req, res) {
        try {
            const projectId = req.params.id;
            const taskData = req.body;
            taskData.project_id = projectId; // Lier la tâche au projet
            const newTask = await TaskModel.createTask(taskData);
            res.status(201).json(newTask);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    
    
}

export default ProjectController;