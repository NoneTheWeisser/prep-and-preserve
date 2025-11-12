// import("../AddRecipeForm/AddRecipeForm.css");
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormGroup,
  FormLabel,
  FormControlLabel,
  Switch,
  TextField,
  Typography,
  Checkbox,
  Paper,
  Snackbar,
  Alert,
  Grid,
  Chip,
} from "@mui/material";
import useStore from "../../zustand/store";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import InstructionTextEditor from "./InstructionTextEditor";
import { useParams } from "react-router-dom";
import IngredientTextEditor from "./IngredientTextEditor";

export default function EditRecipeForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const fetchUserRecipes = useStore((state) => state.fetchUserRecipes);
  const fetchRecipes = useStore((state) => state.fetchRecipes);
  const fetchTags = useStore((state) => state.fetchTags);

  const tags = useStore((state) => state.tags);
  // const userRecipes = useStore((state) => state.userRecipes);
  const recipes = useStore((state) => state.recipes);
  const updateRecipe = useStore((state) => state.updateRecipe);

  const [instructions, setInstructions] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [isPublic, setIsPublic] = useState(true);
  // const [snackbarOpen, setSnackbarOpen] = useState(false);

  // The reason we use a useEffect is so that we can
  // populate the local state after zustand updates
  useEffect(() => {
    // Make sure the recipes, tags, etc are loaded
    fetchRecipes();
    fetchTags();
  }, []);

  useEffect(() => {
    const thisRecipe = recipes.find((recipe) => recipe.id === Number(id));
    console.log(thisRecipe);

    if (thisRecipe) {
      setTitle(thisRecipe.title || "");
      setDescription(thisRecipe.description || "");
      setImageUrl(thisRecipe.image_url || "");
      setIngredients(thisRecipe.ingredients || "");
      setInstructions(thisRecipe.instructions || "");
      setIsPublic(thisRecipe.is_public ?? true);
      setSourceUrl(thisRecipe.source_url || "");
      setSelectedTags(thisRecipe.tags || []);
    }
    // }, []);
  }, [recipes, tags]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const updatedRecipe = {
      title,
      description,
      instructions,
      ingredients,
      image_url: imageUrl,
      is_public: isPublic,
      source_url: sourceUrl,
      tags: selectedTags,
    };

    try {
      await updateRecipe(id, updatedRecipe);
      await fetchUserRecipes();
      navigate(`/recipes/${id}`);
    } catch (error) {
      console.error("Error updating recipe:", error);
    }
  };

  // Render checkboxes
  const handleTagChange = (tag) => {
    setSelectedTags((prev) =>
      prev.find((t) => t.id === Number(tag.id))
        ? prev.filter((t) => t.id !== Number(tag.id))
        : [...prev, tag]
    );
  };

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
          setImageUrl(result.info.secure_url);
        }
      }
    );
    widget.open();
  };

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Add a New Recipe
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <TextField
            label="Recipe Title"
            variant="outlined"
            fullWidth
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <TextField
            label="Short Description"
            variant="outlined"
            fullWidth
            required
            multiline
            minRows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <TextField
            label="Source URL (optional)"
            variant="outlined"
            fullWidth
            value={sourceUrl}
            onChange={(e) => setSourceUrl(e.target.value)}
          />

          {/* TAGS */}
          <FormControl component="fieldset" sx={{ mt: 2 }}>
            <FormLabel component="legend">Tags</FormLabel>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Select all that apply:
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 1,
                p: 1,
                border: "1px solid #ddd",
                borderRadius: 2,
                backgroundColor: "#fafafa",
              }}
            >
              {tags.map((tag) => {
                const selected = selectedTags.some((t) => t.id === tag.id);
                return (
                  <Chip
                    key={tag.id}
                    label={tag.name}
                    variant={selected ? "filled" : "outlined"}
                    color={selected ? "primary" : "default"}
                    onClick={() => handleTagChange(tag)}
                    size="small"
                    sx={{ fontSize: "0.8rem" }}
                  />
                );
              })}
            </Box>
          </FormControl>

          <Box>
            <Typography variant="h6">Ingredients</Typography>
            <IngredientTextEditor
              value={ingredients}
              onChange={setIngredients}
            />
          </Box>

          <Box>
            <Typography variant="h6">Instructions</Typography>
            <InstructionTextEditor
              value={instructions}
              onChange={setInstructions}
            />
          </Box>

          {/* IMAGE UPLOAD */}
          <Box textAlign="center">
            <Button variant="outlined" onClick={openCloudinaryWidget}>
              Upload Image
            </Button>
            <Box mt={2}>
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="Uploaded recipe"
                  width={200}
                  style={{ borderRadius: 8 }}
                />
              ) : (
                <Box
                  sx={{
                    width: 200,
                    height: 200,
                    bgcolor: "#f0f0f0",
                    borderRadius: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "text.secondary",
                    mx: "auto",
                  }}
                >
                  No image uploaded
                </Box>
              )}
            </Box>
          </Box>

          {/* TOGGLE */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mt: 3,
              p: 2,
              border: "1px solid #e0e0e0",
              borderRadius: 2,
              backgroundColor: "#f9f9f9",
            }}
          >
            <Box>
              <Typography variant="subtitle1" fontWeight={500}>
                Privacy Setting
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {isPublic ? "Visible to everyone" : "Only visible to you"}
              </Typography>
            </Box>
            <Switch
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
              color="primary"
            />
          </Box>

          <Button type="submit" variant="contained" size="large">
            Update Recipe
          </Button>
        </Box>
      </Paper>

      {/* Snackbar */}
      {/* <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Recipe successfully updated!
        </Alert>
      </Snackbar> */}
    </Container>
  );
}
