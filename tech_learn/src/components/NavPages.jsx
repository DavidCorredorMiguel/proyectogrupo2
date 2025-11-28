import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBoxOpen, faShoppingCart, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const NavPages = () => {
  const navItems = [
    { path: '/', label: 'Inicio', icon: faHome },
    { path: '/productos', label: 'Productos', icon: faBoxOpen },
    { path: '/cesta', label: 'Cesta', icon: faShoppingCart },
    { path: '/contacto', label: 'Contacto', icon: faEnvelope }
  ];

  return (
    <nav className="bg-secondary py-2">
      <div className="container">
        <ul className="nav justify-content-center gap-4">
          {navItems.map((item) => (
            <li key={item.path} className="nav-item">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `nav-link d-flex align-items-center gap-2 transition-all hover:scale-105 ${
                    isActive ? 'text-white font-bold' : 'text-gray-300 hover:text-white'
                  }`
                }
              >
                <FontAwesomeIcon icon={item.icon} />
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default NavPages;