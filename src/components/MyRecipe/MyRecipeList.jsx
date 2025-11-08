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
  Button,
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
      <Box sx={{ mb: 0 }}>
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
        // todo: I like 6 col for laptop screen, 7 looks nice for bigger screens... need to adjust still
        <ImageList cols={6} gap={16} sx={{ marginTop: 2 }}>
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
