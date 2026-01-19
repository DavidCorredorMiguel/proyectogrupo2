import { useEffect, useState } from "react";
import { getCart, updateQuantity, removeProduct } from "../mocks/cartService";
import { useNavigate } from "react-router-dom";
import style from "../styles/Cesta.module.css";

const CestaProduct = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate(); // hook para navegar
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCart(getCart());}, []);
  const handleQuantityChange = (id, value) => {
    const updated = updateQuantity(id, Number(value));
    setCart(updated);
  };
  const handleRemove = (id) => {
    const updated = removeProduct(id);
    setCart(updated);
  };
  // Calcular total general
  const totalGeneral = cart
    .reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
  const handleContinuar = () => {
    navigate("/tarjetaspago"); // navegar a TarjetasPago
  };
  return (
    <div className="container mt-4">
      <h1 className={style.titulopag}>Cesta</h1>
      {cart.length === 0 ? (
        <p>No hay productos en la cesta.</p>
      ) : (
        <table className={style.tablacesta}>
          <thead>
            <tr>
              <th></th>
              <th>Producto</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.id} className={style.tr1cesta}>
                <td className={style.td1cesta}>
                  <img src={item.image} alt={item.name} 
                    className="card-img" style={{ height: '50px' }} />
                </td>
                <td>{item.name}</td>
                <td>{item.price} €</td>
                <td>
                  <input type="number" min="1" value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.id, e.target.value)} 
                      style={{ width: "60px", backgroundColor: "orange" }}
                  />
                </td>
                <td>{(item.price * item.quantity).toFixed(2)}€</td>
                <td>
                  <button className="btn btn-danger" onClick={() => handleRemove(item.id)}>
                    Borrar</button>
                </td>
              </tr>
            ))}
            {/* Fila para total general */}
            <tr className={style.tr2cesta}>
              <td colSpan="4" className="text-end fw-bold">Total General: </td>
              <td className="fw-bold">{totalGeneral} €</td>
              <td>
                <button className="btn btn-success" onClick={handleContinuar}>Continuar</button>
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CestaProduct;
