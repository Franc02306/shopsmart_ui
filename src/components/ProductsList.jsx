import { useState, useEffect } from "react";
import { VerDetalles } from "./modals/VerDetalles";
import { MenuItem } from "@mui/material";
import {
  Box,
  Button,
  Typography,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  TablePagination,
  CardMedia,
  TextField,
  Grid2 as Grid,
} from "@mui/material";

// Importar ProdcutService
import {
  getProducts,
  getProductByName,
  getProductByPriceRange,
  getProductsByCategory,
} from "../service/ProductService";

import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

// Importar ventanas modales
import CartSidebar from "./modals/CartSidebar";
import MenuSidebar from "./modals/MenuSidebar";

const ProductList = () => {
  const [products, setProducts] = useState([]); // Lista de productos
  const [page, setPage] = useState(0); // Página actual
  const [rowsPerPage, setRowsPerPage] = useState(10); // Productos por página
  const [searchName, setSearchName] = useState(""); // Término de búsqueda por nombre
  const [minPrice, setMinPrice] = useState(""); // Precio mínimo
  const [maxPrice, setMaxPrice] = useState(""); // Precio máximo
  const [selectedCategory, setSelectedCategory] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Para mostrar mensajes de error si falla algo
  const [selectedProducts, setSelectedProducts] = useState([]); // Lista de grupos seleccionados para el carrito
  const [sidebarOpen, setSidebarOpen] = useState(false); // Controlar el menu lateral del carrito
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false);

  //Controlar modal
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false); // Cierra el modal

  const categories = [
    "BOOKS",
    "ELECTRONICS",
    "CLOTHING",
    "FURNITURE",
    "TOYS",
    "GROCERIES",
  ];

  // Llamada al servicio para obtener productos
  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response.data.data);
    } catch (error) {
      setErrorMessage("Error al cargar los productos");
      console.error("Error fetching products:", error);
    }
  };

  // Cargar los productos cuando el componente se monta
  useEffect(() => {
    fetchProducts();
  }, []);

  // Filtrar productos por nombre
  const handleSearchByName = async () => {
    try {
      if (searchName.trim()) {
        const response = await getProductByName(searchName);
        console.log("Resultados de búsqueda por nombre:", response.data.data); // Para verificar la respuesta
        setProducts(response.data.data);

        // Si no se encontraron productos
        if (response.data.length === 0) {
          setErrorMessage("No se encontraron productos con ese nombre.");
        } else {
          setErrorMessage("");
        }
      } else {
        fetchProducts(); // Si el campo está vacío, volvemos a obtener todos los productos
      }
    } catch (error) {
      setErrorMessage("Error al buscar productos por nombre.");
      console.error("Error searching products by name:", error);
    }
  };

  // Filtrar productos por rango de precios
  const handleSearchByPrice = async () => {
    try {
      if (minPrice && maxPrice) {
        const response = await getProductByPriceRange(minPrice, maxPrice);
        setProducts(response.data.data);
        setErrorMessage("");
      } else {
        setErrorMessage("Por favor, ingresa un rango de precios válido.");
        fetchProducts(); // Si no se establece el rango de precios, mostramos todos los productos
      }
    } catch (error) {
      setErrorMessage("Error al buscar productos por rango de precios.");
      console.error("Error searching products by price range:", error);
    }
  };

  // Cambiar de página en la paginación
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Cambiar la cantidad de productos por página
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const fetchProductsByCategory = async (category) => {
    try {
      if (category === "" || category === "MOSTRAR TODO") {
        fetchProducts();
      } else {
        const response = await getProductsByCategory(category);
        setProducts(response.data);
      }
    } catch (error) {
      setErrorMessage("Error al cargar los productos por categoría.");
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleLeftSidebar = () => {
    setLeftSidebarOpen(!leftSidebarOpen);
  };

  const addProductToCart = (product) => {
    setSelectedProducts([...selectedProducts, product]);
  };

  return (
    <div
      className="container my-5"
      style={{
        maxWidth: "90%",
        margin: "auto",
        minHeight: "80vh",
        position: "relative",
      }}
    >
      {/* Boton del menu desplegable izquierdo */}
      <Button
        variant="contained"
        color="primary"
        style={{
          position: "fixed",
          top: "20px",
          left: "20px",
          zIndex: 1000,
          borderRadius: "20px",
        }}
        onClick={toggleLeftSidebar}
      >
        <MenuIcon />
      </Button>
      {/* Botón del carrito fuera del contenedor */}
      <Button
        variant="contained"
        color="primary"
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          zIndex: 1000,
          borderRadius: "20px",
        }}
        onClick={toggleSidebar}
      >
        <ShoppingCartIcon />
      </Button>

      {/* El resto del contenido de ProductList */}
      {/* Filtros */}
      <div className="row mb-4">
        <div className="col-md-4">
          <TextField
            fullWidth
            label="Buscar por nombre"
            variant="outlined"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            size="small"
          />
        </div>
        <div className="col-md-3">
          <TextField
            select
            fullWidth
            label="Categoría..."
            value={selectedCategory}
            onChange={(e) => {
              const selectedValue = e.target.value;
              setSelectedCategory(selectedValue);
              fetchProductsByCategory(selectedValue);
            }}
            variant="outlined"
            size="small"
          >
            <MenuItem value="MOSTRAR TODO">MOSTRAR TODO</MenuItem>
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div className="col-md-2">
          <TextField
            fullWidth
            label="Precio mínimo"
            variant="outlined"
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            size="small"
          />
        </div>
        <div className="col-md-2">
          <TextField
            fullWidth
            label="Precio máximo"
            variant="outlined"
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            size="small"
          />
        </div>
        <div className="col-md-1 d-flex align-items-end">
          <Button
            variant="contained"
            className="btn btn-primary"
            onClick={handleSearchByName}
          >
            Buscar
          </Button>
        </div>
      </div>

      {/* Mensaje de error */}
      {errorMessage && (
        <Typography variant="body1" color="error" className="mb-4">
          {errorMessage}
        </Typography>
      )}

      {/* Lista de productos */}
      <div className="row">
        {products.length === 0 ? (
          <div className="text-center py-4">
            <Typography variant="body1" color="textSecondary">
              No se encontraron productos disponibles
            </Typography>
          </div>
        ) : (
          products
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((product, index) => (
              <div className="col-md-4 mb-4" key={index}>
                <div className="card h-100 shadow-sm">
                  <div className="card-header">
                    <h5 className="card-title">{product.name}</h5>
                  </div>
                  <div className="card-body">
                    <Typography variant="body2" color="textSecondary">
                      Precio: S/.{product.price}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Fabricante: {product.brand}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Inventario: {product.inventory}
                    </Typography>
                  </div>
                  <div className="card-footer">
                    <Button
                      className="btn btn-primary"
                      onClick={() => setSelectedProduct(product)}
                    >
                      Ver detalles
                    </Button>
                  </div>
                </div>
              </div>
            ))
        )}
      </div>

      {/* Modal */}
      {selectedProduct && (
        <VerDetalles
          product={selectedProduct}
          open={Boolean(selectedProduct)}
          handleClose={() => setSelectedProduct(null)}
          addToCart={addProductToCart}
        />
      )}

      {/* Paginación */}
      <TablePagination
        component="div"
        count={products.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Productos por página"
      />

      {/* Menú lateral del carrito */}
      <CartSidebar
        open={sidebarOpen}
        onClose={toggleSidebar}
        selectedProducts={selectedProducts}
      />

      {/* Menú lateral izquierdo */}
      <MenuSidebar open={leftSidebarOpen} onClose={toggleLeftSidebar} />
    </div>
  );
};

export default ProductList;
