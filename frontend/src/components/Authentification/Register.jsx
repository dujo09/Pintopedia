import axios from "axios";
import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useAuth } from "../../hooks/useAuth";

export default function Register({}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "users/register",
        { username: username, password: password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const userSession = {
        username: response.data.username,
        token: response.data.token,
        role: response.data.role,
        id: response.data.id,
      };

      await login(userSession);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          width: "300px",
          textAlign: "center",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Registracija
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            label="Korisničko ime"
            variant="outlined"
            fullWidth
            margin="normal"
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <TextField
            label="Lozinka"
            variant="outlined"
            type="password"
            fullWidth
            margin="normal"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <Button
            className="form-submit-button"
            fullWidth
            variant="contained"
            type="submit"
          >
            Stvori račun
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
