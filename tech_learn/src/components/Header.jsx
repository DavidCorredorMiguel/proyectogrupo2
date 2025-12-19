import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';
import logoImg from '../assets/images/logo.png';
import { mockProducts } from '../mocks/products';

// Extraer categorías únicas del mock
const categories = [...new Set(mockProducts.map(p => p.category))];

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
    <header className="d-flex justify-content-between align-items-center p-3 
      bg-gradient-to-r from-slate-950 to-[#008B8B] text-white sticky top-0 z-50">
      <div className="logo cursor-pointer font-bold text-xl hover:opacity-80" 
        onClick={() => navigate('/')} >
        <img src={logoImg} className="h-20 w-auto object-contain" 
          alt="Logo Tech & Learn" />
      </div>
      <div className="search-bar flex-grow-1 mx-4" style={{ maxWidth: '600px' }}>
        <div className="input-group">
          <select 
            className="form-select" 
            style={{ maxWidth: '180px' }}
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="todas">Todas las categorías</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <input 
            type="text" 
            placeholder="Buscar productos..."
            className="form-control"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className="btn btn-primary" onClick={handleSearch}>🔍</button>
        </div>
      </div>
      {isLoggedIn ? (
        <div className="d-flex align-items-center gap-3">
          <span className="hidden md:inline">👤 {user?.name}</span>
          <button className="btn btn-outline-light transition-all hover:scale-105" 
            onClick={handleLogout}>Cerrar Sesión</button>
        </div>
      ) : (
        <button className="btn btn-primary transition-all hover:scale-105" 
          onClick={() => navigate('/login')}>Login</button>
      )}
    </header>
  );
};

export default Header;