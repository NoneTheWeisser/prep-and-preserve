import useStore from "../../zustand/store";
import { useNavigate } from "react-router-dom";
import CommunityRecipeList from "../CommunityRecipes/CommunityRecipeList";

function HomePage() {
  const user = useStore((state) => state.user);
  const logOut = useStore((state) => state.logOut);
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "left" }}>
      <div
        style={{
          position: "relative",
          height: "500px",
          width: "100%",
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          paddingLeft: "5%",
          backgroundImage: `url("/img/pexels-photo-326281.jpeg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <img
          src="/img/prepperservelogo_vertical_white.svg"
          alt="Prep & Preserve White logo"
          style={{
            width: "200px",
            marginBottom: "1rem",
          }}
        />
        <h1 style={{ marginBottom: "1rem" }}>Welcome {user.username}</h1>
        <p
          style={{
            maxWidth: "600px",
            lineHeight: "1.5rem",
            fontSize: "1.1rem",
          }}
        >
          Welcome to your personal recipe book! Here you can save and organize
          the recipes you love, all in one clean, easy-to-read space. Add your
          own recipes or explore those shared by others. Format instructions,
          add ingredients, and even upload images to make your collection truly
          yours. Cook without distractions and keep all your favorites at your
          fingertips.
        </p>
        {/* conditional buttons */}
        <div
          style={{
            position: "absolute",
            bottom: "20px",
            right: "5%",
            display: "flex",
            gap: "1rem", // space between buttons
          }}
        >
          {!user.id ? (
            <>
              <button
                type="button"
                className="auth-btn secondary"
                onClick={() => navigate("/login")}
              >
                Sign In
              </button>
              <button
                type="button"
                className="auth-btn secondary"
                onClick={() => navigate("/registration")}
              >
                Create Account
              </button>
            </>
          ) : (
            <button
              type="button"
              className="auth-btn secondary"
              onClick={logOut}
            >
              Log Out
            </button>
          )}
        </div>
      </div>
      <h3 style={{textAlign:"center"}}>Trending Recipes</h3>
      <CommunityRecipeList />
    </div>
  );
}

export default HomePage;
