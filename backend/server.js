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

// Route de base pour tester le serveur
app.get("/", (req, res) => {
  res.send("API ConstructionXpert en cours de développement...");
});

// Lancer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur lancé sur le port ${PORT}`));
