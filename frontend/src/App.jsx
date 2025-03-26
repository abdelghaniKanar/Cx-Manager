import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Suppliers from "./pages/Suppliers";
import SupplierDetails from "./pages/SupplierDetails";

// Vérifier si l'utilisateur est connecté (Simulé avec localStorage)
const isAuthenticated = () => !!localStorage.getItem("token");

export default function App() {
  return (
    <Routes>
      {/* Page de connexion accessible sans authentification */}
      <Route path="/login" element={<Login />} />
      {/* Page de l'Inscription*/}
      <Route path="/signup" element={<Signup />} />

      {/* Pages protégées */}
      <Route
        path="/"
        element={isAuthenticated() ? <Dashboard /> : <Navigate to="/login" />}
      >
        <Route
          index
          element={isAuthenticated() ? <Projects /> : <Navigate to="/login" />}
        />
        <Route
          path="suppliers"
          element={isAuthenticated() ? <Suppliers /> : <Navigate to="/login" />}
        />
      </Route>
      <Route
        path="/suppliers/:id"
        element={
          isAuthenticated() ? <SupplierDetails /> : <Navigate to="/login" />
        }
      />

      {/* Redirection si la route n'existe pas */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
