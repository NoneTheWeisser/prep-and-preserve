import { NavLink } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <NavLink to="/">
            <img
              src="/img/prepperservelogo_favicon.svg"
              alt="Prep & Preserve logo"
              className="footer-logo"
            />
          </NavLink>
        </div>

        <nav className="footer-links">
          <NavLink to="/about">About</NavLink>
          <NavLink to="/community">Community Recipes</NavLink>
          <NavLink to="/myrecipes">My Recipes</NavLink>
        </nav>

        <p className="footer-copy">
          © NoneTheWeisser {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
