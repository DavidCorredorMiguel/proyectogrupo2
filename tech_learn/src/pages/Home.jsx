import ProductList from '../components/ProductList';
import React from 'react'
import Login from './Login';
import CrearUsuario from './CrearUsuario';
import RecordarPass from './RecordarPass';

const Home = () => {
  return (
    <div>
      {/* Banner/Hero */}
      <section className="bg-primary text-white rounded p-5 mb-4 text-center">
        <h1 className="font-bold text-4xl mb-3">Bienvenido a Tech-learn</h1>
        <p className="text-xl mb-4">Los mejores productos al mejor precio</p>
        <button className="btn btn-light btn-lg hover:scale-105 transition-all">
          Ver productos
        </button>
      </section>
    <>
      <Login></Login>
      <CrearUsuario></CrearUsuario>
      <RecordarPass></RecordarPass>
    </>
      {/* Lista de productos */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Productos destacados</h2>
        <ProductList />
      </section>
    </div>
  );
};

export default Home;