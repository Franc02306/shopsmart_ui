import React from "react";
import { Drawer, Box, Typography, Button } from "@mui/material";

const CartSidebar = ({ open, onClose, selectedProducts }) => {
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box
        sx={{ width: 300, padding: 2 }}
        role="presentation"
        onClick={onClose}
        onKeyDown={onClose}
      >
        <Typography variant="h6" gutterBottom>
          Carrito de Compras
        </Typography>
        {selectedProducts.length === 0 ? (
          <Typography>No has seleccionado productos.</Typography>
        ) : (
          selectedProducts.map((product, index) => (
            <Box key={index} sx={{ marginBottom: 2 }}>
              <Typography variant="body1">{product.productName}</Typography>
              <Typography variant="body2">
                Precio: S/.{product.price}
              </Typography>
            </Box>
          ))
        )}
        <Button variant="contained" color="primary" fullWidth>
          Finalizar Compra
        </Button>
      </Box>
    </Drawer>
  );
};

export default CartSidebar;
