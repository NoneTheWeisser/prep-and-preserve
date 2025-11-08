import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useStore from "../../zustand/store";
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
  }, [id]);

  if (!recipe) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ pb: 6 }}>
      {/* Hero Image */}
      {recipe.image_url && (
        <Box
          sx={{
            width: "100%",
            height: { xs: 250, md: 500 },
            backgroundImage: `url(${recipe.image_url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: 0,
          }}
        />
      )}

      <Container maxWidth="md" sx={{ mt: 3 }}>
        {/* Title + Actions */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Typography variant="h4" fontWeight={600}>
            {recipe.title}
          </Typography>
          {/* check for owner, otherwise why even show the buttons */}
          {canEdit && (
            <Stack direction="row" spacing={1}>
              <IconButton onClick={() => navigate(`/recipes/edit/${id}`)}>
                <EditIcon />
              </IconButton>

              <IconButton
                onClick={async () => {
                  if (!window.confirm("Delete this recipe?")) return;
                  try {
                    await deleteRecipe(id);
                    // snackbar later on?
                    navigate("/myrecipes");
                  } catch (error) {
                    console.error("Error deleting:", error);
                  }
                }}
              >
                <DeleteIcon />
              </IconButton>
              <IconButton onClick={() => window.print()}>
                <PrintIcon />
              </IconButton>
            </Stack>
          )}
        </Box>
        <Typography variant="body2" sx={{ mt: 1, color: "text.secondary" }}>
          Submitted By: {recipe.username}
        </Typography>

        {recipe.source_url && (
          <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
            Original Recipe Source:{" "}
            <a
              href={recipe.source_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Recipe
            </a>
          </Typography>
        )}

        <Divider sx={{ my: 3 }} />

        {/* Description */}
        {recipe.description && (
          <>
            <Typography variant="h5" fontWeight={600}>
              Description
            </Typography>
            <Typography sx={{ mt: 1, mb: 3 }}>{recipe.description}</Typography>
          </>
        )}

        {/* Ingredients */}
        <Typography variant="h5" fontWeight={600}>
          Ingredients
        </Typography>
        <Box sx={{ mt: 1, mb: 3 }}>{parse(recipe.ingredients)}</Box>

        {/* Instructions */}
        <Typography variant="h5" fontWeight={600}>
          Instructions
        </Typography>
        <Box sx={{ mt: 1 }}>{parse(recipe.instructions)}</Box>
      </Container>
    </Box>
  );
}
