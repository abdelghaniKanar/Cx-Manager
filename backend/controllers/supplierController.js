import Supplier from "../models/Supplier.js";
import Resource from "../models/Resource.js";

// Récupérer tous les fournisseurs avec leurs ressources associées
export const getSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find().populate("resources"); // Récupère aussi les ressources associées
    res.json(suppliers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Récupérer un fournisseur par son ID
export const getSupplierById = async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id).populate(
      "resources"
    );

    if (!supplier)
      return res.status(404).json({ message: "Fournisseur non trouvé" });

    res.json(supplier);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Créer un fournisseur
export const createSupplier = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res
        .status(400)
        .json({ message: "Tous les champs requis ne sont pas fournis" });
    }

    const newSupplier = new Supplier({ name, email, resources: [] });

    const savedSupplier = await newSupplier.save();
    res.status(201).json(savedSupplier);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Modifier un fournisseur
export const updateSupplier = async (req, res) => {
  try {
    const { name, email } = req.body;

    const supplier = await Supplier.findById(req.params.id);
    if (!supplier)
      return res.status(404).json({ message: "Fournisseur non trouvé" });

    supplier.name = name || supplier.name;
    supplier.email = email || supplier.email;

    const updatedSupplier = await supplier.save();
    res.json(updatedSupplier);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Supprimer un fournisseur et dissocier ses ressources
export const deleteSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier)
      return res.status(404).json({ message: "Fournisseur non trouvé" });

    // Supprimer toutes les ressources liées à ce fournisseur
    await Resource.deleteMany({ supplier: supplier._id });

    // Supprimer le fournisseur
    await supplier.deleteOne();
    res.json({
      message: "Fournisseur et ses ressources supprimés avec succès",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
