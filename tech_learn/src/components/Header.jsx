import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';
import logoImg from '../assets/images/logo.png';
import { mockProducts } from '../mocks/products';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faHeart, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import BotonTema from './BotonTema';
import '../styles/Header.css';
// Extraer categorías únicas del mock
const categories = [
  ...new Set(mockProducts.map(p => p.category).filter(cat => cat && cat.trim() !== ''))
];
const Header = () => {
  const { isLoggedIn, user, logout } = useAuthStore();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todas');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSearch = () => {
    if (!searchTerm.trim()) return;
    navigate(`/productos?categoria=${encodeURIComponent(selectedCategory)}&q=${encodeURIComponent(searchTerm)}`);
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  };
  return (
    <header className="header">
      {/* Columna 1: Logo */}
      <div className="logo-wrapper" onClick={() => navigate('/')}>
        <img src={logoImg} className="logo-img" alt="Logo Tech & Learn" />
      </div>
      {/* Columna 2: Buscador */}
      <div className="search-bar">
        <div className="input-group">
          <select className="form-select search-select" value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="todas">Categorías</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <input type="text" placeholder="Buscar productos..."
            className="form-control" value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown} />
          <button className="btn btn-primary search-btn" onClick={handleSearch}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>
      </div>
      {/* Columna 3: Acciones */}
      <div className="header-actions">
        <BotonTema />
        {isLoggedIn ? (
          <>
            <span className="user-name">👤 {user?.name}</span>
            <button className="btn btn-logout" onClick={handleLogout}>
              Cerrar Sesión
            </button>
            <button className="icon-btn"
              onClick={() => navigate('/favoritos')}
              aria-label="Ver favoritos">
              <FontAwesomeIcon icon={faHeart} className="icon-heart" />
            </button>
            <button className="icon-btn"
              onClick={() => navigate('/cesta')}
              aria-label="Ver cesta">
              <FontAwesomeIcon icon={faShoppingCart} className="icon-cart" />
            </button>
          </>
        ) : (
          <button className="btn btn-login" onClick={() => navigate('/login')}>
            Login
          </button>
        )}
      </div>
    </header>
  );
};
export default Header;