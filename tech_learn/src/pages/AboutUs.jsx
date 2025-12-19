import React from "react";
import style from "../styles/AboutUs.module.css";

function AboutUs() {
  return (
    <div className={style.au}>
      <img src="logo.png" alt="" className={style.logoau} />
      <h1>Sobre Nosotros</h1>
      <p>
        Somos una tienda que reune en una sola todo tipo de tecnologías, desde
        electrodomésticos, informática, sonido, hogar, y todo lo que puedas
        necesitar.
      </p>
    </div>
  );
}

export default AboutUs;
