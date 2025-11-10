import React from "react";
import { Box, Typography, IconButton, Stack, Avatar } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export default function RecipeCard({
  recipe,
  favorites,
  toggleFavorite,
  onClick,
}) {
  const isFav = favorites.some((fav) => fav.id === recipe.id);

  return (
    <Box
      onClick={onClick}
      sx={{
        width: 200, // todo figure out what the best fixed w & h is
        height: 280,
        position: "relative",
        cursor: "pointer",
        borderRadius: 2,
        overflow: "hidden",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      {recipe.image_url ? (
        <Box
          component="img"
          src={recipe.image_url}
          alt={recipe.title}
          sx={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      ) : (
        <Box sx={{ width: "100%", height: "100%", backgroundColor: "#eee" }} />
      )}

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
          minHeight: 80,
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

          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            // switching to absolute so I can control where username is. 
            sx={{ mt: 0.5, position: "absolute", bottom: 10, left: 6 }}
          >
            <Typography variant="body2" color="inherit">
              @{recipe.username}
            </Typography>
          </Stack>
        </Box>
        <IconButton
          sx={{ color: "white" }}
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(recipe.id);
          }}
        >
          {isFav ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
      </Box>
    </Box>
  );
}
