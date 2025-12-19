import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import style from "../styles/Login.module.css";
import { registerUser } from "../mocks/users";

import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

const CardCrearUsuario = () => {

  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();


  // Estado para mostrar/ocultar contraseña
  const [showPassword, setShowPassword] = useState(false);
  // Estado para almacenar la contraseña escrita
  const [password, setPassword] = useState("");

  const toggleVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const handleSubmit = (e) => {

    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const newUser = registerUser(name,email,password)


    if (newUser) {
      alert("El email ya está registrado");
      return;
    }


    // Solo persiste en memoria esta sesión
    login(newUser);
    navigate("/");
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
            <input name="password" className={style.pass} type={showPassword ? "text" : "password"} 
              placeholder="Password" required value={password} 
              onChange={(e) => setPassword(e.target.value)} />
            <Button type="button" className={style.muestrapass} onClick={toggleVisibility}>
              {showPassword ? "Ocultar" : "Mostrar"}</Button>
            <br /><br /><Button type="submit" className={style.iniciasesion}>Registrarse</Button>
          </form>
        </Card.Body>
      </Card>
    </>
  );
};

export default CardCrearUsuario;
