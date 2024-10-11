import React from "react";
import { Drawer, Box, Typography, Button } from "@mui/material";

const CartSidebar = ({ open, onClose, selectedProducts }) => {
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box
        sx={{
          width: 300,
          padding: 2,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
        role="presentation"
      >
        <Typography variant="h6" gutterBottom>
          Carrito de Compras
        </Typography>
        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            marginBottom: 2,
          }}
        >
          {selectedProducts.length === 0 ? (
            <Typography>No has seleccionado productos.</Typography>
          ) : (
            selectedProducts.map((product, index) => {
              const imageUrl = product.images && product.images.length > 0 ? product.images[0].downloadUrl : null;
              console.log("Producto:", product);
              console.log("URL de la imagen:", imageUrl);
              
              return (
                <Box key={index} sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={product.name}
                      style={{
                        width: 50,
                        height: 50,
                        marginRight: 8,
                      }}
                    />
                  ) : (
                    <Typography variant="body2" color="textSecondary">
                      Imagen no disponible
                    </Typography>
                  )}
                  <Box>
                    <Typography variant="body1">{product.name}</Typography>
                    <Typography variant="body2">Precio: S/.{product.price}</Typography>
                  </Box>
                </Box>
              );
            })
          )}
        </Box>
        <Button variant="contained" color="primary" fullWidth>
          Finalizar Compra
        </Button>
      </Box>
    </Drawer>
  );
};

export default CartSidebar;