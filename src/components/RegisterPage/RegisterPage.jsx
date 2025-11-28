import { useState, useEffect } from "react";
import { TextField, Button, Box, Paper, Typography } from "@mui/material";
import useStore from "../../zustand/store";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState("");

  const register = useStore((state) => state.register);
  const errorMessage = useStore((state) => state.authErrorMessage);
  const setAuthErrorMessage = useStore((state) => state.setAuthErrorMessage);
  const showSnackbar = useStore((state) => state.showSnackbar);

  const navigate = useNavigate();

  useEffect(() => {
    // Clear the auth error message when the component unmounts:
    return () => {
      setAuthErrorMessage("");
    };
  }, []);

  const openCloudinaryWidget = () => {
    if (!window.cloudinary) return;
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: import.meta.env.VITE_CLOUDINARY_NAME,
        uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
        sources: ["local", "url", "camera"],
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          setProfileImage(result.info.secure_url);
        }
      }
    );
    widget.open();
  };

  const handleRegister = (event) => {
    event.preventDefault();

    register({
      username: username,
      password: password,
      email: email,
      profile_image_url: profileImage,
    });
    showSnackbar({
      message: "Account created!",
      severity: "success",
    });
  };

  return (
    <Box
      sx={{
        minHeight: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `
          // linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)),
          url("/img/pexels-karola-g-4084673.jpg")
        `,
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
          maxWidth: 420,
          p: 4,
          borderRadius: 3,
          backgroundColor: "rgba(255, 255, 255, 0.85)",
          backdropFilter: "blur(6px)",
        }}
      >
        <img
          src="/img/prepperservelogo_horizontal.svg"
          alt="Prep & Preserve"
          style={{ width: "100%", marginBottom: "1.5rem" }}
        />

        <Typography variant="h5" textAlign="center" mb={2}>
          Create Account
        </Typography>

        <form onSubmit={handleRegister}>
          <TextField
            fullWidth
            label="Username"
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <TextField
            fullWidth
            label="Email"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Button
            variant="outlined"
            fullWidth
            sx={{ mt: 2 }}
            onClick={openCloudinaryWidget}
          >
            Upload Profile Image
          </Button>

          {profileImage && (
            <Box mt={2} textAlign="center">
              <Typography variant="body2" mb={1}>
                Profile Image Preview
              </Typography>
              <img
                src={profileImage}
                alt="Profile Preview"
                width={120}
                style={{ borderRadius: "8px" }}
              />
            </Box>
          )}

          {errorMessage && (
            <Typography color="error" mt={2} textAlign="center">
              {errorMessage}
            </Typography>
          )}

          <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>
            Create Account
          </Button>

          <Button
            variant="text"
            fullWidth
            sx={{ mt: 1 }}
            onClick={() => navigate("/login")}
          >
            Already have an account? Sign In
          </Button>
        </form>
      </Paper>
    </Box>
  );
}

export default RegisterPage;
