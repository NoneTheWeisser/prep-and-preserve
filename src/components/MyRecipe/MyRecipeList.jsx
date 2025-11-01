import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../../zustand/store";

export default function MyRecipeList() {
  const userRecipes = useStore((state) => state.userRecipes);
  const fetchUserRecipes = useStore((state) => state.fetchUserRecipes);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserRecipes();
  }, [fetchUserRecipes]);

  return (
     <div>
      <h2>My Recipes</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {userRecipes.map((recipe) => (
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
        ))}
      </div>
    </div>
  );
}