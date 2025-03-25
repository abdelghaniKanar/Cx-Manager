import express from "express";
import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";
import { protect } from "../middleware/authMiddleware.js";
import { validateProject } from "../utils/validators.js";

const router = express.Router();

// Routes pour la gestion des projets
router.get("/", protect, getProjects); // Récupérer tous les projets
router.post("/", protect, validateProject, createProject); // Créer un projet
router.get("/:id", protect, getProjectById); // Récupérer un projet par ID
router.put("/:id", protect, validateProject, updateProject); // Modifier un projet
router.delete("/:id", protect, deleteProject); // Supprimer un projet

export default router;
