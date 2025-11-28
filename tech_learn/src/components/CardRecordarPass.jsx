import React from "react";
import { Button, Card } from "react-bootstrap";
import style from "../styles/Login.module.css";

function CardRecordarPass() {
  return (
    <>
      <Card className={style.card}>
        <Card.Header className={style.cardheader}>Recordar Contraseña</Card.Header>
        <Card.Body>
          <Card.Text>Pon tu nueva contraseña 2 veces para cambiarla. Debe ser igual.</Card.Text>
          <h2>Contraseña Nueva</h2>
          <input type="password" className={style.pass} />
          <Button className={style.muestrapass}>Mostar/Ocultar</Button>
          <h2>Repetir Contraseña Nueva</h2>
          <input type="password" className={style.pass} />
          <Button className={style.muestrapass}>Mostar/Ocultar</Button>
          <br /><br /><Button className={style.iniciasesion}>Cambiar Contraseña</Button>
        </Card.Body>
      </Card>
    </>
  );
}

export default CardRecordarPass;
