import React, { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import useStore from "../../../zustand/store";
import { Typography } from "@mui/material";
import RecipeGrid from "../RecipeGrid";

function filterRecipes(recipes = [], searchTerm = "", tagIds = []) {
  let filteredList = recipes;
  if (searchTerm) {
    const searchLower = searchTerm.toLowerCase();
    filteredList = filteredList.filter((recipe) =>
      recipe.title?.toLowerCase().includes(searchLower)
    );
  }

  if (tagIds.length > 0) {
    filteredList = filteredList.filter((recipe) =>
      tagIds.every((tagId) =>
        (recipe.tags || []).map((tag) => tag.id).includes(tagId)
      )
    );
  }
  return filteredList;
}

export default function MyRecipesTab() {
  const { searchTerm, selectedTagIds } = useOutletContext();
  const favorites = useStore((state) => state.favorites);
  const fetchFavorites = useStore((state) => state.fetchFavorites);
  const toggleFavorite = useStore((state) => state.toggleFavorite);

  // Use recipeSlice state and actions
  const userRecipes = useStore((state) => state.userRecipes);
  const fetchUserRecipes = useStore((state) => state.fetchUserRecipes);

  // Fetch the user's recipes on mount
  useEffect(() => {
    fetchUserRecipes();
  }, [fetchUserRecipes]);

  const filtered = filterRecipes(userRecipes, searchTerm, selectedTagIds);

  if (!filtered || filtered.length === 0) {
    return <Typography sx={{ mt: 4 }}>No recipes found.</Typography>;
  }

  return (
    <RecipeGrid
      recipes={filtered}
      favorites={favorites}
      toggleFavorite={toggleFavorite}
    />
  );
}
