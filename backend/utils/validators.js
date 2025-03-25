import { body, param, validationResult } from "express-validator";

// Middleware pour gérer les erreurs de validation
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Validation pour l'authentification (Admin)
export const validateAdmin = [
  body("username").notEmpty().withMessage("Le nom d'utilisateur est requis"),
  body("email").isEmail().withMessage("L'email est invalide"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Le mot de passe doit contenir au moins 6 caractères"),
  validate,
];

// Validation pour les projets
export const validateProject = [
  body("name").notEmpty().withMessage("Le nom du projet est requis"),
  body("budget").isNumeric().withMessage("Le budget doit être un nombre"),
  body("startDate")
    .isISO8601()
    .toDate()
    .withMessage("La date de début est invalide"),
  body("endDate")
    .isISO8601()
    .toDate()
    .withMessage("La date de fin est invalide"),
  validate,
];

// Validation pour les tâches
export const validateTask = [
  body("title").notEmpty().withMessage("Le titre est requis"),
  body("startDate")
    .isISO8601()
    .toDate()
    .withMessage("La date de début est invalide"),
  body("endDate")
    .isISO8601()
    .toDate()
    .withMessage("La date de fin est invalide"),
  body("resourceIds")
    .isArray()
    .withMessage("Les ressources doivent être un tableau d'IDs"),
  validate,
];

// Validation pour les ressources
export const validateResource = [
  body("name").notEmpty().withMessage("Le nom est requis"),
  body("type").notEmpty().withMessage("Le type est requis"),
  body("quantity").isNumeric().withMessage("La quantité doit être un nombre"),
  body("supplierId").notEmpty().withMessage("L'ID du fournisseur est requis"),
  validate,
];

// Validation pour les fournisseurs
export const validateSupplier = [
  body("name").notEmpty().withMessage("Le nom du fournisseur est requis"),
  body("email").isEmail().withMessage("L'email est invalide"),
  validate,
];
