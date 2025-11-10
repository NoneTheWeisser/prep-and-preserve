import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useStore from "../../zustand/store";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import parse from "html-react-parser";
import {
  Box,
  Container,
  Typography,
  IconButton,
  Stack,
  Divider,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PrintIcon from "@mui/icons-material/Print";

export default function FullRecipeView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const fetchRecipeById = useStore((state) => state.fetchRecipeById);
  const deleteRecipe = useStore((state) => state.deleteRecipe);
  const [recipe, setRecipe] = useState(null);
  const user = useStore((state) => state.user);

  // // Favorites
  const fetchFavorites = useStore((state) => state.fetchFavorites);
  const favorites = useStore((state) => state.favorites);
  const toggleFavorite = useStore((state) => state.toggleFavorite);
  const isFavorited = useStore((state) => state.isFavorited);

  // TODO look into why admin isn't working properly
  const canEdit = user && recipe && recipe.user_id === user.id;

  const getRecipe = async () => {
    try {
      const data = await fetchRecipeById(id);
      setRecipe(data);
    } catch (error) {
      console.error("Error fetching recipe:", error);
    }
  };

  useEffect(() => {
    getRecipe();
    if (favorites.length === 0) {
      fetchFavorites();
    }
  }, [id]);

  if (!recipe) return <Typography>Loading...</Typography>;
  
  const favoriteActive = isFavorited(recipe.id);

  return (
    <Box sx={{ pb: 6 }}>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        {recipe.image_url && (
          <Box
            component="img"
            src={recipe.image_url}
            alt={recipe.title}
            sx={{
              width: "100%",
              borderRadius: 2,
              objectFit: "cover",
              maxHeight: { xs: 260, md: 400 },
              mb: 4,
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}
          />
        )}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h4" fontWeight={700} sx={{ lineHeight: 1.2 }}>
            {recipe.title}
          </Typography>

          <Stack direction="row" spacing={1} alignItems="center">
            {/* Favorite icon (only if logged in) */}
            {user && (
              <IconButton
                onClick={() => toggleFavorite(recipe.id)}
                sx={{ color: favoriteActive ? "red" : "gray" }}
              >
                {favoriteActive ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              </IconButton>
            )}

            {/* Edit/Delete actions (if owner) */}
            {canEdit && (
              <>
                <IconButton onClick={() => navigate(`/recipes/edit/${id}`)}>
                  <EditIcon fontSize="small" />
                </IconButton>
                {/* is it worth it to do a print button?  */}
                <IconButton onClick={() => window.print()}>
                   <PrintIcon fontSize="small" />
                </IconButton>
                <IconButton
                  onClick={async () => {
                    if (!window.confirm("Delete this recipe?")) return;
                    await deleteRecipe(id);
                    navigate("/myrecipes");
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </>
            )}
          </Stack>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          Submitted by: {recipe.username}
        </Typography>
        {recipe.source_url && (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Source:{" "}
            <a
              href={recipe.source_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Original
            </a>
          </Typography>
        )}
        <Divider sx={{ my: 3 }} />
        {recipe.description && (
          <>
            <Typography variant="h5" fontWeight={600} sx={{ mb: 1.5 }}>
              Description
            </Typography>
            <Typography sx={{ mb: 3 }}>{recipe.description}</Typography>
          </>
        )}
        <Typography variant="h5" fontWeight={600} sx={{ mt: 4, mb: 1.5 }}>
          Ingredients
        </Typography>
        <Box sx={{ mb: 3 }}>{parse(recipe.ingredients)}</Box>
        <Typography variant="h5" fontWeight={600} sx={{ mt: 4, mb: 1.5 }}>
          Instructions
        </Typography>
        <Box sx={{ mb: 4 }}>{parse(recipe.instructions)}</Box>
      </Container>
    </Box>
  );
}
