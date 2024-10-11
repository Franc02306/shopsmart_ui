import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close'; // Icono de "X" para cerrar

export const VerDetalles = ({ product, open, handleClose, addToCart }) => { // Añadimos addToCart como prop
  if (!product) return null; // Verifica si 'product' es nulo o indefinido

  // Obtener la primera imagen del producto, si existe
  const productImage = product.images && product.images.length > 0 ? product.images[0].downloadUrl : null;

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        {product.name || "Nombre no disponible"}
        {/* Botón "X" para cerrar en la esquina superior derecha */}
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        {/* Mostrar la imagen del producto si está disponible */}
        {productImage && (
          <img
            src={productImage}
            alt={product.name}
            style={{ width: '100%', marginBottom: '15px' }}
          />
        )}
        <Typography variant="body2">Descripción: {product.description || "No disponible"}</Typography>
        <Typography variant="body2">Precio: S/.{product.price || "No disponible"}</Typography>
        <Typography variant="body2">Fabricante: {product.manufacturer || "No disponible"}</Typography>
        <Typography variant="body2">Cantidad: {product.inventory || "No disponible"}</Typography>
        <Typography variant="body2">
          Categoría: {product.category ? product.category.name : "No disponible"}
        </Typography>
        <Typography variant="body2">Estado: {product.status || "No disponible"}</Typography>
      </DialogContent>

      {/* Botón "Agregar al carrito" centrado */}
      <DialogActions sx={{ justifyContent: 'center' }}>
        <Button
          onClick={() => {
            addToCart({
              id: product.id,
              name: product.name,
              price: product.price,
              image: productImage, // Añadir la URL de la imagen al carrito
            }); // Llama a la función para agregar al carrito con los datos necesarios
            handleClose(); // Cierra el modal
          }}
          color="primary"
          variant="contained"
        >
          Agregar al carrito
        </Button>
      </DialogActions>
    </Dialog>
  );
};
