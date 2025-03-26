import { useEffect, useState } from "react";
import axios from "axios";
import AddSupplier from "../components/AddSupplier";
import { Link } from "react-router-dom";

export default function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Charger les fournisseurs
  const fetchSuppliers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/suppliers", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setSuppliers(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement des fournisseurs", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold text-secondary mb-4">
        Liste des Fournisseurs
      </h2>

      {/* Ajouter un Fournisseur */}
      <AddSupplier onSupplierAdded={fetchSuppliers} />

      {/* Liste des fournisseurs */}
      {loading ? (
        <p>Chargement...</p>
      ) : (
        <table className="w-full bg-white shadow-md rounded">
          <thead className="bg-primary text-secondary">
            <tr>
              <th className="p-2">Nom</th>
              <th className="p-2">Email</th>
              <th className="p-2">Nombre de Ressources</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((supplier) => (
              <tr
                key={supplier._id}
                className="border-b hover:bg-gray-100 cursor-pointer"
              >
                <td className="p-2">
                  <Link
                    to={`/suppliers/${supplier._id}`}
                    className="text-deepBlue font-semibold"
                  >
                    {supplier.name}
                  </Link>
                </td>
                <td className="p-2">{supplier.email}</td>
                <td className="p-2">{supplier.resources.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
