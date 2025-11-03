import { NavLink } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-left">
        <NavLink to="/">
          <img
            src="/img/prepperservelogo_favicon.svg"
            alt="Prep & Preserve logo"
            className="footer-logo"
          />
        </NavLink>
      </div>
      <p>Copyright © NoneTheWeisser {new Date().getFullYear()}</p>
    </footer>
  );
}