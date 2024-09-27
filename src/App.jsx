import { useState, useEffect } from "react";
import "./App.css";
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
import {
  getProducts,
  getProductByName,
  getProductByPriceRange,
} from "./Service/ProductService"; // Importar tus servicios

const ProductList = () => {
  const [products, setProducts] = useState([]); // Lista de productos
  const [page, setPage] = useState(0); // Página actual
  const [rowsPerPage, setRowsPerPage] = useState(10); // Productos por página
  const [searchName, setSearchName] = useState(""); // Término de búsqueda por nombre
  const [minPrice, setMinPrice] = useState(""); // Precio mínimo
  const [maxPrice, setMaxPrice] = useState(""); // Precio máximo
  const [errorMessage, setErrorMessage] = useState(""); // Para mostrar mensajes de error si falla algo

  // Llamada al servicio para obtener productos
  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response.data);
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
        console.log("Resultados de búsqueda por nombre:", response.data); // Para verificar la respuesta
        setProducts(response.data);

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
        setProducts(response.data);
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

  return (
    <Box sx={{ flexGrow: 1, padding: 6 }}>
      {/* Filtros */}
      <Grid container spacing={2} sx={{ marginBottom: 4 }}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Buscar por nombre"
            variant="outlined"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            sx={{ marginTop: 2 }}
            onClick={handleSearchByName}
          >
            Buscar por nombre
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Precio mínimo"
            variant="outlined"
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <TextField
            fullWidth
            label="Precio máximo"
            variant="outlined"
            type="number"
            value={maxPrice}
            sx={{ marginTop: 2 }}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            sx={{ marginTop: 2 }}
            onClick={handleSearchByPrice}
          >
            Buscar por precio
          </Button>
        </Grid>
      </Grid>

      {/* Mensaje de error */}
      {errorMessage && (
        <Typography variant="body1" color="error" sx={{ marginBottom: 4 }}>
          {errorMessage}
        </Typography>
      )}

      {/* Lista de productos */}
      <Grid container spacing={2} justifyContent="center">
        {products.length === 0 ? (
          <Box sx={{ textAlign: "center", padding: 4 }}>
            <Typography variant="body1" color="textSecondary">
              No se encontraron productos disponibles
            </Typography>
          </Box>
        ) : (
          products
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((product, index) => (
              <Grid item xs={12} sm={6} md={6} lg={4} key={index}>
                <Card
                  elevation={3}
                  sx={{ flexGrow: 1, borderRadius: "16px", minHeight: "400px" }}
                >
                  <CardHeader title={product.productName} />
                  <CardMedia height="200" alt={product.productName} />
                  <CardContent>
                    <Typography variant="body2" color="textSecondary">
                      Descripción: {product.description || "Sin descripción"}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Precio: ${product.price}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Fabricante: {product.manufacturer}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Cantidad: {product.quantity}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Categoría: {product.category}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Estado: {product.status}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary">
                      Ver detalles
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))
        )}
      </Grid>

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
    </Box>
  );
};

export default ProductList;
