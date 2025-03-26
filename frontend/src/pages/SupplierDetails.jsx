import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import AddResource from "../components/AddResource";

export default function SupplierDetails() {
  const { id } = useParams(); // Récupère l'ID du fournisseur depuis l'URL
  const navigate = useNavigate();
  const [supplier, setSupplier] = useState(null);
  const [loading, setLoading] = useState(true);

  // Charger les détails du fournisseur
  useEffect(() => {
    const fetchSupplier = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/suppliers/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setSupplier(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement du fournisseur", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSupplier();
  }, [id]);

  // Supprimer le fournisseur
  const handleDelete = async () => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce fournisseur ?"))
      return;

    try {
      await axios.delete(`http://localhost:5000/api/suppliers/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      navigate("/suppliers");
    } catch (error) {
      console.error("Erreur lors de la suppression", error);
    }
  };

  return (
    <div>
      {loading ? (
        <p>Chargement...</p>
      ) : (
        <>
          <h2 className="text-2xl font-semibold text-secondary mb-4">
            Détails du Fournisseur
          </h2>

          <div className="bg-white p-4 shadow-md rounded mb-4">
            <p>
              <strong>Nom :</strong> {supplier.name}
            </p>
            <p>
              <strong>Email :</strong> {supplier.email}
            </p>
          </div>

          {/* Ajouter une ressource */}
          <AddResource supplierId={id} />

          {/* Liste des ressources */}
          <h3 className="text-xl font-semibold text-secondary mt-6 mb-2">
            {" "}
            Ressources
          </h3>
          <table className="w-full bg-white shadow-md rounded">
            <thead className="bg-primary text-secondary">
              <tr>
                <th className="p-2">Nom</th>
                <th className="p-2">Type</th>
                <th className="p-2">Quantité</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {supplier.resources.map((resource) => (
                <tr key={resource._id} className="border-b">
                  <td className="p-2">{resource.name}</td>
                  <td className="p-2">{resource.type}</td>
                  <td className="p-2">{resource.quantity}</td>
                  <td className="p-2">
                    <button
                      className="bg-red-600 text-white px-2 py-1 rounded"
                      onClick={() => console.log("Supprimer", resource._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Bouton de suppression du fournisseur */}
          <button
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
            onClick={handleDelete}
          >
            Supprimer ce Fournisseur
          </button>
        </>
      )}
    </div>
  );
}
