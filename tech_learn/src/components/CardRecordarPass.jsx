import React from "react";
import { Button, Card } from "react-bootstrap";
import style from "../styles/Login.module.css";
import { mockUsers } from "../mocks/users";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

const CardRecordarPass = () => {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    const user = mockUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (password == formData.get("password")) {
      if (user) {
        login(user);
        navigate("/");
      } else {
        alert("Credenciales incorrectas");
      }
    } else {
      alert("Las contraseñas no coinciden");
    }
  };

  return (
    <>
      <Card className={style.card}>
        <Card.Header className={style.cardheader}>Recordar Contraseña</Card.Header>
        <Card.Body>
          <Card.Text>Pon tu nueva contraseña 2 veces para cambiarla. Debe ser igual.</Card.Text>
          <form onSubmit={handleSubmit}>
            <h2>Correo Electronico</h2>
            <input name="email" className={style.email} type="email" placeholder="Email" required />
            <h2>Contraseña Nueva</h2>
            <input name="password" className={style.pass} type="password" placeholder="Password" required />
            <Button className={style.muestrapass}>Mostar/Ocultar</Button>
            <h2>Repetir Contraseña Nueva</h2>
            <input name="password2" className={style.pass} type="password" placeholder="Password" required />
            <Button className={style.muestrapass}>Mostar/Ocultar</Button>
            <br /><br /><Button type="submit" className={style.iniciasesion}>Cambiar Contraseña</Button>
          </form>
        </Card.Body>
      </Card>
    </>
  );
};

export default CardRecordarPass;
