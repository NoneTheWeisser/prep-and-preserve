import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../../zustand/store";
import RecipeFilterBar from "../RecipeFilterBar/RecipeFilterBar";
import RecipeCard from "../RecipeFilterBar/RecipeCard";

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
  Button,
  Grid,
  Container,
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
  const [searchTerm, setSearchTerm] = useState("");
  const [showFavorites, setShowFavorites] = useState(false);

  const selectedTags = tags.filter((tag) => selectedTagIds.includes(tag.id));

  useEffect(() => {
    fetchUserRecipes();
    fetchFavorites();
  }, [fetchUserRecipes, fetchFavorites]);

  //  Compute combined recipes without duplicates
  const combinedRecipes = [
    ...userRecipes,
    ...favorites.filter((fav) => !userRecipes.some((r) => r.id === fav.id)),
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
    <Box sx={{ p: 2 }}>
      <RecipeFilterBar
        tags={usedTags}
        onFilterChange={({ searchTerm, selectedTagIds }) => {
          setSearchTerm(searchTerm);
          setSelectedTagIds(selectedTagIds);
        }}
      />
      {/* Toggle Button */}
      <Box sx={{ mb: 2 }}>
        {" "}
        <Button
          variant="contained"
          color="primary"
          onClick={() => setShowFavorites((prev) => !prev)}
          fullWidth
        >
          {showFavorites
            ? "Show My Recipes Only"
            : "Show Favorites & My Recipes"}
        </Button>
      </Box>

      {filteredRecipes.length === 0 ? (
        <Typography>No Recipes Found.</Typography>
      ) : (
        // todo - play around with this container. is it the best way?
        <Container
          maxWidth="xl"
          sx={{ display: "flex", justifyContent: "center", mt: 4 }}
        >
          <Grid container spacing={2}>
            {filteredRecipes.map((recipe) => (
              <Grid item xs={10} sm={6} md={4} lg={3} xl={2} key={recipe.id}>
                <Box sx={{ maxWidth: 250, mx: "auto" }}>
                  <RecipeCard
                    recipe={recipe}
                    favorites={favorites}
                    toggleFavorite={toggleFavorite}
                    onClick={() => navigate(`/recipes/${recipe.id}`)}
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      )}
    </Box>
  );
}
