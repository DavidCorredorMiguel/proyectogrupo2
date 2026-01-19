import { useState } from "react";
import { Card } from "react-bootstrap";
import style from "../styles/Login.module.css";
import { loginUser } from "../mocks/users";
import { useAuthStore } from "../store/authStore";
import { Link, useNavigate } from "react-router-dom";

const CardLogin = () => {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
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
    } else {
      alert("Credenciales incorrectas");
    }
  };

  return (
    <Card className={style.card}>
      <Card.Header className={style.cardheader}>Iniciar Sesión</Card.Header>
      <Card.Body>
        <Card.Text>Pon tu correo y contraseña para iniciar sesión.</Card.Text>
        <form onSubmit={handleSubmit}>
          <div className={style.formGroup}>
            <h2>Correo Electrónico</h2>
            <input
              name="email"
              className={style.email}
              type="email"
              placeholder="Email"
              required
            />
          </div>

          <div className={style.formGroup}>
            <h2>Contraseña</h2>
            <div className={style.passwordWrapper}>
              <input
                name="password"
                className={style.pass}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className={style.muestrapass}
                onClick={toggleVisibility}
              >
                {showPassword ? "Ocultar" : "Mostrar"}
              </button>
            </div>
          </div>

          <Card.Text className={style.forgotPassword}>
            ¿Has olvidado tu contraseña?{" "}
            <Link to="/recordarpass">Recordar Contraseña</Link>
          </Card.Text>

          <button type="submit" className={style.iniciasesion}>
            Iniciar Sesión
          </button>
        </form>

        <div className={style.nocuenta}>
          <span>¿No tienes cuenta?</span>
          <button
            type="button"
            className={style.registrate}
            onClick={() => navigate("/register")}
          >
            Regístrate
          </button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CardLogin;