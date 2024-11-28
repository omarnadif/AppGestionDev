import projectModel from '../models/projectModel.js';

class ProjectController {
    static async getProjects(req, res) {
        try {
            const projects = await projectModel.getAllProjects();
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
}

export default ProjectController;