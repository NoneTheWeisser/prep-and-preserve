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
          height: { xs: 450, md: 500 },
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          px: { xs: 2, md: "5%" },
          backgroundImage: `url("/img/pexels-photo-7799695.jpeg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            bgcolor: "rgba(0,0,0,0.4)",
            zIndex: 1,
          },
        }}
      >
        {/* Hero Content */}
        <Box sx={{ position: "relative", zIndex: 2 }}>
          <Box
            component="img"
            src="/img/prepperservelogo_vertical_white.svg"
            alt="Prep & Preserve White logo"
            sx={{ width: { xs: 85, md: 200 }, mb: 1, mt: 2 }}
          />

          <Typography
            variant="h4"
            sx={{
              mb: 2,
              fontSize: { xs: "1.5rem", md: "2.5rem" },
              fontWeight: 600,
            }}
          >
            Welcome {user.username || ""}
          </Typography>

          <Typography
            variant="body1"
            sx={{
              maxWidth: { xs: "100%", md: 600 },
              lineHeight: 1.5,
              fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" }, // smaller on mobile
              mb: { xs: 3, md: 4 }, // margin bottom to avoid overlap with buttons
            }}
          >
            Welcome to your personal recipe book! Here you can save and organize
            the recipes you love, all in one clean, easy-to-read space. Add your
            own recipes or explore those shared by others. Format instructions,
            add ingredients, and even upload images to make your collection
            truly yours. Cook without distractions and keep all your favorites
            at your fingertips.
          </Typography>
        </Box>

        {/* Conditional Buttons */}
        {/* Buttons */}
        <Box
          sx={{
            position: "relative",
            zIndex: 2,
            mt: "auto",
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
            justifyContent: { xs: "center", sm: "flex-end" },
            width: "100%",
            mb: 4,
          }}
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
            <Button variant="contained" color="error" onClick={logOut}>
              Log Out
            </Button>
          )}
        </Box>
      </Box>

      {/* Trending Recipes Section */}
      {/* todo - polish how this looks, I like the idea of directing ppl to the community page.  */}
      {/* <Box sx={{ mt: 4, mb: 2 }}>
        <Typography variant="h5" sx={{ textAlign: "center", fontWeight: 600 }}>
          Trending Recipes
        </Typography>
        <Typography
          sx={{ textAlign: "center", mt: 1, color: "text.secondary" }}
        >
          See what’s cooking in the community! These are the recipes people have
          been making most recently.
        </Typography>
        <Typography sx={{ textAlign: "center", mt: 0, color: "primary.main" }}>
          To explore all community recipes, please visit the{" "}
          <a
            href="/community"
            style={{ textDecoration: "underline", color: "inherit" }}
          >
            Community Recipe Page
          </a>
          .
        </Typography>
      </Box> */}
    </Box>
  );
}
