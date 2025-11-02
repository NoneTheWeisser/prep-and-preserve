import { NavLink } from "react-router-dom";
import useStore from "../../zustand/store";
import("../Nav/Nav.css");

function Nav() {
  const user = useStore((store) => store.user);
  const logOut = useStore((state) => state.logOut);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <NavLink to="/">
          <img
            src="/img/prepperservelogo_horizontal.svg"
            alt="Prep & Preserve logo"
            className="nav-logo"
          />
        </NavLink>
      </div>

      <ul className="navbar-links">
        {/* Show these links regardless of auth status: */}
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
        <li>
          <NavLink to="/community">Community Recipes</NavLink>
        </li>
        {
          // User is not logged in, render these links:
          !user.id && (
            <>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
              <li>
                <NavLink to="/registration">Sign Up</NavLink>
              </li>
            </>
          )
        }
        {
          // User is logged in, render these links:
          user.id && (
            <>
              {/* <li>
                <NavLink to="/">Home</NavLink>
              </li> */}
              <li>
                <NavLink to="/addrecipe">Add Recipe</NavLink>
              </li>
              <li>
                <NavLink to="/myrecipes">My Recipe</NavLink>
              </li>
              <li>
                <button
                  type="button"
                  className="logout-btn"
                  onClick={logOut}
                >
                  Log Out
                </button>
              </li>
            </>
          )
        }
      </ul>
    </nav>
  );
}

export default Nav;
