import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faBoxOpen, faEnvelope, faIdCardClip } from "@fortawesome/free-solid-svg-icons";
import '../styles/NavPages.css';

const NavPages = () => {
  const navItems = [
    { path: "/", label: "Inicio", icon: faHome },
    { path: "/productos", label: "Productos", icon: faBoxOpen },
    { path: "/tarjetasaprender", label: "Tarjetas Aprender", icon: faIdCardClip },
    { path: "/aboutus", label: "Sobre Nosotros", icon: faEnvelope },
  ];

  return (
    <nav className="nav-pages">
      <ul className="nav-pages-list">
        {navItems.map((item) => (
          <li key={item.path} className="nav-pages-item">
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `nav-pages-link ${isActive ? "nav-pages-link--active" : ""}`
              }
            >
              <FontAwesomeIcon icon={item.icon} className="nav-pages-icon" />
              <span>{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavPages;
