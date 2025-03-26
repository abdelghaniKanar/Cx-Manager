import { NavLink, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  // Déconnexion
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="h-screen w-64 bg-secondary text-white flex flex-col p-4">
      {/* Logo */}
      <h1 className="text-2xl font-bold text-primary mb-6">Cx-Manager</h1>

      {/* Navigation */}
      <nav className="flex flex-col space-y-3">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `p-2 rounded ${
              isActive ? "bg-primary text-secondary" : "hover:bg-gray-700"
            }`
          }
        >
          Projets
        </NavLink>

        <NavLink
          to="/suppliers"
          className={({ isActive }) =>
            `p-2 rounded ${
              isActive ? "bg-primary text-secondary" : "hover:bg-gray-700"
            }`
          }
        >
          Fournisseurs
        </NavLink>

        <button
          onClick={handleLogout}
          className="mt-auto bg-red-600 hover:bg-red-700 p-2 rounded"
        >
          Déconnexion
        </button>
      </nav>
    </div>
  );
}
