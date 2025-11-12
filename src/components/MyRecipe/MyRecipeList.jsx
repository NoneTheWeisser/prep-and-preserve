import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../../zustand/store";
import RecipeFilterBar from "../RecipeFilterBar/RecipeFilterBar";
import RecipeCard from "../RecipeFilterBar/RecipeCard";
import {
  Typography,
  Stack,
  Button,
  Grid,
  Container,
  Box,
  Switch,
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
  const fetchRecipes = useStore((state) => state.fetchRecipes);
  const recipes = useStore((state) => state.recipes);
  const toggleFavorite = useStore((state) => state.toggleFavorite);

  // Filter & Search
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [selectedTagIds, setSelectedTagIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFavorites, setShowFavorites] = useState(false);

  const selectedTags = tags.filter((tag) => selectedTagIds.includes(tag.id));

  useEffect(() => {
    fetchUserRecipes();
    fetchFavorites();
    fetchRecipes();
  }, [fetchUserRecipes, fetchFavorites]);

  //  Compute combined recipes without duplicates
  const combinedRecipes = [
    ...userRecipes,
    ...favorites
      .map((fav) => {
        return recipes.find((r) => r.id === fav.id) || fav;
      })
      .filter((r) => !userRecipes.some((ur) => ur.id === r.id)),
  ];

  //  Apply filters (search and tags) whenever combinedRecipes or filters change
  useEffect(() => {
    let recipesToFilter = showFavorites ? combinedRecipes : userRecipes;

    if (searchTerm) {
      recipesToFilter = recipesToFilter.filter((r) =>
        r.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedTagIds.length > 0) {
      recipesToFilter = recipesToFilter.filter((r) =>
        selectedTagIds.every((id) => r.tags?.map((t) => t.id).includes(id))
      );
    }

    setFilteredRecipes(recipesToFilter);
  }, [userRecipes, favorites, searchTerm, selectedTagIds, showFavorites]);
  // only show the tags that have been assigned
  const usedTags = tags.filter((tag) =>
    (showFavorites ? combinedRecipes : userRecipes).some((r) =>
      r.tags?.some((t) => t.id === tag.id)
    )
  );

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Stack spacing={2} sx={{ mb: 4 }}>
        <RecipeFilterBar
          tags={usedTags}
          onFilterChange={({ searchTerm, selectedTagIds }) => {
            setSearchTerm(searchTerm);
            setSelectedTagIds(selectedTagIds);
          }}
        />
        {/* Toggle Button */}
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
            maxWidth: "50%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2, 
            }}
          >
            <Typography variant="subtitle1" fontWeight={500}>
              Recipe View
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {showFavorites
                ? "Showing Favorites & My Recipes"
                : "Showing My Recipes Only"}
            </Typography>
          </Box>

          <Switch
            checked={showFavorites}
            onChange={(e) => setShowFavorites(e.target.checked)}
            color="primary"
          />
        </Box>

        {/* <Button
          variant="contained"
          color="primary"
          onClick={() => setShowFavorites((prev) => !prev)}
          fullWidth
        >
          {showFavorites
            ? "Show My Recipes Only"
            : "Show Favorites & My Recipes"}
        </Button> */}
      </Stack>

      {filteredRecipes.length === 0 ? (
        <Typography>No Recipes Found.</Typography>
      ) : (
        // todo - play around with this container. is it the best way?
        <Grid container spacing={2} justifyContent="center">
          {filteredRecipes.map((recipe) => (
            <Grid key={recipe.id} span={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}>
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
