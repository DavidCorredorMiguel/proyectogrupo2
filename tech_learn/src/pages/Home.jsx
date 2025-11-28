import React from 'react'
import Login from './Login';
import CrearUsuario from './CrearUsuario';
import RecordarPass from './RecordarPass';

function Home() {
  return (
    <>
      <Login></Login>
      <CrearUsuario></CrearUsuario>
      <RecordarPass></RecordarPass>
    </>
  )
}

export default Home
