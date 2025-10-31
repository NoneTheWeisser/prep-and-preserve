import { NavLink } from "react-router-dom";
import useStore from "../../zustand/store";

function Nav() {
  const user = useStore((store) => store.user);

  return (
    <nav>
      <ul>
        {
          // User is not logged in, render these links:
          !user.id && (
            <>
              <li><NavLink to="/">Home</NavLink></li>
              <li><NavLink to="/login">Login</NavLink></li>
              <li><NavLink to="/registration">Sign Up</NavLink></li>
            </>
          )
        }
        {
          // User is logged in, render these links:
          user.id && (
            <>
              <li><NavLink to="/">Home</NavLink></li>
              <li><NavLink to="/addrecipe">Add Recipe</NavLink></li>
              <li><NavLink to="/myrecipes">My Recipe</NavLink></li>
            </>
          )
        }
        {/* Show these links regardless of auth status: */}
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
        <li>
          <NavLink to="/community">Community Recipes</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
