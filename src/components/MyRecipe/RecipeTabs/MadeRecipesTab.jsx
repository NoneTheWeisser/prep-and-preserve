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

export default function MadeRecipesTab() {
  const { searchTerm, selectedTagIds } = useOutletContext();
  const madeRecipes = useStore((state) => state.madeRecipes);
  const fetchMade = useStore((state) => state.fetchMade);
  const favorites = useStore((state) => state.favorites);
  const toggleFavorite = useStore((state) => state.toggleFavorite);

  useEffect(() => {
    fetchMade();
  }, [fetchMade]);

  const filtered = filterRecipes(madeRecipes, searchTerm, selectedTagIds);

  if (!filtered || filtered.length === 0) {
    return <Typography sx={{ mt: 4 }}>No made recipes found.</Typography>;
  }

  return (
    <RecipeGrid
      recipes={filtered}
      favorites={favorites}
      toggleFavorite={toggleFavorite}
    />
  );
}
