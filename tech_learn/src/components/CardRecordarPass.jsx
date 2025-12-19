import React, { useState } from "react";

import { Button, Card } from "react-bootstrap";
import style from "../styles/Login.module.css";
import { updatePassword } from "../mocks/users";

import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

const CardRecordarPass = () => {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  // Estado para mostrar/ocultar contraseña
  const [showPassword, setShowPassword] = useState(false);
  // Mostrar / ocultar repetir contraseña
  const [showPassword2, setShowPassword2] = useState(false);

  // Contraseña escrita
  const [password, setPassword] = useState("");

  // Repetir contraseña escrita
  const [password2, setPassword2] = useState("");
  const toggleVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleVisibility2 = () => {
    setShowPassword2((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const email = formData.get("email");

    if (password !== password2) {
      alert("Las contraseñas no coinciden");
      return;
    }

    // Llamada al servicio
    const updatedUser = updatePassword(email, password);

    if (!updatedUser) {
      alert("No existe ningún usuario con ese email");
      return;
    }

    // Login automático con la nueva contraseña
    login(updatedUser);
    navigate("/");
  };
  return (
    <>
      <Card className={style.card}>
        <Card.Header className={style.cardheader}>
          Recordar Contraseña
        </Card.Header>
        <Card.Body>
          <Card.Text>
            Pon tu nueva contraseña 2 veces para cambiarla. Debe ser igual.
          </Card.Text>
          <form onSubmit={handleSubmit}>
            <h2>Correo Electronico</h2>
            <input
              name="email"
              className={style.email}
              type="email"
              placeholder="Email"
              required
            />
            <h2>Contraseña Nueva</h2>
            <input
              name="password"
              className={style.pass}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="button"
              className={style.muestrapass}
              onClick={toggleVisibility}
            >
              {showPassword ? "Ocultar" : "Mostrar"}
            </Button>
            <h2>Repetir Contraseña Nueva</h2>
            <input
              name="password2"
              className={style.pass}
              type={showPassword2 ? "text" : "password"}
              placeholder="Password"
              required
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            />
            <Button
              type="button"
              className={style.muestrapass}
              onClick={toggleVisibility2}
            >
              {showPassword2 ? "Ocultar" : "Mostrar"}
            </Button>
            <br />
            <br />
            <Button type="submit" className={style.iniciasesion}>
              Cambiar Contraseña
            </Button>
          </form>
        </Card.Body>
      </Card>
    </>
  );
};

export default CardRecordarPass;
