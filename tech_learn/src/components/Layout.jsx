import Header from "./Header";
import NavPages from "./NavPages";
import Footer from "./Footer";
import { TemaProvider } from "../contextos/TemaContext";

const Layout = ({ children }) => {
  return (
    <TemaProvider>
      <div className="d-flex flex-column min-vh-100">
        <Header />
        <NavPages />
        <main className="flex-grow-1">{children}</main>
        <Footer />
      </div>
    </TemaProvider>
  );
};

export default Layout;