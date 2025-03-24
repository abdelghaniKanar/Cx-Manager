import express from "express";
import {
  registerAdmin,
  loginAdmin,
  getAdminProfile,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Route pour l'inscription
router.post("/signup", registerAdmin);

// Route pour la connexion
router.post("/login", loginAdmin);

// Route pour récupérer les infos de l'admin (protégée par JWT)
router.get("/profile", protect, getAdminProfile);

export default router;
