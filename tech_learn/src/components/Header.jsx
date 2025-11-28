import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { isLoggedIn, user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="d-flex justify-content-between align-items-center p-3 bg-dark text-white sticky top-0 z-50">
      <div 
        className="logo cursor-pointer font-bold text-xl hover:opacity-80" 
        onClick={() => navigate('/')}
      >
        LOGO
      </div>

      <div className="search-bar flex-grow-1 mx-4" style={{ maxWidth: '600px' }}>
        <div className="input-group">
          <select className="form-select" style={{ maxWidth: '120px' }}>
            <option value="">Filtro</option>
            <option value="nombre">Nombre</option>
            <option value="categoria">Categoría</option>
            <option value="precio">Precio</option>
          </select>
          <input
            type="text"
            placeholder="Buscar productos..."
            className="form-control"
          />
          <button className="btn btn-primary">
            🔍
          </button>
        </div>
      </div>

      {isLoggedIn ? (
        <div className="d-flex align-items-center gap-3">
          <span className="hidden md:inline">👤 {user?.name}</span>
          <button 
            className="btn btn-outline-light transition-all hover:scale-105" 
            onClick={handleLogout}
          >
            Cerrar Sesión
          </button>
        </div>
      ) : (
        <button 
          className="btn btn-primary transition-all hover:scale-105" 
          onClick={() => navigate('/login')}
        >
          Login
        </button>
      )}
    </header>
  );
};

export default Header;