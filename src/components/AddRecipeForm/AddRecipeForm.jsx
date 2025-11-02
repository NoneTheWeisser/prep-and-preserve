import ("../AddRecipeForm/AddRecipeForm.css");
import React, { useEffect, useState } from "react";
import InstructionTextEditor from "./InstructionTextEditor";
import useStore from "../../zustand/store";
import { useNavigate } from "react-router-dom";

export default function AddRecipeForm() {
  const [instructions, setInstructions] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [selectedTags, setSelectedTags] = useState("");
  const navigate = useNavigate();

  const addRecipe = useStore((state) => state.addRecipe);
  const allTags = useStore((state) => state.allTags);
  const fetchTags = useStore((state) => state.fetchTags);

  useEffect(() => {
    fetchTags();
  }, [fetchTags]);

  // Render checkboxes
  const handleTagChange = (tagId) => {
    setSelectedTags((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId]
    );
  };

  // Form submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    const recipeData = {
      title,
      description,
      ingredients,
      instructions,
      image_url: imageUrl,
      is_public: isPublic,
      source_url: sourceUrl,
      tags: selectedTags,
    };
    console.log("Submitting recipe:", recipeData);
    try {
      const newRecipe = await addRecipe(recipeData);
      // once submitted, nav to the full view page
      if (newRecipe?.id) {
        navigate(`/recipes/${newRecipe.id}`);
      } else {
        navigate("/myrecipes");
      }
      // reset the form
      setTitle("");
      setDescription("");
      setIngredients("");
      setInstructions("");
      setImageUrl("");
      setSourceUrl("");
      setTags("");
      setIsPublic(true);
    } catch (error) {
      console.error("Error submitting recipe:", error);
    }
  };

  // cloudinary
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

  return (
    <div>
      <h2>Add Recipe</h2>

      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
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
          {allTags.map((tag) => (
            <label key={tag.id}>
              <input
                type="checkbox"
                value={tag.id}
                checked={selectedTags.includes(tag.id)}
                onChange={() => handleTagChange(tag.id)}
              />
              {tag.name}
            </label>
          ))}
        </div>
        {/* <input
          placeholder="recipe tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        /> */}
        <label>
          <h3>Ingredients</h3>
          <InstructionTextEditor
            value={ingredients}
            onChange={setIngredients}
          />
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
        <button type="submit">Save Recipe</button>
        {/* debating adding this feature. User could choose to add another recipe 
      instead of submitted just the one and nav to the recipe page*/}
        <button type="submit">Submit Another Recipe??</button>
      </form>
    </div>
  );
}
