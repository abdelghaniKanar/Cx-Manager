import express from "express";
import {
  getTasksByProject,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Routes pour la gestion des tâches
router.get("/:projectId", protect, getTasksByProject); // Récupérer les tâches d'un projet
router.post("/:projectId", protect, createTask); // Ajouter une tâche à un projet
router.put("/:id", protect, updateTask); // Modifier une tâche
router.delete("/:id", protect, deleteTask); // Supprimer une tâche

export default router;
