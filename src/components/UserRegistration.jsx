import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserRegistration = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/v1/users/add", formData);

      // Mostrar mensaje de éxito
      setSnackbarMessage("Usuario registrado con éxito.");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);

      console.log("Registro exitoso, redirigiendo...");

      const handleRegister = () => {
        navigate("/login"); // Redirige al login
      };

    } catch (error) {
      // Manejar los errores correctamente
      const errorMessage = error.response?.data?.message || "Error al registrar el usuario";
      setError(errorMessage);
      setSnackbarMessage("Error: " + errorMessage);
      setSnackbarSeverity("error");
      setSnackbarOpen(true);

      console.log("Error al registrar:", errorMessage);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(true);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 400, margin: "auto", padding: 4, boxShadow: 3, mt: 5 }}
    >
      <Typography variant="h5" gutterBottom>
        Registro de Usuario
      </Typography>
      {error && (
        <Typography variant="body2" color="error" gutterBottom>
          {error}
        </Typography>
      )}
      <TextField
        label="Nombre"
        name="firstName"
        value={formData.firstName}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Apellido"
        name="lastName"
        value={formData.lastName}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Correo electrónico"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Contraseña"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        required
      />
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Registrar
      </Button>

      {/* Snackbar para mostrar mensajes */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UserRegistration;
