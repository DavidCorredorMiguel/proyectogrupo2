import { useNavigate } from "react-router-dom";
import { mockProducts } from "../mocks/products";
import ProductList from "../components/ProductList";

const Home = () => {
  const navigate = useNavigate();
  const destacados = [...mockProducts]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6);

  return (
    <>
      {/* Banner/Hero */}
      <section className="bg-primary text-white rounded p-5 mb-4 text-center">
        <h1 className="font-bold text-4xl mb-3">Bienvenido a Tech-learn</h1>
        <p className="text-xl mb-4">Los mejores productos al mejor precio</p>
        <button className="btn btn-light btn-lg hover:scale-105 transition-all"
        onClick={() => navigate("/productos")}
        >
          Ver productos
        </button>
      </section>
      {/* Lista de productos */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Productos destacados</h2>
        <ProductList products={destacados} />
      </section>
    </>
  );
};

export default Home;
