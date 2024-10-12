import React from "react";
import { Drawer, Typography, MenuItem, Button, Box } from "@mui/material";

const MenuSidebar = ({ open, onClose }) => {
  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <div
        style={{
          width: 250,
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
        role="presentation"
        onClick={onClose}
        onKeyDown={onClose}
      >
        <Typography variant="h6" style={{ padding: "16px" }}>
          Menú lateral
        </Typography>
        <MenuItem>Opción 1</MenuItem>
        <MenuItem>Opción 2</MenuItem>
        <MenuItem>Opción 3</MenuItem>

        <Box
          sx={{
            marginTop: "auto",
            padding: 2,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button variant="contained" color="secondary" onClick={onClose}>
            Cerrar Sesión
          </Button>
        </Box>
      </div>
    </Drawer>
  );
};

export default MenuSidebar;
