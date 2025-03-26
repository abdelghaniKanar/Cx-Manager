import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Inscription
  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/signup",
        { username, email, password }
      );

      localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (err) {
      setError("Erreur lors de l'inscription");
    }
  };

  return (
    <div className="flex h-screen bg-lightGray font-montserrat">
      {/* Côté image */}
      <div
        className="hidden md:flex w-1/2 bg-cover bg-center"
        style={{ backgroundImage: "url('/vite.svg')" }}
      ></div>

      {/* Côté formulaire */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-6 bg-white shadow-lg">
        <h2 className="text-3xl font-semibold text-secondary mb-4">
          Créer un Compte
        </h2>

        {error && <p className="text-red-500">{error}</p>}

        <form onSubmit={handleSignup} className="w-full max-w-sm">
          <div className="mb-4">
            <label className="block text-secondary">Nom d'utilisateur :</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-secondary">Email :</label>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-secondary">Mot de passe :</label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-secondary font-semibold py-2 rounded"
          >
            S'inscrire
          </button>
        </form>

        <p className="mt-4">
          Déjà un compte ?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-primary cursor-pointer"
          >
            Se connecter
          </span>
        </p>
      </div>
    </div>
  );
}
