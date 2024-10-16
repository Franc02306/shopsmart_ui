import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import ProductList from "./components/ProductsList";
import UserRegistration from "./components/UserRegistration"; // Importa el componente de registro
import PropTypes from "prop-types";

const ProtectedRoute = ({ element }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  return isAuthenticated ? element : <Navigate to="/login" />;
};

ProtectedRoute.propTypes = {
  element: PropTypes.node.isRequired,
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<UserRegistration />} /> {/* Nueva ruta para registro */}
        <Route path="/products-list" element={<ProtectedRoute element={<ProductList />} />} />
      </Routes>
    </Router>
  );
}

export default App;
