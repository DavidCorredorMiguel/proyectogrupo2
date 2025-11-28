import React from "react";
import { Button, Card } from "react-bootstrap";
import style from "../styles/Login.module.css";

function CardCrearUsuario() {
  return (
    <>
      <Card className={style.card}>
        <Card.Header className={style.cardheader}>Crear Usuario</Card.Header>
        <Card.Body>
          <Card.Text>Pon tu correo y contraseña para crear usuario.</Card.Text>
          <h2>Correo Electronico</h2>
          <input type="email" className={style.email} />
          <h2>Contraseña</h2>
          <input type="password" className={style.pass} />
          <Button className={style.muestrapass}>Mostar/Ocultar</Button>
          <Button className={style.iniciasesion}>Crear Usuario</Button>
        </Card.Body>
      </Card>
    </>
  );
}

export default CardCrearUsuario;
