import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../../zustand/store";
import RecipeFilterBar from "../RecipeFilterBar/RecipeFilterBar";
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

export default function MyRecipeList() {
  const userRecipes = useStore((state) => state.userRecipes);
  const fetchUserRecipes = useStore((state) => state.fetchUserRecipes);
  const navigate = useNavigate();
  const user = useStore((state) => state.user);
  const tags = useStore((state) => state.tags);

  // Filter & Search
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [selectedTagIds, setSelectedTagIds] = useState([]);

  const selectedTags = tags.filter((tag) => selectedTagIds.includes(tag.id));

  useEffect(() => {
    fetchUserRecipes();
  }, [fetchUserRecipes]);

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
  userRecipes.some((recipe) =>
    recipe.tags?.some((rt) => rt.id === tag.id)
  )
);

  return (
    <div>
      <RecipeFilterBar tags ={usedTags} onFilterChange={handleFilterChange} recipes={userRecipes}/>
      {/* display selected tags */}
      {selectedTags.length > 0 && (
        <div className="selected-tags">
          <p>Filtering by:</p>
          {selectedTags.map((tag) => (
            <span
              key={tag.id}
              className="selected-tag"
              // TODO: be nice to remove them with a click in this section
              // onClick={() => handleTagChange(tag.id)}
            >
              {tag.name}{" "}
            </span>
          ))}
        </div>
      )}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
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
                cursor: "pointer",
              }}
              onClick={() => navigate(`/recipes/${recipe.id}`)}
            >
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
                  by {recipe.username}
                  {/* Stretch: <img src={recipe.profile_image_url} alt="author" style={{ width: 24, height: 24, borderRadius: '50%' }} /> */}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

{
  /* {userRecipes.map((recipe) => (
          <div
            key={recipe.id}
            style={{
              width: "200px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              overflow: "hidden",
              cursor: "pointer",
            }}
            onClick={() => navigate(`/recipes/${recipe.id}`)}
          ></div> */
}
