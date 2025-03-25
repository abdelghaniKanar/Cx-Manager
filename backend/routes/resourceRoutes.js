import express from "express";
import {
  getResourcesByTask,
  createResource,
  updateResource,
  deleteResource,
} from "../controllers/resourceController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Routes pour la gestion des ressources
router.get("/:taskId", protect, getResourcesByTask); // Récupérer les ressources d'une tâche
router.post("/", protect, createResource); // Ajouter une ressource à une tâche
router.put("/:id", protect, updateResource); // Modifier une ressource
router.delete("/:id", protect, deleteResource); // Supprimer une ressource

export default router;
