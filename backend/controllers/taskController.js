import Task from "../models/Task.js";
import Project from "../models/Project.js";

// Récupérer toutes les tâches d'un projet
export const getTasksByProject = async (req, res) => {
  try {
    const tasks = await Task.find({ project: req.params.projectId });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Créer une nouvelle tâche pour un projet
export const createTask = async (req, res) => {
  try {
    const { title, startDate, endDate, status } = req.body;
    const projectId = req.params.projectId;

    // Vérifier si le projet existe
    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ message: "Projet non trouvé" });

    // Créer la tâche
    const newTask = new Task({
      title,
      startDate,
      endDate,
      status,
      project: projectId,
    });

    const savedTask = await newTask.save();

    // Ajouter la tâche au projet
    project.tasks.push(savedTask._id);
    await project.save();

    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Modifier une tâche existante
export const updateTask = async (req, res) => {
  try {
    const { title, startDate, endDate, status } = req.body;

    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Tâche non trouvée" });

    task.title = title || task.title;
    task.startDate = startDate || task.startDate;
    task.endDate = endDate || task.endDate;
    task.status = status || task.status;

    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📌 Supprimer une tâche
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Tâche non trouvée" });

    // Supprimer la tâche du projet associé
    await Project.findByIdAndUpdate(task.project, {
      $pull: { tasks: task._id },
    });

    await task.deleteOne();
    res.json({ message: "Tâche supprimée avec succès" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
