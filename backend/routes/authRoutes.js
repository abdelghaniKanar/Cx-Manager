import express from "express";
import {
  registerAdmin,
  loginAdmin,
  getAdminProfile,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import { validateAdmin } from "../utils/validators.js";

const router = express.Router();

// Route pour l'inscription
router.post("/signup", validateAdmin, registerAdmin);

// Route pour la connexion
router.post("/login", validateAdmin, loginAdmin);

// Route pour récupérer les infos de l'admin (protégée par JWT)
router.get("/profile", protect, getAdminProfile);

export default router;
