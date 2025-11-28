import { mockUsers } from '../mocks/users';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');

    const user = mockUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      login(user);
      navigate('/');
    } else {
      alert('Credenciales incorrectas');
    }
  };
import React from 'react'
import CardLogin from './../components/CardLogin';

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" type="email" placeholder="Email" required />
      <input name="password" type="password" placeholder="Password" required />
      <button type="submit">Entrar</button>
    </form>
  );
};
    <>
      <CardLogin></CardLogin>
    </>
  )
}

export default Login;