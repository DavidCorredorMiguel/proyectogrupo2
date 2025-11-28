import React from "react";
import { Button, Card } from "react-bootstrap";
import style from "../styles/Login.module.css";

function CardLogin() {
  return (
    <>
      <Card className={style.card}>
        <Card.Header className={style.cardheader}>Iniciar Sesión</Card.Header>
        <Card.Body>
          <Card.Text>Pon tu correo y contraseña para iniciar sesión.</Card.Text>
          <h2>Correo Electronico</h2>
          <input type="email" className={style.email} />
          <h2>Contraseña</h2>
          <input type="password" name="" id="" />
          <Button className={style.muestrapass}>Mostar/Ocultar Contraseña</Button>
          <Card.Text>
            ¿Has olvidado tu contraseña?
            <a href="./../pages/RecordarPass">Recordar Contraseña</a>
          </Card.Text>
          <Button className={style.iniciasesion}>Iniciar Sesion</Button>
        </Card.Body>
      </Card>
    </>
  );
}

export default CardLogin;
