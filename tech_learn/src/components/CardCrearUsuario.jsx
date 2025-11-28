import React from "react";
import { Button, Card } from "react-bootstrap";
import style from "../styles/Login.module.css";
import { mockUsers } from '../mocks/users';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';

const CardCrearUsuario = () => {
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
    <>
      <Card className={style.card}>
        <Card.Header className={style.cardheader}>Crear Usuario</Card.Header>
        <Card.Body>
          <Card.Text>Pon tu correo y contraseña para crear usuario.</Card.Text>
          <form onSubmit={handleSubmit}>
            <h3>Nombre de Usuario</h3>
            <input name="name" type="text" placeholder="Nombre" required />
            <h3>Correo Electronico</h3>
            <input name="email" className={style.email} type="email" placeholder="Email" required />
            <h3>Contraseña</h3>
            <input name="password" className={style.pass} 
              type="password" placeholder="Contraseña" required />
            <Button className={style.muestrapass}>Mostar/Ocultar</Button>
            <br /><br />
            <Button type="submit" className={style.iniciasesion}>Registrarse</Button>
          </form>
        </Card.Body>
      </Card>
    </>
  );
}

export default CardCrearUsuario;
