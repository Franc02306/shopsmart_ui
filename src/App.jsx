import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "./components/ProductsList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/products-list" element={<ProductList />} />
      </Routes>
    </Router>
  );
}

export default App;