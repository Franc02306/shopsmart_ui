import React from "react";
import { Drawer, Typography, MenuItem } from "@mui/material";

const MenuSidebar = ({ open, onClose }) => {
  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <div
        style={{ width: 250 }}
        role="presentation"
        onClick={onClose}
        onKeyDown={onClose}
      >
        <Typography variant="h6" style={{ padding: "16px" }}>
          Menú lateral
        </Typography>
        <MenuItem>Opcion 1</MenuItem>
        <MenuItem>Opcion 2</MenuItem>
        <MenuItem>Opcion 3</MenuItem>
      </div>
    </Drawer>
  );
};

export default MenuSidebar;
