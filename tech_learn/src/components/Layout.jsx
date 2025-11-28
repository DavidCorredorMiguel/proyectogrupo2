import Header from './Header';
import NavPages from './NavPages';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <NavPages />
      <main className="flex-grow-1 container py-4">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;