import { useState, useEffect } from "react";
import useStore from "../../zustand/store";
import { useNavigate } from "react-router-dom";

import { Box, Button, TextField, Typography, Paper } from "@mui/material";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const logIn = useStore((state) => state.logIn);
  const errorMessage = useStore((state) => state.authErrorMessage);
  const setAuthErrorMessage = useStore((state) => state.setAuthErrorMessage);

  const navigate = useNavigate();

  useEffect(() => {
    //     // Clear the auth error message when the component unmounts:
    return () => setAuthErrorMessage("");
  }, []);

  const handleLogIn = (e) => {
    e.preventDefault();
    logIn({ username, password });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `
          linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)),
          url("/img/pexels-anthonyshkraba-production-8902114.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        p: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: "100%",
          maxWidth: 400,
          p: 4,
          backdropFilter: "blur(6px)",
          backgroundColor: "rgba(255, 255, 255, 0.85)",
          borderRadius: 3,
        }}
      >
        <img
          src="/img/prepperservelogo_horizontal.svg"
          alt="Prep & Preserve logo"
          style={{ width: "100%", marginBottom: "1.5rem" }}
        />

        <Typography variant="h5" mb={2} textAlign="center">
          Sign In
        </Typography>

        <form onSubmit={handleLogIn}>
          <TextField
            label="Username"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {errorMessage && (
            <Typography color="error" variant="body2" mt={1}>
              {errorMessage}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 3, mb: 1 }}
          >
            Sign In
          </Button>

          <Button
            variant="outlined"
            fullWidth
            onClick={() => navigate("/registration")}
          >
            Create Account
          </Button>
          {/* <Button
            variant="text"
            fullWidth
            onClick={() => navigate("/forgot-password")}
            sx={{ mt: 1 }}
          >
            Forgot my password
          </Button> */}
        </form>
      </Paper>
    </Box>
  );
}
