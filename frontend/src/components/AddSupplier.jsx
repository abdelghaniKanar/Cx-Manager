import { useState } from "react";
import axios from "axios";

export default function AddSupplier({ onSupplierAdded }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  // Ajouter un fournisseur
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post(
        "http://localhost:5000/api/suppliers",
        { name, email },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      setName("");
      setEmail("");
      onSupplierAdded();
    } catch (err) {
      setError("Erreur lors de l'ajout du fournisseur");
    }
  };

  return (
    <div className="mb-4 p-4 bg-white shadow-md rounded">
      <h3 className="text-lg font-semibold text-secondary mb-2">
        Ajouter un Fournisseur
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
          type="email"
          placeholder="Email"
          className="w-full p-2 border border-gray-300 rounded mb-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
