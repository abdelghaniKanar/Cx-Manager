import { useState } from "react";
import axios from "axios";

export default function AddProject({ onProjectAdded }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");

  // Ajouter un projet
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post(
        "http://localhost:5000/api/projects",
        { name, description, budget, startDate, endDate },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      setName("");
      setDescription("");
      setBudget("");
      setStartDate("");
      setEndDate("");

      onProjectAdded(); // Rafraîchir la liste des projets
    } catch (err) {
      setError("Erreur lors de l'ajout du projet");
    }
  };

  return (
    <div className="mb-4 p-4 bg-white shadow-md rounded">
      <h3 className="text-lg font-semibold text-secondary mb-2">
        Ajouter un Projet
      </h3>

      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nom du projet"
          className="w-full p-2 border border-gray-300 rounded mb-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          className="w-full p-2 border border-gray-300 rounded mb-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Budget (MAD)"
          className="w-full p-2 border border-gray-300 rounded mb-2"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          required
        />
        <input
          type="date"
          placeholder="Date de début"
          className="w-full p-2 border border-gray-300 rounded mb-2"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
        <input
          type="date"
          placeholder="Date de fin"
          className="w-full p-2 border border-gray-300 rounded mb-2"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-primary text-secondary font-semibold py-2 rounded"
        >
          Ajouter
        </button>
      </form>
    </div>
  );
}
