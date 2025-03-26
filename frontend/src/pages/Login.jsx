import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // connexion
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );

      localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (err) {
      setError("Identifiants incorrects");
    }
  };

  return (
    <div className="flex h-screen bg-lightGray font-poppins">
      {/* Côté image */}
      <div
        className="hidden md:flex w-1/2 bg-cover bg-center"
        style={{ backgroundImage: "url('/vite.svg')" }}
      ></div>

      {/* Côté formulaire */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-6 bg-white shadow-lg">
        <h2 className="text-3xl font-semibold text-secondary mb-4">
          Connexion
        </h2>

        {error && <p className="text-red-500">{error}</p>}

        <form onSubmit={handleLogin} className="w-full max-w-sm">
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
            Se connecter
          </button>
        </form>

        <p className="mt-4">
          Pas encore de compte ?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-primary cursor-pointer"
          >
            S'inscrire
          </span>
        </p>
      </div>
    </div>
  );
}
