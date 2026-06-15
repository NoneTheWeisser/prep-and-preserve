import { Box, Button, Divider, Typography } from "@mui/material";

export default function GoogleSignInButton({ label = "Continue with Google" }) {
  const handleGoogleSignIn = () => {
    window.location.href = "/api/auth/google";
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Divider sx={{ my: 2 }}>
        <Typography variant="body2" color="text.secondary">
          or
        </Typography>
      </Divider>
      <Button variant="outlined" fullWidth onClick={handleGoogleSignIn}>
        {label}
      </Button>
    </Box>
  );
}
