import { useEffect, useState } from "react";
import { getCart, updateQuantity, removeProduct } from "../mocks/cartService";
import { useNavigate } from "react-router-dom";

const CestaProduct = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setCart(getCart());
  }, []);

  const handleQuantityChange = (id, value) => {
    const updated = updateQuantity(id, Number(value));
    setCart(updated);
  };

  const handleRemove = (id) => {
    const updated = removeProduct(id);
    setCart(updated);
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleContinuar = () => {
    navigate("/tarjetaspago");
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4 fw-bold">🛒 Tu cesta</h2>

      {cart.length === 0 ? (
        <div className="alert alert-info">No hay productos en la cesta.</div>
      ) : (
        <div className="row">
          {/* LISTA PRODUCTOS */}
          <div className="col-lg-8">
            {cart.map((item) => (
              <div key={item.id} className="card mb-3 shadow-sm border"
>
                <div className="card-body">
                  <div className="row align-items-center">
                    {/* IMAGEN */}
                    <div className="col-3 col-md-2">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="img-fluid rounded"
                      />
                    </div>

                    {/* INFO */}
                    <div className="col-9 col-md-6">
                      <h6 className="mb-1 fw-semibold">{item.name}</h6>
                      <p className="text-muted mb-2">
                        Precio unitario: {item.price} €
                      </p>

                      <div className="d-flex align-items-center gap-2">
                        <label className="small">Cantidad:</label>
                        <select
                          value={item.quantity}
                          onChange={(e) =>
                            handleQuantityChange(item.id, e.target.value)
                          }
                          className="form-select form-select-sm w-auto"
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((q) => (
                            <option key={q} value={q}>
                              {q}
                            </option>
                          ))}
                        </select>

                        <button
                          className="btn btn-danger btn-sm ms-3"
                          onClick={() => handleRemove(item.id)}
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>

                    {/* PRECIO */}
                    <div className="col-md-4 text-md-end mt-3 mt-md-0">
                      <span className="fw-bold fs-5">
                        {(item.price * item.quantity).toFixed(2)} €
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* RESUMEN STICKY */}
          <div className="col-lg-4">
            <div className="card shadow-sm sticky-top" style={{ top: "100px" }}>
              <div className="card-body">
                <h5 className="card-title fw-bold mb-3">Resumen del pedido</h5>

                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal</span>
                  <span>{subtotal.toFixed(2)} €</span>
                </div>

                <div className="d-flex justify-content-between mb-2">
                  <span>Envío</span>
                  <span className="text-success">Gratis</span>
                </div>

                <hr />

                <div className="d-flex justify-content-between fw-bold fs-5 mb-4">
                  <span>Total</span>
                  <span>{subtotal.toFixed(2)} €</span>
                </div>

                <button
                  className="btn btn-warning w-100 rounded-pill fw-semibold"
                  onClick={handleContinuar}
                >
                  Proceder al pago
                </button>

                <p className="text-muted small mt-3">
                  Pedido seguro · Devoluciones fáciles
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CestaProduct;
