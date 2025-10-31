import './Footer.css';

export default function Footer() {
  return (
    <footer>
      <img
        src="/img/prepperservelogo_favicon.svg"
        alt="Prep & Preserve logo"
        className="footer-logo"
      />
      <p>Copyright © NoneTheWeisser {new Date().getFullYear()}</p>
    </footer>
  );
}
