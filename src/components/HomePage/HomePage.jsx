import useStore from "../../zustand/store";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const user = useStore((state) => state.user);
  const logOut = useStore((state) => state.logOut);
  const navigate = useNavigate();

  return (
    <>
      <h1>Welcome {user.username}</h1>
      <img
        src="/img/pexels-photo-326281.jpeg"
        alt="Prep & Preserve logo"
        className="register-logo"
      />
      <img
        src="/img/prepperservelogo_vertical_white.svg"
        alt="Prep & Preserve White logo"
        className="register-logo"
      />
      <p>
        Welcome to your personal recipe book! Here you can save and organize the
        recipes you love, all in one clean, easy-to-read space. Add your own
        recipes or explore those shared by others. Format instructions, add
        ingredients, and even upload images to make your collection truly yours.
        Cook without distractions and keep all your favorites at your
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
    </>
  );
}

export default HomePage;
