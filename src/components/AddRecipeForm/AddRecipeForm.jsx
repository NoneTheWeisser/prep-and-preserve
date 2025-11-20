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
import InstructionTextEditor from "./InstructionTextEditor";
import IngredientTextEditor from "./IngredientTextEditor";

export default function AddRecipeForm() {
  const [instructions, setInstructions] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [isPublic, setIsPublic] = useState(true);
  const navigate = useNavigate();

  // console.log(selectedTags);

  const showSnackbar = useStore((state) => state.showSnackbar);
  const tags = useStore((state) => state.tags);
  const fetchTags = useStore((state) => state.fetchTags);
  const addRecipe = useStore((state) => state.addRecipe);

  useEffect(() => {
    fetchTags();
  }, [fetchTags]);

  // Render checkboxes
  const handleTagChange = (tag) => {
    setSelectedTags((prev) =>
      prev.find((t) => t.id === Number(tag.id))
        ? prev.filter((t) => t.id !== tag.id)
        : [...prev, tag]
    );
  };

  // cloudinary
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

  // Form submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    const safeInstructions = DOMPurify.sanitize(instructions);
    const safeIngredients = DOMPurify.sanitize(ingredients);

    const recipeData = {
      title,
      description,
      ingredients: safeIngredients,
      instructions: safeInstructions,
      image_url: imageUrl,
      is_public: isPublic,
      source_url: sourceUrl,
      tags: selectedTags,
    };

    console.log("Submitting recipe:", recipeData);
    try {
      const newRecipe = await addRecipe(recipeData);
      showSnackbar({
        message: "Recipe successfully added!",
        severity: "success",
      });
      if (newRecipe?.id) {
        navigate(`/recipes/${newRecipe.id}`);
      } else {
        navigate("/myrecipes");
      }
      // reset the form
      setTitle("");
      setDescription("");
      setIngredients("");
      setInstructions("");
      setImageUrl("");
      setSourceUrl("");
      setIsPublic(true);
      setSelectedTags([]);
    } catch (error) {
      console.error("Error submitting recipe:", error);

      showSnackbar({
        message: "Error adding recipe.",
        severity: "error",
      });
    }
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
            // error={!title}
            // helperText={!title ? "Title is required" : ""}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <TextField
            label="Short Description"
            variant="outlined"
            fullWidth
            required
            // error={!description}
            // helperText={!description ? "Description is required" : ""}
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
          {/* TODO - make required or add fallback image */}
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
              checked={!isPublic}
              onChange={() => setIsPublic(!isPublic)}
              color="primary"
            />
          </Box>

          <Button type="submit" variant="contained" size="large">
            Save Recipe
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
