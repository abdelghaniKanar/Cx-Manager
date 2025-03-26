import Project from "../models/Project.js";
import Task from "../models/Task.js";

// Récupérer tous les projets
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate("tasks"); // Récupère aussi les tâches associées
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Récupérer un projet par son ID
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate("tasks");

    if (!project) return res.status(404).json({ message: "Projet non trouvé" });

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Créer un projet
export const createProject = async (req, res) => {
  try {
    const { name, description, budget, startDate, endDate } = req.body;

    if (!name || !budget || !startDate || !endDate) {
      return res
        .status(400)
        .json({ message: "Tous les champs requis ne sont pas fournis" });
    }

    const newProject = new Project({
      name,
      description,
      budget,
      startDate,
      endDate,
      tasks: [],
    });

    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Modifier un projet
export const updateProject = async (req, res) => {
  try {
    const { name, description, budget, startDate, endDate } = req.body;

    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Projet non trouvé" });

    project.name = name || project.name;
    project.description = description || project.description;
    project.budget = budget || project.budget;
    project.startDate = startDate || project.startDate;
    project.endDate = endDate || project.endDate;

    const updatedProject = await project.save();
    res.json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Supprimer un projet et ses tâches associées
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Projet non trouvé" });

    // Récupérer toutes les tâches du projet
    const tasks = await Task.find({ project: project._id });

    // Supprimer toutes les tâches du projet
    await Task.deleteMany({ project: project._id });

    // Supprimer le projet
    await project.deleteOne();
    res.json({
      message: "Projet, ses tâches et ressources supprimés avec succès",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
