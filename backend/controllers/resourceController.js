import Resource from "../models/Resource.js";
import Task from "../models/Task.js";
import Supplier from "../models/Supplier.js";

// Récupérer toutes les ressources d'une tâche
export const getResourcesByTask = async (req, res) => {
  try {
    const resources = await Resource.find({ task: req.params.taskId }).populate(
      "supplier"
    );
    res.json(resources);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Créer une nouvelle ressource et l'associer à une tâche et un fournisseur
export const createResource = async (req, res) => {
  try {
    const { name, type, quantity, supplierId } = req.body;

    // Vérifier si le fournisseur existe
    const supplier = await Supplier.findById(supplierId);
    if (!supplier)
      return res.status(404).json({ message: "Fournisseur non trouvé" });

    // Créer la ressource
    const newResource = new Resource({
      name,
      type,
      quantity,
      supplier: supplierId,
    });

    const savedResource = await newResource.save();

    // Ajouter la ressource au fournisseur
    supplier.resources.push(savedResource._id);
    await supplier.save();

    res.status(201).json(savedResource);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Modifier une ressource existante
export const updateResource = async (req, res) => {
  try {
    const { name, type, quantity } = req.body;

    const resource = await Resource.findById(req.params.id);
    if (!resource)
      return res.status(404).json({ message: "Ressource non trouvée" });

    resource.name = name || resource.name;
    resource.type = type || resource.type;
    resource.quantity = quantity || resource.quantity;

    const updatedResource = await resource.save();
    res.json(updatedResource);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Supprimer une ressource
export const deleteResource = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource)
      return res.status(404).json({ message: "Ressource non trouvée" });

    // Supprimer la ressource de la tâche associée
    await Task.updateMany(
      { resources: resource._id },
      { $pull: { resources: resource._id } }
    );

    // Supprimer la ressource de la liste du fournisseur
    await Supplier.updateMany(
      { resources: resource._id },
      { $pull: { resources: resource._id } }
    );

    await resource.deleteOne();
    res.json({ message: "Ressource supprimée avec succès" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
