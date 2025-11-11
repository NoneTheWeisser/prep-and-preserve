import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../../zustand/store";
import RecipeFilterBar from "../RecipeFilterBar/RecipeFilterBar";
import RecipeCard from "../RecipeFilterBar/RecipeCard";
import { Container, Grid } from "@mui/material";

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
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <RecipeFilterBar tags={usedTags} onFilterChange={handleFilterChange} />

      {filteredRecipes.length === 0 ? (
        <p>No Recipes Found.</p>
      ) : (
        
        <Grid container spacing={2} sx={{ mt: 2, justifyContent: "center" }}>         
          {filteredRecipes.map((recipe) => (
            <Grid
              key={recipe.id}
              span={{ xs: 6, sm: 6, md: 4, lg: 3, xl: 2 }}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <RecipeCard
                recipe={recipe}
                favorites={favorites}
                toggleFavorite={toggleFavorite}
                onClick={() => navigate(`/recipes/${recipe.id}`)}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
