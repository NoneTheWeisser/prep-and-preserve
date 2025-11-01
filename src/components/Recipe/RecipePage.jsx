// import React from "react";
// import { useEffect } from "react";
// import useStore from "../../zustand/store";
// import parse from "html-react-parser";

// export default function RecipePage() {
//   const userRecipes = useStore((state) => state.userRecipes);
//   const fetchUserRecipes = useStore((state) => state.fetchUserRecipes);
//   const deleteRecipe = useStore((state) => state.deleteRecipe);

//   useEffect(() => {
//     fetchUserRecipes();
//   }, [fetchUserRecipes]);

//   const handleDelete = (id) => {
//     if (window.confirm("Are you sure you want to delete this recipe?")) {
//       deleteRecipe(id);
//     }
//   };

//   const handleEdit = (id) => {
//     // to do still
//     // nav to edit page
//     console.log("Edit recipe with id:", id);
//   };

//   return (
//     <div>
//       <h2>{recipe.title}</h2>
//       <ul>
//         {userRecipes.map((recipe) => (
//           <li key={recipe.id}>
//             {recipe.image_url && (
//               <div>
//                 <img
//                   src={recipe.image_url}
//                   width={150}
//                   alt={recipe.title}
//                   style={{ display: "block", marginBottom: "0.5rem" }}
//                 />
//               </div>
//             )}

//             {recipe.description && <p>{recipe.description}</p>}

//             <div>
//               <strong>Ingredients:</strong>
//               <div>{parse(recipe.ingredients)}</div>
//             </div>

//             <div>
//               <strong>Instructions:</strong>
//               <div>{parse(recipe.instructions)}</div>
//             </div>

//             <div style={{ marginTop: "0.5rem" }}>
//               <button onClick={() => handleEdit(recipe.id)}>Edit</button>{" "}
//               <button onClick={() => handleDelete(recipe.id)}>Delete</button>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
