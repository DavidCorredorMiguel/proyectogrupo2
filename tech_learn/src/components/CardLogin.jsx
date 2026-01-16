import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import style from "../styles/Login.module.css";

import { loginUser } from "../mocks/users";

import { useAuthStore } from "../store/authStore";
import { Link, useNavigate } from "react-router-dom";

const CardLogin = () => {


  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate(); // hook para navegar

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
    const email = formData.get("email");
    const formPassword = formData.get("password");
    const user = loginUser(email, formPassword);

    if (user) {
      
      login(user);
      navigate("/");
    } else { alert("Credenciales incorrectas"); }
  };

  return (
    <Card className={style.card}>
      <Card.Header className={style.cardheader}>Iniciar Sesión</Card.Header>
      <Card.Body>
        <Card.Text>Pon tu correo y contraseña para iniciar sesión.</Card.Text>
        <form onSubmit={handleSubmit}>
          <h2>Correo Electronico</h2>
          <input
            name="email"
            className={style.email}
            type="email"
            placeholder="Email"
            required
          />
          <h2>Contraseña</h2>
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
          <Card.Text>
            ¿Has olvidado tu contraseña?{" "}
            <Link to="/recordarpass">Recordar Contraseña</Link>
          </Card.Text>
          <Button type="submit" className={style.iniciasesion}>
            Iniciar Sesión
          </Button>
        </form>
        <div className={style.nocuenta}>
          ¿No tienes cuenta?
          <Button
            type="button"
            className={style.iniciasesion}
            onClick={() => navigate("/register")}
          >
            Regístrate
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CardLogin;
