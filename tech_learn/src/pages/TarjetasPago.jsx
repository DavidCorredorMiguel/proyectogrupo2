import React, { useState } from "react";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import { useNavigate } from "react-router-dom";

const TarjetasPago = () => {
  const [state, setState] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (e) => {
    setState((prev) => ({ ...prev, focus: e.target.name }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/finalizarcompra");
  };

  return (
    <section className="max-w-sm mx-auto my-16 bg-white rounded-2xl shadow-xl p-4 flex flex-col gap-4">
      {/* TARJETA */}
      <div className="flex justify-center  to-black p-6 rounded-xl relative top-3">
        <Cards
          number={state.number}
          expiry={state.expiry}
          cvc={state.cvc}
          name={state.name}
          focused={state.focus}
        />
      </div>

      {/* FORMULARIO */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="number"
          placeholder="Número de tarjeta"
          value={state.number}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          className="px-4 py-2 rounded-lg border border-gray-300 bg-white
text-gray-800 placeholder-gray-400
focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex gap-3">
          <input
            type="text"
            name="expiry"
            placeholder="MM/AA"
            value={state.expiry}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            className="w-1/2 px-4 py-2 rounded-lg border border-gray-300 bg-white
text-gray-800 placeholder-gray-400
focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            name="cvc"
            placeholder="CVC"
            value={state.cvc}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            className="w-1/2 px-4 py-2 rounded-lg border border-gray-300 bg-white
text-gray-800 placeholder-gray-400
focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <input
          type="text"
          name="name"
          placeholder="Nombre del titular"
          value={state.name}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          className="px-4 py-2 rounded-lg border border-gray-300 bg-white
text-gray-800 placeholder-gray-400
focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="btn btn-primary rounded-pill px-4 py-2"
        >
          Pagar ahora
        </button>
      </form>
    </section>
  );
};

export default TarjetasPago;
