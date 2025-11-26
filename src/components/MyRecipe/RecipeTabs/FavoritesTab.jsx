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

export default function FavoritesTab() {
  const { searchTerm, selectedTagIds } = useOutletContext();
  const favorites = useStore((state) => state.favorites);
  const fetchFavorites = useStore((state) => state.fetchFavorites);
  const toggleFavorite = useStore((state) => state.toggleFavorite);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  const filtered = filterRecipes(favorites, searchTerm, selectedTagIds);

  if (!filtered || filtered.length === 0) {
    return <Typography sx={{ mt: 4 }}>No favorites found.</Typography>;
  }

  return (
    <RecipeGrid
      recipes={filtered}
      favorites={favorites}
      toggleFavorite={toggleFavorite}
    />
  );
}
