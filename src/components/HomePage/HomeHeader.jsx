import React from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import useStore from "../../zustand/store";
import { useNavigate } from "react-router-dom";

export default function HomeHeader() {
  const user = useStore((state) => state.user);
  const logOut = useStore((state) => state.logOut);
  const navigate = useNavigate();

  return (
     <Box>
      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          height: 500,
          width: "100%",
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          px: { xs: 2, md: "5%" },
          backgroundImage: `url("/img/pexels-photo-326281.jpeg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Box
          component="img"
          src="/img/prepperservelogo_vertical_white.svg"
          alt="Prep & Preserve White logo"
          sx={{ width: 200, mb: 2 }}
        />

        <Typography variant="h3" sx={{ mb: 2 }}>
          Welcome {user.username || ""}
        </Typography>

        <Typography
          variant="body1"
          sx={{ maxWidth: 600, lineHeight: 1.5, fontSize: "1.1rem" }}
        >
          Welcome to your personal recipe book! Here you can save and organize
          the recipes you love, all in one clean, easy-to-read space. Add your
          own recipes or explore those shared by others. Format instructions,
          add ingredients, and even upload images to make your collection truly
          yours. Cook without distractions and keep all your favorites at your
          fingertips.
        </Typography>

        {/* Conditional Buttons */}
        <Stack
          direction="row"
          spacing={2}
          sx={{ position: "absolute", bottom: 30, right: { xs: 16, md: "5%" } }}
        >
          {!user.id ? (
            <>
              <Button
                variant="contained"
                color="error"
                onClick={() => navigate("/login")}
              >
                Sign In
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => navigate("/registration")}
              >
                Create Account
              </Button>
            </>
          ) : (
            <Button variant="contained" color="secondary" onClick={logOut}>
              Log Out
            </Button>
          )}
        </Stack>
      </Box>

      {/* Trending Recipes Section */}
      <Typography variant="h5" sx={{ textAlign: "center", mt: 4 }}>
        Trending Recipes
      </Typography>
    </Box>
  );
}
