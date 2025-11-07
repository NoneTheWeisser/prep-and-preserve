import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../../zustand/store";
import RecipeFilterBar from "../RecipeFilterBar/RecipeFilterBar";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {
  Box,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  IconButton,
  Typography,
  Stack,
} from "@mui/material";

export default function MyRecipeList() {
  const userRecipes = useStore((state) => state.userRecipes);
  const fetchUserRecipes = useStore((state) => state.fetchUserRecipes);
  const navigate = useNavigate();
  const user = useStore((state) => state.user);
  const tags = useStore((state) => state.tags);

  // // Favorites
  const fetchFavorites = useStore((state) => state.fetchFavorites);
  const favorites = useStore((state) => state.favorites);
  const toggleFavorite = useStore((state) => state.toggleFavorite);

  // Filter & Search
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [selectedTagIds, setSelectedTagIds] = useState([]);

  const selectedTags = tags.filter((tag) => selectedTagIds.includes(tag.id));

  useEffect(() => {
    fetchUserRecipes();
    fetchFavorites();
  }, [fetchUserRecipes, fetchFavorites]);

  useEffect(() => {
    setFilteredRecipes(userRecipes);
  }, [userRecipes]);

  const handleFilterChange = ({ searchTerm, selectedTagIds }) => {
    setSelectedTagIds(selectedTagIds);
    let filtered = userRecipes;

    if (searchTerm) {
      filtered = filtered.filter((recipe) =>
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // filter by many tags
    if (selectedTagIds && selectedTagIds.length > 0) {
      filtered = filtered.filter((recipe) => {
        const recipeTagIds = recipe.tags?.map((tag) => tag.id) || [];
        return selectedTagIds.every((id) => recipeTagIds.includes(id));
      });
    }

    setFilteredRecipes(filtered);
  };

  // only show the tags that have been assigned to a recipe.
  const usedTags = tags.filter((tag) =>
    userRecipes.some((recipe) => recipe.tags?.some((rt) => rt.id === tag.id))
  );

  return (
    <Box sx={{ p: 2 }}>
      <RecipeFilterBar
        tags={usedTags}
        onFilterChange={handleFilterChange}
        recipes={userRecipes}
      />

      {selectedTags.length > 0 && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2">Filtering by:</Typography>
          <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", mt: 1 }}>
            {selectedTags.map((tag) => (
              <Box
                key={tag.id}
                sx={{ bgcolor: "#eee", px: 1, py: 0.5, borderRadius: 1 }}
              >
                {tag.name}
              </Box>
            ))}
          </Stack>
        </Box>
      )}

      {filteredRecipes.length === 0 ? (
        <Typography>No Recipes Found.</Typography>
      ) : (
        <ImageList cols={7} gap={16} sx={{ marginTop: 2 }}>
          {filteredRecipes.map((recipe) => (
            <ImageListItem
              key={recipe.id}
              sx={{ cursor: "pointer" }}
              onClick={() => navigate(`/recipes/${recipe.id}`)}
            >
              {recipe.image_url ? (
                <img
                  src={recipe.image_url}
                  alt={recipe.title}
                  loading="lazy"
                  style={{ objectFit: "cover", width: "100%", height: 250 }}
                />
              ) : (
                <div
                  style={{
                    width: "100%",
                    height: 200,
                    backgroundColor: "#eee",
                  }}
                />
              )}

              <ImageListItemBar
                title={
                  <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                    {recipe.title}
                  </Typography>
                }
                subtitle={
                  <Stack direction="row" spacing={1} alignItems="center">
                    {recipe.profile_image_url && (
                      <Avatar
                        src={recipe.profile_image_url}
                        alt={recipe.username}
                        sx={{ width: 24, height: 24 }}
                      />
                    )}
                    <Typography variant="body2" color="inherit">
                      {recipe.username}
                    </Typography>
                  </Stack>
                }
                actionIcon={
                  <IconButton
                    sx={{ color: "rgba(255, 255, 255, 0.8)" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(recipe.id);
                    }}
                  >
                    {favorites.some((fav) => fav.id === recipe.id) ? (
                      <FavoriteIcon sx={{ color: "white" }} />
                    ) : (
                      <FavoriteBorderIcon sx={{ color: "#fff" }} />
                    )}
                  </IconButton>
                }
              />
            </ImageListItem>
          ))}
        </ImageList>
      )}
    </Box>
  );
}
