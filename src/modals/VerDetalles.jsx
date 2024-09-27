import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close'; // Icono de "X" para cerrar

export const VerDetalles = ({ product, open, handleClose }) => {
  return (
    
    <Dialog open={open} onClose={handleClose}>

      <DialogTitle>
        {product.productName}
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
        <Typography variant="body2">Descripción: {product.description}</Typography>
        <Typography variant="body2">Precio: ${product.price}</Typography>
        <Typography variant="body2">Fabricante: {product.manufacturer}</Typography>
        <Typography variant="body2">Cantidad: {product.quantity}</Typography>
        <Typography variant="body2">Categoría: {product.category}</Typography>
        <Typography variant="body2">Estado: {product.status}</Typography>
      </DialogContent>

      {/* Botón "Agregar al carrito" centrado */}
      <DialogActions sx={{ justifyContent: 'center' }}>
        <Button onClick={() => alert("Producto agregado al carrito")} color="primary" variant="contained">
          Agregar al carrito
        </Button>
      </DialogActions>
    </Dialog>
  );
};
