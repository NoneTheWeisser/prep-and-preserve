import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useStore from "../../zustand/store";
import parse from "html-react-parser";

export default function FullRecipeView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const fetchRecipeById = useStore((state) => state.fetchRecipeById);
  const deleteRecipe = useStore((state) => state.deleteRecipe);
  const [recipe, setRecipe] = useState(null);
  const user = useStore((state) => state.user);

  // TODO look into why admin isn't working properly
  const canEdit = user && recipe && recipe.user_id === user.id;

  const getRecipe = async () => {
    try {
      const data = await fetchRecipeById(id);
      setRecipe(data);
    } catch (error) {
      console.error("Error fetching recipe:", error);
    }
  };

  useEffect(() => {
    getRecipe();
  }, [id]);


  if (!recipe) return <p>Loading...</p>;

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto", padding: "1rem" }}>
      <h1>{recipe.title}</h1>
      <p>Submitted by: {recipe.username}</p>
      {recipe.image_url && (
        <img
          src={recipe.image_url}
          alt={recipe.title}
          style={{ width: "100%", borderRadius: "8px", marginBottom: "1rem" }}
        />
      )}
      {recipe.description && <p>{recipe.description}</p>}
      {/* check for owner, otherwise why even show the buttons */}
      {canEdit && (
        <div className="actions">
          <button onClick={() => navigate(`/recipes/edit/${id}`)}>Edit</button>
          <button
            onClick={async () => {
              const confirmDelete = window.confirm(
                "Are you sure you want to delete this recipe?"
              );
              if (!confirmDelete) return;
              try {
                await deleteRecipe(id);
                // snackbar later on?
                alert("Recipe deleted successfully");
                navigate("/myrecipes");
              } catch (error) {
                alert("Error deleting recipe. Please try again.");
                console.error("Deleting failed:", error);
              }
            }}
          >
            Delete
          </button>
        </div>
      )}
      <h3>Ingredients</h3>
      <div>{parse(recipe.ingredients)}</div>

      <h3>Instructions</h3>
      <div>{parse(recipe.instructions)}</div>
      {recipe.source_url && (
        <p>
          Original Recipe Source:{" "}
          <a href={recipe.source_url} target="_blank" rel="noopener noreferrer">
            View Recipe
          </a>
        </p>
      )}
    </div>
  );
}
