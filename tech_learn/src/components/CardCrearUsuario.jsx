import { useState } from "react";
import { Card } from "react-bootstrap";
import style from "../styles/Login.module.css";
import { registerUser } from "../mocks/users";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

const CardCrearUsuario = () => {
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
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const newUser = registerUser(name, email, password);

    if (!newUser) {
      alert("El email ya está registrado");
      return;
    }

    login(newUser);
    navigate("/");
  };

  return (
    <Card className={style.card}>
      <Card.Header className={style.cardheader}>Crear Usuario</Card.Header>
      <Card.Body>
        <Card.Text>Pon tu correo y contraseña para crear usuario.</Card.Text>
        <form onSubmit={handleSubmit}>
          <div className={style.formGroup}>
            <h2>Nombre de Usuario</h2>
            <input
              name="name"
              type="text"
              placeholder="Nombre"
              required
            />
          </div>

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

          <button type="submit" className={style.iniciasesion}>
            Registrarse
          </button>
        </form>
      </Card.Body>
    </Card>
  );
};

export default CardCrearUsuario;