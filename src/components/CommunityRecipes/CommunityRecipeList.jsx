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
} from "@mui/material";

export default function CommunityRecipeList() {
  const fetchRecipes = useStore((state) => state.fetchRecipes);
  const recipes = useStore((state) => state.recipes);
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

  useEffect(() => {
    fetchRecipes();
    fetchFavorites();
  }, [fetchRecipes, fetchFavorites]);

  useEffect(() => {
    setFilteredRecipes(recipes);
  }, [recipes]);

  const handleFilterChange = ({ searchTerm, selectedTagIds }) => {
    setSelectedTagIds(selectedTagIds);

    let filtered = recipes;

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
    recipes.some((recipe) => recipe.tags?.some((rt) => rt.id === tag.id))
  );

  return (
    <Box sx={{ p: 4, textAlign: "left" }}>
      <RecipeFilterBar tags={usedTags} onFilterChange={handleFilterChange} />

      {filteredRecipes.length === 0 ? (
        <p>No Recipes Found.</p>
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
                title={recipe.title}
                subtitle={`by ${recipe.username}`}
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
