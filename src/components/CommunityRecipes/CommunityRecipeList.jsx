import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../../zustand/store";
import RecipeFilterBar from "../RecipeFilterBar/RecipeFilterBar";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Chip,
  Stack,
  CardActionArea,
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
    <Box sx={{ p: 4 }}>
      <RecipeFilterBar tags={usedTags} onFilterChange={handleFilterChange} />

      {/* Recipe Grid */}
      {/* todo: are we going to use the mui grid or keep it like we have it? */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          marginTop: "20px",
        }}
      >
        {filteredRecipes.length === 0 ? (
          <p>No Recipes Found.</p>
        ) : (
          filteredRecipes.map((recipe) => (
            <div
              key={recipe.id}
              style={{
                width: "200px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                overflow: "hidden",
                position: "relative",
                cursor: "pointer",
              }}
              onClick={() => navigate(`/recipes/${recipe.id}`)}
            >
              {/* Favorite Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(recipe.id);
                }}
                style={{
                  position: "absolute",
                  bottom: "4px",
                  right: "4px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {favorites.some((fav) => fav.id === recipe.id) ? (
                  <FavoriteIcon style={{ color: "red" }} />
                ) : (
                  <FavoriteBorderIcon style={{ color: "#777" }} />
                )}
              </button>

              {recipe.image_url ? (
                <img
                  src={recipe.image_url}
                  alt={recipe.title}
                  style={{ width: "100%", height: "150px", objectFit: "cover" }}
                />
              ) : (
                <div
                  style={{
                    width: "100%",
                    height: "150px",
                    backgroundColor: "#eee",
                  }}
                />
              )}
              <div style={{ padding: "0.5rem" }}>
                <h4 style={{ margin: "0.5rem 0" }}>{recipe.title}</h4>
                <p style={{ margin: 0 }}>
                  {/* Stretch: how do I bring in all users?*/}
                  {/* <img src={user.profile_image_url} alt="author" style={{ width: 24, height: 24, objectFit: "cover", borderRadius: '50%' }} />  */}
                  by {recipe.username}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </Box>
  );
}
