import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Snackbar,
  Alert,
  Grid2 as Grid,
  Typography,
} from "@mui/material";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleLogin = () => {
    const credentials = [
      { username: "user1", password: "pass1" },
      { username: "user2", password: "pass2" },
    ];

    const user = credentials.find(
      (cred) => cred.username === username && cred.password === password
    );

    if (user) {
      setSnackbarMessage("Inicio de sesión exitoso");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
      console.log("Inicio de sesión exitoso");
    } else {
      setSnackbarMessage("Usuario o contraseña incorrectos");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Grid
      container
      className="h-100 d-flex align-items-center justify-content-center"
    >
      <div className="row w-100 h-100">
        {/* Columna izquierda: Imagen */}
        <div className="col-md-6 d-flex justify-content-center align-items-center bg-light-gray">
          <img
            src="/images/ShopSmart_Logo.png"
            alt="Imagen de login"
            className="img-fluid"
            style={{ maxWidth: "80%", maxHeight: "80%" }}
          />
        </div>

        {/* Columna derecha: Formulario */}
        <div className="col-md-6 d-flex flex-column justify-content-center align-items-center p-5">
          <div className="flex flex-col gap-1">
            <Typography style={{ fontWeight: "bold" }} variant="h4">
              Bienvenido a ShopSmart
            </Typography>
          </div>

          <TextField
            label="Usuario"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ marginBottom: "20px", width: "300px" }}
          />

          <TextField
            label="Contraseña"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ marginBottom: "20px", width: "300px" }}
          />

          <Button
            variant="contained"
            color="primary"
            onClick={handleLogin}
            style={{ width: "300px" }}
          >
            Iniciar Sesión
          </Button>

          {/* Snackbar para mostrar éxito o error */}
          <Snackbar
            open={openSnackbar}
            autoHideDuration={4000}
            onClose={handleCloseSnackbar}
          >
            <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
              {snackbarMessage}
            </Alert>
          </Snackbar>
        </div>
      </div>
    </Grid>
  );
};

export default Login;
