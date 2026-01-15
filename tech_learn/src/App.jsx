import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RecordarPass from "./pages/RecordarPass";
import DetallesProducto from "./pages/DetallesProducto";
import Cesta from "./pages/Cesta";
import TarjetasPago from "./pages/TarjetasPago";
import FinalizarCompra from "./pages/FinalizarCompra";
import TarjetasAprender from "./pages/TarjetasAprender";
import CreaEditaTarjeta from "./pages/CreaEditaTarjeta";
import AboutUs from "./pages/AboutUs";
import Chatbot from "./components/Chatbot";
import Productos from "./pages/Productos";
import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/recordarpass" element={<RecordarPass />} />
          <Route path="/producto/:id" element={<DetallesProducto />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/cesta" element={<Cesta />} />
          <Route path="/tarjetaspago" element={<TarjetasPago />} />
          <Route path="/creaeditatarjeta" element={<CreaEditaTarjeta />} />
          <Route path="/finalizarcompra" element={<FinalizarCompra />} />
          <Route path="/tarjetasaprender" element={<TarjetasAprender />} />
          <Route path="/aboutus" element={<AboutUs />} />
        </Routes>
        {/* Aquí añadimos el chatbot */}
        <Chatbot />
      </Layout>
    </BrowserRouter>
  );
};

export default App;