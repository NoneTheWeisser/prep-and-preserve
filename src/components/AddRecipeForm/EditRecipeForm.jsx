import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useStore from "../../zustand/store";
import tagSlice from "../../zustand/slices/tag.slice";
import InstructionTextEditor from "./InstructionTextEditor";
import IngredientTextEditor from "./IngredientTextEditor";
import axios from "axios";

export default function EditRecipeForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const fetchUserRecipes = useStore((state) => state.fetchUserRecipes);
  const fetchTags = useStore((state) => state.fetchTags);

  const tags = useStore((state) => state.tags);
  const userRecipes = useStore((state) => state.userRecipes);

  const [instructions, setInstructions] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [isPublic, setIsPublic] = useState(true);
  
  // The reason we use a useEffect is so that we can
  // populate the local state after zustand updates
  useEffect(() => {
    // Make sure the recipes, tags, etc are loaded
    fetchUserRecipes();
    fetchTags();
  }, []);
  
  useEffect(() => {
    // After zustand is ready, grab the recipe and populate
    // the local state
    // console.log(`recipes`, recipes);
    // console.log(`Editing recipe with id ${id}`, recipes.find(r => r.id === Number(id)));

    const thisRecipe = userRecipes.find(recipe => recipe.id === Number(id));
    console.log(thisRecipe);

    if (thisRecipe) {
      setTitle(thisRecipe.title);
      setDescription(thisRecipe.description);
      setImageUrl(thisRecipe.image_url);
      setIngredients(thisRecipe.ingredients);
      setInstructions(thisRecipe.instructions);
      setIsPublic(thisRecipe.is_public);
      setSourceUrl(thisRecipe.source_url);
      setSelectedTags(thisRecipe.tags);
    }
  }, [userRecipes, tags]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const updatedRecipe = {
        title,
        description,
        instructions,
        ingredients,
        image_url: imageUrl,
        is_public: isPublic,
        source_url: sourceUrl,
        tags: selectedTags,
    }
    try {
        await axios.put(`/api/recipes/${id}`, updatedRecipe);
        navigate(`/recipes/${id}`);
    } catch (error) {
        console.error("Error updating recipe:", error);
    }
  };

  // Render checkboxes
  const handleTagChange = (tag) => {
    setSelectedTags((prev) =>
      prev.find(t => t.id === Number(tag.id))
        ? prev.filter(t => t.id !== tag.id)
        : [...prev, tag]
    );
  };

    const openCloudinaryWidget = () => {
    if (!window.cloudinary) return;
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: import.meta.env.VITE_CLOUDINARY_NAME,
        uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
        sources: ["local", "url", "camera"],
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          setImageUrl(result.info.secure_url);
        }
      }
    );
    widget.open();
  };

  // }
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center", 
        alignItems: "center", 
        minHeight: "100vh", 
        backgroundColor: "#f5f5f5", 
        padding: "2rem",
      }}
    >
      <form
        style={{
          width: "100%",
          maxWidth: "700px", 
          backgroundColor: "#fff",
          padding: "2rem",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
        onSubmit={handleSubmit}
        >
        <h2>Edit Recipe</h2>
        <label>Title</label>
        <input
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Description</label>
        <input
          placeholder="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label>Recipe Source URL</label>
        <input
          placeholder="recipe source url"
          value={sourceUrl}
          onChange={(e) => setSourceUrl(e.target.value)}
        />
        <label>Recipe Tags</label>
        <p>
          Select all tags that apply to your recipe. This will help with
          filtering.
        </p>
        <div className="tag-container">
          {tags.map((tag) => (
            <label key={tag.id}>
              <input
                type="checkbox"
                value={tag.id}
                checked={!!selectedTags.find((t) => t.id === Number(tag.id))}
                onChange={() => handleTagChange(tag)}
              />
              {tag.name}
            </label>
          ))}
        </div>
        <label>
          <h3>Ingredients</h3>
          <IngredientTextEditor value={ingredients} onChange={setIngredients} />
        </label>
        <label>
          <h3>Instructions</h3>
          <InstructionTextEditor
            value={instructions}
            onChange={setInstructions}
          />
        </label>
        <label className="toggle-switch">
          <input
            type="checkbox"
            checked={!isPublic}
            onChange={() => setIsPublic(!isPublic)}
          />
          <span className="slider" />
          <span className="label-text">Keep this recipe private</span>
        </label>
        <div>
          <button type="button" onClick={openCloudinaryWidget}>
            Upload Image
          </button>
          {imageUrl && (
            <div>
              <p>Uploaded Image:</p>
              <img src={imageUrl} width={150} alt="Uploaded recipe" />
            </div>
          )}
        </div>
        <button type="submit">Update Recipe</button>
      </form>
    </div>
  );
}
