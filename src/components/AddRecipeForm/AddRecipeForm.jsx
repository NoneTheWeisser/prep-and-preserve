import React, { useState } from "react";
import InstructionTextEditor from "./InstructionTextEditor";
import useStore from "../../zustand/store";
import axios from "axios";

export default function AddRecipeForm() {
  const [instructions, setInstructions] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");
  const [isPublic, setIsPublic] = useState("");
  const [tags, setTags] = useState("");

  const addRecipe = useStore((state) => state.addRecipe);

  // Form submit
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitting recipe:", {
      ingredients,
      instructions,
      image_url: imageUrl,
    });

    addRecipe({
      title,
      description,
      ingredients,
      instructions,
      image_url: imageUrl,
      is_public: isPublic,
      source_url: sourceUrl,
      // tags
    });

    // reset the form
    setTitle("");
    setDescription("");
    setIngredients("");
    setInstructions("");
    setImageUrl("");
    setSourceUrl("");
    setTags("");
    setIsPublic(true);
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
      <input
        placeholder="recipe tags"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      <label>
        <h3>Ingredients</h3>
        <InstructionTextEditor value={ingredients} onChange={setIngredients} />
      </label>
      <label>
        <h3>Instructions</h3>
        <InstructionTextEditor
          value={instructions}
          onChange={setInstructions}
        />
      </label>
      <label>
        <input
          type="checkbox"
          checked={!isPublic}
          onChange={() => setIsPublic(!isPublic)}
        />
        Keep this recipe private
      </label>
      <button type="submit">Save Recipe</button>
    </form>
  );
}
