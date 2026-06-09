import React from "react";
import { Box, Typography, IconButton, Stack, Avatar } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useNavigate } from "react-router-dom";
import { formatDuration } from "../../utils/formatDuration";

export default function RecipeCard({
  recipe,
  favorites = [],
  toggleFavorite,
  onClick,
}) {
  const navigate = useNavigate();
  const isFav = favorites.some((fav) => fav.id === recipe.id);
  const totalMinutes =
    (recipe.prep_time_minutes || 0) + (recipe.cook_time_minutes || 0);
  const hasTimeOrServings = totalMinutes > 0 || recipe.servings;

  return (
    <Box
      onClick={onClick}
      sx={{
        width: "100%", // fills the Grid column
        aspectRatio: "6 / 8", // keeps uniform card shape
        position: "relative",
        cursor: "pointer",
        maxWidth: { xs: 150, sm: 200, md: 250 },
        borderRadius: 2,
        overflow: "hidden",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      {recipe.image_url ? (
        <Box
          component="img"
          src={recipe.image_url || "/img/fallbackimage.jpg"}
          alt={recipe.title}
          onError={(e) => (e.currentTarget.src = "/img/fallbackimage.jpg")}
          sx={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      ) : (
        <Box sx={{ width: "100%", height: "100%", backgroundColor: "#eee" }} />
      )}
      <IconButton
        sx={{
          position: "absolute",
          top: 7,
          right: 7,
          color: isFav ? "white" : "white",
          bgcolor: "rgba(0,0,0,0.35)",
          borderRadius: "50%",
          boxShadow: "0 2px 6px rgba(0,0,0,0.4)",
          "&:hover": { bgcolor: "rgba(0,0,0,0.65)" },
        }}
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite(recipe.id);
        }}
      >
        {isFav ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </IconButton>
      {/* Overlay */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          bgcolor: "rgba(0,0,0,0.6)",
          color: "white",
          p: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          minHeight: 70,
        }}
      >
        <Box sx={{ textAlign: "left" }}>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 600,
              lineHeight: 1.1,
              whiteSpace: "normal",
              display: "-webkit-box",
              WebkitLineClamp: 2, // wrap max 2 lines
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {recipe.title}
          </Typography>
          {/* Username with navigation and hover styling */}
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{ mt: 0.5 }}
          >
            <Typography
              variant="body2"
              color="inherit"
              sx={{
                textDecoration: "underline",
                cursor: "pointer",
                transition: "color 0.2s, transform 0.2s", // <-- Styling commit
                "&:hover": {
                  color: "#ffcc00",
                  transform: "translateY(-2px)",
                },
              }}
              onClick={(e) => {
                e.stopPropagation(); // <-- Navigation logic commit
                navigate(`/user/${recipe.user_id}`); // <-- Navigation logic commit
              }}
            >
              @{recipe.username}
            </Typography>
          </Stack>
          {hasTimeOrServings && (
            <Typography
              variant="caption"
              sx={{ display: "block", mt: 0.5, opacity: 0.9 }}
            >
              {totalMinutes > 0 && formatDuration(totalMinutes)}
              {totalMinutes > 0 && recipe.servings && " • "}
              {recipe.servings && `Serves ${recipe.servings}`}
            </Typography>
          )}

          {/* <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            // switching to absolute so I can control where username is.
            sx={{
              mt: 0.5,
              // position: "absolute",
              // bottom: 6,
              // left: 6,
              // fontSize: { xs: "0.6rem", sm: "0.75rem", md: "0.8rem" },
            }}
          >
            <Typography variant="body2" color="inherit">
              @{recipe.username}
            </Typography>
          </Stack> */}
        </Box>
      </Box>
    </Box>
  );
}
