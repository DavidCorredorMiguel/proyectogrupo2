import React from "react";
import { useNavigate } from "react-router-dom";

function FinalizarCompra() {
  const navigate = useNavigate();

  const handleFinish = () => {
    navigate("/");
  };

  return (
    <>
      <div className="container mt-5 text-center">
        <h2>Compra realizada</h2>
        <p>Gracias por su compra.</p>
        <button onClick={handleFinish} className="btn btn-primary mt-3">
          Volver a inicio
        </button>
      </div>
    </>
  );
}

export default FinalizarCompra;
