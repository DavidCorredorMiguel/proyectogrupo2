import React from "react";
import style from "../styles/AboutUs.module.css";

function AboutUs() {
  return (
    <div className={style.au}>
      <img src="logo.png" alt="" className={style.logoau} />
      <h2>Sobre Nosotros</h2>
      <p>
        Somos una tienda que reune en una sola todo tipo de tecnologías, desde
        electrodomésticos, informática, sonido, hogar, y todo lo que puedas
        necesitar.
        <br /><br />
        Además, te permite aprender sobre tecnologías con tarjetas de
        aprendizaje que puede crear el usuario.
        <br /><br />
        Puede buscar productos y filtrar por categoría. Añadir comentarios y
        valoraciones de productos.
        <br /><br />
        Tanto para comprar, comentar, valorar y crear tarjetas de aprendizaje el
        usuario debe estar registrado.
      </p>
    </div>
  );
}

export default AboutUs;
