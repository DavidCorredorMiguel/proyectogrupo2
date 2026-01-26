import { mockProducts } from "../mocks/products";
import ProductList from "../components/ProductList";
import "../styles/Home.css";

const Home = () => {
  const destacados = [...mockProducts]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6);

  return (
    <main className="home">
      <section className="home-hero">
        <h1 className="home-hero-title">Bienvenido a Tech-learn</h1>
        <p className="home-hero-subtitle">Los mejores productos al mejor precio</p>
      </section>

      <section className="home-featured">
        <h2 className="home-featured-title">Productos destacados</h2>
        <ProductList showSorting={false}
          products={destacados} 
          showPagination={false} 
          showFilters={false}
        />
      </section>
    </main>
  );
};

export default Home;