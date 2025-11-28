import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faCopy } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  const handleCopy = () => {
    navigator.clipboard.writeText('Tech-learn');
    alert('Copiado!');
  };

  return (
    <footer className="bg-dark text-white py-4 mt-auto">
      <div className="container">
        <div className="row">
          {/* Logo */}
          <div className="col-md-3 mb-3 mb-md-0">
            <div className="font-bold text-xl mb-2">LOGO</div>
            <p className="text-gray-400 text-sm">Tu tienda de confianza</p>
          </div>

          {/* Páginas */}
          <div className="col-md-3 mb-3 mb-md-0">
            <h6 className="font-semibold mb-2">Páginas</h6>
            <ul className="list-unstyled text-sm">
              <li><a href="/" className="text-gray-400 hover:text-white no-underline">Inicio</a></li>
              <li><a href="/productos" className="text-gray-400 hover:text-white no-underline">Productos</a></li>
              <li><a href="/cesta" className="text-gray-400 hover:text-white no-underline">Cesta</a></li>
              <li><a href="/contacto" className="text-gray-400 hover:text-white no-underline">Contacto</a></li>
            </ul>
          </div>

          {/* Redes sociales */}
          <div className="col-md-3 mb-3 mb-md-0">
            <h6 className="font-semibold mb-2">Síguenos</h6>
            <div className="d-flex gap-3 text-2xl">
              <a href="#" className="text-gray-400 hover:text-white"><FontAwesomeIcon icon={faFacebook} /></a>
              <a href="#" className="text-gray-400 hover:text-white"><FontAwesomeIcon icon={faTwitter} /></a>
              <a href="#" className="text-gray-400 hover:text-white"><FontAwesomeIcon icon={faInstagram} /></a>
              <a href="#" className="text-gray-400 hover:text-white"><FontAwesomeIcon icon={faLinkedin} /></a>
            </div>
          </div>

          {/* Copyright */}
          <div className="col-md-3">
            <p className="text-gray-400 text-sm">
              © 2025 - Tech-learn 
              <FontAwesomeIcon 
                icon={faCopy} 
                className="ms-2 cursor-pointer hover:text-white" 
                onClick={handleCopy}
              />
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;