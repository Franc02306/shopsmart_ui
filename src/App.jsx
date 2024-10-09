import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import ProductList from "./components/ProductsList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} ></Route>
        <Route path="/login" element={<Login />} />
        <Route path="/products-list" element={<ProductList />} />
      </Routes>
    </Router>
  );
}

export default App;