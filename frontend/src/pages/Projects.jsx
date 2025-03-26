import { useEffect, useState } from "react";
import axios from "axios";
import AddProject from "../components/AddProject";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  //  Charger les projets depuis l'API
  const fetchProjects = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/projects", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setProjects(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement des projets", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div>
      {/* Ajouter un Projet */}
      <AddProject onProjectAdded={fetchProjects} />
      <h2 className="text-2xl font-semibold text-secondary mb-4">
        Liste des Projets
      </h2>

      {/* Liste des projets */}
      {loading ? (
        <p>Chargement...</p>
      ) : (
        <table className="w-full bg-white shadow-md rounded">
          <thead className="bg-primary text-secondary">
            <tr>
              <th className="p-2">Nom</th>
              <th className="p-2">Budget</th>
              <th className="p-2">Date de début</th>
              <th className="p-2">Date de fin</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project._id} className="border-b">
                <td className="p-2">{project.name}</td>
                <td className="p-2">{project.budget}€</td>
                <td className="p-2">
                  {new Date(project.startDate).toLocaleDateString()}
                </td>
                <td className="p-2">
                  {new Date(project.endDate).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
