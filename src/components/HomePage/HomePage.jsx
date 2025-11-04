import useStore from "../../zustand/store";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const user = useStore((state) => state.user);
  const logOut = useStore((state) => state.logOut);
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ position: "relative" }}>
        <img
          src="/img/pexels-photo-326281.jpeg"
          alt="Prep & Preserve logo"
          className="register-logo"
          style={{
            width: "100%",
            height: "600px",
            objectFit: "cover",
          }}
          />
        <img
          src="/img/prepperservelogo_vertical_white.svg"
          alt="Prep & Preserve White logo"
          className="register-logo"
          style={{
            width: "200px",
            // height: "164px",
            objectFit: "cover",
            position: "absolute",
            bottom: "500px",
            left: "5%",
          }}
          />
          <h1>Welcome {user.username}</h1>
        <p
            style={{
            width: "200px",
            // height: "164px",
            // objectFit: "cover",
            position: "absolute",
            bottom: "200px",
            color: "white",
            left: "5%",
          }}>
          Welcome to your personal recipe book! Here you can save and organize
          the recipes you love, all in one clean, easy-to-read space. Add your
          own recipes or explore those shared by others. Format instructions,
          add ingredients, and even upload images to make your collection truly
          yours. Cook without distractions and keep all your favorites at your
          fingertips.
        </p>
        {/* conditional buttons */}
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
          <button type="button" className="auth-btn secondary" onClick={logOut}>
            Log Out
          </button>
        )}
      </div>
    </div>
  );
}

export default HomePage;
