import MyRecipeList from "./MyRecipeList";
import useStore from "../../zustand/store";
import Avatar from "@mui/material/Avatar";

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
        <Avatar
          src={user?.profile_image_url || undefined} 
          alt={user?.username || "User"}
          sx={{
            width: 250,
            height: 250,
            position: "absolute",
            bottom: "-40px",
            left: "50%",
            transform: "translateX(-50%)",
            border: "4px solid white",
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
            bgcolor: "#afac9aff", // fallback color
            fontSize: 64,
          }}
        >
          {!user?.profile_image_url && user?.username?.[0]?.toUpperCase()}
        </Avatar>
      </div>
      <div style={{ marginTop: "80px" }}>
        <h2>{user ? `${user.username}'s Recipes` : "My Recipes"}</h2>
        {/* <h2>{`${user.username}`}</h2> */}
        <MyRecipeList />
      </div>
    </div>
  );
}