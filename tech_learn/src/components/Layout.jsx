import Header from "./Header";
import NavPages from "./NavPages";
import Footer from "./Footer";
import { useTema } from './../mocks/useTema';
import { TemaProvider } from "../contextos/TemaContext";

const Layout = ({ children }) => {
  // Componente que muestra el tema actual (demuestra el uso del contexto)
  function IndicadorTema() {
    const { tema, esOscuro } = useTema();
    return (
      <div className="indicador-tema">
        <i className={`fa-solid ${esOscuro ? "fa-moon" : "fa-sun"}`}></i>
        <span>Tema actual: <strong>{tema}</strong></span>
      </div>
    );
  }
  return (
    <TemaProvider>
      <div className="d-flex flex-column min-vh-100">
        <Header />
        <NavPages />
        <main className="flex-grow-1 container py-4 mb-4">
  {children}
</main>

        <Footer />
      </div>
    </TemaProvider>
  );
};

export default Layout;
