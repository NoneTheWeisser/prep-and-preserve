// import("../AddRecipeForm/AddRecipeForm.css");
import React, { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Switch,
  TextField,
  Typography,
  Paper,
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
  const showSnackbar = useStore((state) => state.showSnackbar);

  const [instructions, setInstructions] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [isPublic, setIsPublic] = useState(true);

  // fetch by id instead and get tags
  useEffect(() => {
    // Run both fetches in parallel so one doesn’t block the other
    fetchTags();

    const getRecipe = async () => {
      try {
        const response = await axios.get(`/api/recipes/${id}`, {
          withCredentials: true,
        });
        const recipe = response.data;

        setTitle(recipe.title);
        setDescription(recipe.description);
        setIngredients(recipe.ingredients);
        setInstructions(recipe.instructions);
        setImageUrl(recipe.image_url);
        setSourceUrl(recipe.source_url);
        setIsPublic(recipe.is_public);
        setSelectedTags(recipe.tags || []);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };

    getRecipe();
  }, [id, fetchTags]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const safeInstructions = DOMPurify.sanitize(instructions);
    const safeIngredients = DOMPurify.sanitize(ingredients);

    const updatedRecipe = {
      title,
      description,
      instructions: safeInstructions,
      ingredients: safeIngredients,
      image_url: imageUrl,
      is_public: isPublic,
      source_url: sourceUrl,
      tags: selectedTags,
    };

    try {
      await updateRecipe(id, updatedRecipe);
      await fetchUserRecipes();
      showSnackbar({
        message: "Recipe successfully updated!",
        severity: "success",
      });
      navigate(`/recipes/${id}`);
  } catch (error) {
    console.error("Error submitting recipe:", error);

    showSnackbar({
      message: "Error updating recipe.",
      severity: "error",
    });
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
          Edit Your Recipe
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
    </Container>
  );
}
