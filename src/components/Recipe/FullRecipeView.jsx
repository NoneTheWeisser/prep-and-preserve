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
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PrintIcon from "@mui/icons-material/Print";

export default function FullRecipeView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useStore((state) => state.user);

  const fetchRecipeById = useStore((state) => state.fetchRecipeById);
  const deleteRecipe = useStore((state) => state.deleteRecipe);
  const logMade = useStore((state) => state.logMade);
  const madeRecipes = useStore((state) => state.madeRecipes);
  const fetchMade = useStore((state) => state.fetchMade);

  // Favorites
  const fetchFavorites = useStore((state) => state.fetchFavorites);
  const favorites = useStore((state) => state.favorites);
  const toggleFavorite = useStore((state) => state.toggleFavorite);
  const isFavorited = useStore((state) => state.isFavorited);

  // State
  const [recipe, setRecipe] = useState(null);
  const [madeCount, setMadeCount] = useState(0);
  const [hasMade, setHasMade] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const canEdit =
    user && recipe && (recipe.user_id === user.id || user.is_admin);

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
    if (favorites.length === 0) fetchFavorites();

    // fetch per-user made counts
    fetchMade();
  }, [id]);

  useEffect(() => {
    if (!recipe) return;
    const madeRecord = madeRecipes.find(
      (r) => Number(r.recipe_id) === Number(recipe.id)
    );
    const count = madeRecord?.count ?? 0;
    setMadeCount(count);
    setHasMade(count > 0);
  }, [recipe, madeRecipes]);

  if (!recipe) return <Typography>Loading...</Typography>;

  const favoriteActive = isFavorited(recipe.id);

  const handleLogMade = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    const prevCount = Number(madeCount) || 0;
    const newCount = prevCount + 1;

    setMadeCount(newCount);
    setHasMade(true);

    // snackbar message
    setSnackbarMessage(
      `You’ve made this ${newCount} ${newCount === 1 ? "time" : "times"}!`
    );
    setSnackbarOpen(true);

    try {
      const logged = await logMade(recipe.id);
      if (!logged) {
        // rollback if save failed
        setMadeCount(prevCount);
        if (prevCount === 0) setHasMade(false);
        setSnackbarMessage("Failed to log. Try again.");
      }
    } catch (error) {
      console.error("Error logging made recipe:", error);
      setMadeCount(prevCount);
      if (prevCount === 0) setHasMade(false);
      setSnackbarMessage("Error saving. Try again.");
    } finally {
      setTimeout(() => setIsSubmitting(false), 5000);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  return (
    <Box sx={{ pb: 6 }}>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        {/* Recipe image */}
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

        {/* Title + Actions */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", md: "center" },
            mb: 2,
          }}
        >
          {/* Left column */}
          <Box
            sx={{ maxWidth: { xs: "100%", md: "70%" }, mb: { xs: 2, md: 0 } }}
          >
            <Typography
              variant="h4"
              fontWeight={700}
              sx={{ lineHeight: 1.2, mb: 1 }}
            >
              {recipe.title}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 0.5, pt: 1 }}
            >
              Submitted by: {recipe.username}
            </Typography>

            {recipe.source_url && (
              <Typography variant="body2" color="text.secondary">
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
          </Box>

          {/* Right column */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: { xs: "flex-start", md: "flex-end" },
              justifyContent: { xs: "flex-start", md: "center" },
              gap: 1,
            }}
          >
            {/* Icons */}
            <Stack direction="row" spacing={1}>
              {user && (
                <IconButton
                  onClick={() => toggleFavorite(recipe.id)}
                  sx={{ color: favoriteActive ? "red" : "gray" }}
                >
                  {favoriteActive ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>
              )}

              {canEdit && (
                <>
                  <IconButton onClick={() => navigate(`/recipes/edit/${id}`)}>
                    <EditIcon fontSize="small" />
                  </IconButton>
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

            {/* "I Made This" button */}
            {/* todo - button color, maybe even theme update? */}
            {user && (
              <Button
                variant={hasMade ? "contained" : "outlined"}
                color="secondary"
                onClick={handleLogMade}
              >
                {hasMade ? `Made it (${madeCount})` : "I Made This"}
              </Button>
            )}
          </Box>
        </Box>

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
        {/* todo - maybe limit the width of the paragraph? */}
        <Typography variant="h5" fontWeight={600} sx={{ mt: 4, mb: 1.5 }}>
          Instructions
        </Typography>
        <Box sx={{ mb: 4 }}>{parse(recipe.instructions)}</Box>
        {/* Snackbar */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={() => setSnackbarOpen(false)}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={() => setSnackbarOpen(false)}
            severity="success"
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
}
