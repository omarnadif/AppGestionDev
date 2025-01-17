import { Router } from "express";
import { authMiddleware } from '../middlewares/authMiddleware.js';
import ProjectController from "../controllers/projectController.js";

const router = Router();

router.get("/", authMiddleware,ProjectController.getProjects);
router.post("/", authMiddleware,ProjectController.createProject);
router.get("/:id", authMiddleware,ProjectController.getProjectById);
router.delete("/:id", authMiddleware,ProjectController.deleteProject);
router.put("/:id", authMiddleware,ProjectController.updateProject);
router.get("/:id/tasks", authMiddleware,ProjectController.getTasksByProjectId);
router.post("/:id/tasks", authMiddleware,ProjectController.createTaskForProject);

export default router;