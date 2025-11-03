import MyRecipeList from "./MyRecipeList";

export default function MyRecipe() {
  return (
    <>
      <img
        src={"/img/garlic-8227658_1280.jpg"}
        alt={"MyRecipe header image"}
        style={{ width: "20%", marginBottom: "1rem" }}
      />
      <MyRecipeList />
    </>
  );
}
