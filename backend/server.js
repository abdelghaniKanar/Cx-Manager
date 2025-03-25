import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

dotenv.config(); // Charger les variables d'environnement
connectDB(); // Connexion à MongoDB

const app = express();

// Middleware
app.use(express.json()); // Pour traiter le JSON
app.use(cors()); // Autoriser les requêtes Cross-Origin

// Routes
// Authentification
import authRoutes from "./routes/authRoutes.js";
app.use("/api/auth", authRoutes);

// Gestion des projets
import projectRoutes from "./routes/projectRoutes.js";
app.use("/api/projects", projectRoutes);

// Gestion des tâches
import taskRoutes from "./routes/taskRoutes.js";
app.use("/api/tasks", taskRoutes);

// Gestion des resources
import resourceRoutes from "./routes/resourceRoutes.js";
app.use("/api/resources", resourceRoutes);

// Gestion des fournisseurs
import supplierRoutes from "./routes/supplierRoutes.js";
app.use("/api/suppliers", supplierRoutes);

// Lancer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur lancé sur le port ${PORT}`));
