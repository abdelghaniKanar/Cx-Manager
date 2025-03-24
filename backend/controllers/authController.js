import Admin from "../models/Admin.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Fonction pour générer un token JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// Inscription Admin
export const registerAdmin = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Vérifier si l'admin existe déjà
    const adminExists = await Admin.findOne({ email });
    if (adminExists)
      return res.status(400).json({ message: "Admin déjà enregistré" });

    // Créer un nouvel admin
    const admin = await Admin.create({ username, email, password });

    if (admin) {
      res.status(201).json({
        _id: admin.id,
        username: admin.username,
        email: admin.email,
        token: generateToken(admin.id),
      });
    } else {
      res.status(400).json({ message: "Échec de l'inscription" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Connexion Admin
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });

    if (admin && (await admin.matchPassword(password))) {
      res.json({
        _id: admin.id,
        username: admin.username,
        email: admin.email,
        token: generateToken(admin.id),
      });
    } else {
      res.status(401).json({ message: "Email ou mot de passe invalide" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Récupérer le profil de l'admin
export const getAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.user.id).select("-password");

    if (admin) {
      res.json(admin);
    } else {
      res.status(404).json({ message: "Admin non trouvé" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
