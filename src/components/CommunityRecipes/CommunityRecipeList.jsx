import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../../zustand/store";

export default function CommunityRecipeList() {
  const fetchRecipes = useStore((state) => state.fetchRecipes);
  const recipes = useStore((state) => state.recipes);
  const navigate = useNavigate();
  const user = useStore((state) => state.user);

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  return (
     <div> 
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginTop: "20px"  }}>
        {recipes.map((recipe) => (
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
                {/* Stretch: how do I bring in all users?*/}
                {/* <img src={user.profile_image_url} alt="author" style={{ width: 24, height: 24, objectFit: "cover", borderRadius: '50%' }} />  */}
                by {recipe.username}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}