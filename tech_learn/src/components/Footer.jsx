import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import logoImg from "../assets/images/logo.png";
import '../styles/Footer.css';

const Footer = () => {
  const handleCopy = () => {
    navigator.clipboard.writeText("Tech-learn");
    alert("Copiado!");
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo */}
        <div className="footer-section footer-brand">
          <div className="footer-logo-wrapper">
            <img src={logoImg} className="footer-logo-img" alt="Logo Tech & Learn" />
          </div>
          <p className="footer-slogan">Tu tienda de confianza y centro de aprendizaje</p>
        </div>

        {/* Páginas */}
        <div className="footer-section">
          <h6 className="footer-title">Páginas</h6>
          <ul className="footer-links">
            <li><a href="/">Inicio</a></li>
            <li><a href="/productos">Productos</a></li>
            <li><a href="/tarjetasaprender">Tarjetas Aprender</a></li>
            <li><a href="/aboutus">Sobre Nosotros</a></li>
          </ul>
        </div>

        {/* Redes sociales */}
        <div className="footer-section">
          <h6 className="footer-title">Síguenos</h6>
          <div className="footer-social">
            <a href="https://www.facebook.com/?locale=es_ES" aria-label="Facebook">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a href="https://x.com/?lang=es" aria-label="Twitter">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href="https://www.instagram.com/" aria-label="Instagram">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="https://es.linkedin.com/" aria-label="LinkedIn">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="footer-section footer-copyright">
          <p>
            © 2025 - Tech-learn
            <button onClick={handleCopy} className="footer-copy-btn" aria-label="Copiar nombre">
              <FontAwesomeIcon icon={faCopy} />
            </button>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
