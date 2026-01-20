import React from "react";
import { useNavigate } from "react-router-dom";

function FinalizarCompra() {
  const navigate = useNavigate();

  const handleFinish = () => {
    navigate("/");
  };

  return (
    <section
      className="max-w-xs mx-auto my-24 rounded-3xl shadow-xl
      bg-white text-gray-900
      dark:bg-neutral-800 dark:text-white
      transition-colors
      p-5"
    >
      {/* ICONO */}
      <div className="flex justify-center mb-3">
        <div
          className="w-12 h-12 rounded-full bg-green-100 text-green-600
          dark:bg-green-900 dark:text-green-400
          flex items-center justify-center text-xl font-bold"
        >
          ✓
        </div>
      </div>

      {/* TEXTO */}
      <h2 className="text-lg font-semibold text-center mb-1">
        Compra realizada
      </h2>

      <p className="text-center text-sm text-gray-600 to-black mb-5">
        Gracias por su compra.
        <br />
        Su pedido ha sido procesado correctamente.
      </p>
      <div className="text-center">
        <button
          onClick={handleFinish}
          className="btn btn-primary rounded-pill px-4 py-2"
        >
          Volver a inicio
        </button>
      </div>
    </section>
  );
}

export default FinalizarCompra;
