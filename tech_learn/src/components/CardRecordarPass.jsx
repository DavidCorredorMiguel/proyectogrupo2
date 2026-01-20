import { useState } from "react";
import { Card } from "react-bootstrap";
import style from "../styles/Login.module.css";
import { updatePassword } from "../mocks/users";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

const CardRecordarPass = () => {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const toggleVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleVisibility2 = () => {
    setShowPassword2((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      alert("Las contraseñas no coinciden");
      return;
    }

    const formData = new FormData(e.target);
    const email = formData.get("email");
    const updatedUser = updatePassword(email, password);

    if (!updatedUser) {
      alert("No existe ningún usuario con ese email");
      return;
    }

    login(updatedUser);
    navigate("/");
  };

  return (
    <Card className={style.card}>
      <Card.Header className={style.cardheader}>Recordar Contraseña</Card.Header>
      <Card.Body>
        <Card.Text>
          Pon tu nueva contraseña 2 veces para cambiarla. Debe ser igual.
        </Card.Text>
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
            <h2>Contraseña Nueva</h2>
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

          <div className={style.formGroup}>
            <h2>Repetir Contraseña Nueva</h2>
            <div className={style.passwordWrapper}>
              <input
                name="password2"
                className={style.pass}
                type={showPassword2 ? "text" : "password"}
                placeholder="Password"
                required
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
              />
              <button
                type="button"
                className={style.muestrapass}
                onClick={toggleVisibility2}
              >
                {showPassword2 ? "Ocultar" : "Mostrar"}
              </button>
            </div>
          </div>

          <button type="submit" className={style.iniciasesion}>
            Cambiar Contraseña
          </button>
        </form>
      </Card.Body>
    </Card>
  );
};

export default CardRecordarPass;