import MyRecipeList from "./MyRecipeList";
import useStore from "../../zustand/store";

export default function MyRecipe() {
  const user = useStore((state) => state.user);
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ position: "relative" }}>
        <img
          src={"/img/pexels-rdne-8581016.jpg"}
          alt={"MyRecipe header image"}
          style={{
            width: "100%",
            height: "500px",
            objectFit: "cover",
            // borderBottom: "4px solid #000000ff",
          }}
        />
        {user?.profile_image_url && (
          <img
            src={user.profile_image_url}
            alt={`${user.username}'s profile`}
            style={{
              width: "250px",
              height: "250px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "4px solid white",
              position: "absolute",
              bottom: "-40px",
              left: "50%",
              transform: "translateX(-50%)",
              boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
              backgroundColor: "#fff",
            }}
          />
        )}
      </div>
      <div style={{ marginTop: "80px" }}>
        <h2>{user ? `${user.username}'s Recipes` : "My Recipes"}</h2>
          {/* <h2>{`${user.username}`}</h2> */} 
        <MyRecipeList />
      </div>
    </div>
  );
}
