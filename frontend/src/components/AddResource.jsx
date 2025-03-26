import { useState } from "react";
import axios from "axios";

export default function AddResource({ supplierId }) {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [error, setError] = useState("");

  // Ajouter une ressource
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post(
        "http://localhost:5000/api/resources",
        { name, type, quantity, supplierId },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      setName("");
      setType("");
      setQuantity("");
      window.location.reload();
    } catch (err) {
      setError("Erreur lors de l'ajout de la ressource");
    }
  };

  return (
    <div className="mb-4 p-4 bg-white shadow-md rounded">
      <h3 className="text-lg font-semibold text-secondary mb-2">
        Ajouter une Ressource
      </h3>

      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nom"
          className="w-full p-2 border border-gray-300 rounded mb-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Type"
          className="w-full p-2 border border-gray-300 rounded mb-2"
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Quantité"
          className="w-full p-2 border border-gray-300 rounded mb-2"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
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
