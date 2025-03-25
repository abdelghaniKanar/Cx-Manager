import express from "express";
import {
  getSuppliers,
  getSupplierById,
  createSupplier,
  updateSupplier,
  deleteSupplier,
} from "../controllers/supplierController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Routes pour la gestion des fournisseurs
router.get("/", protect, getSuppliers); // Récupérer tous les fournisseurs
router.post("/", protect, createSupplier); // Ajouter un fournisseur
router.get("/:id", protect, getSupplierById); // Récupérer un fournisseur par ID
router.put("/:id", protect, updateSupplier); // Modifier un fournisseur
router.delete("/:id", protect, deleteSupplier); // Supprimer un fournisseur

export default router;
