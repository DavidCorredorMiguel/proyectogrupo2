import { mockUsers } from '../mocks/users';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');

    const exists = mockUsers.find((u) => u.email === email);

    if (exists) {
      alert('El email ya está registrado');
      return;
    }

    const newUser = {
      id: mockUsers.length + 1,
      name,
      email,
      password
    };

    mockUsers.push(newUser); // Solo persiste en memoria esta sesión
    login(newUser);
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" type="text" placeholder="Nombre" required />
      <input name="email" type="email" placeholder="Email" required />
      <input name="password" type="password" placeholder="Password" required />
      <button type="submit">Registrarse</button>
    </form>
  );
};

export default Register;