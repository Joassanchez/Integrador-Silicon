import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Menu from './Menu';
import Empleados from './Empleados';
import Empleados_Edit from './Empleados_Edit';
import LoginWrapper from './Login';
import Pedidos from './Pedidos';
import Registros from './Registros';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Venta from './Venta';

function App() {
  return (
    <>

      <Menu />
      <ToastContainer/>
      <Routes>
        <Route path="/" element={<LoginWrapper />} />
        <Route path="/Empleados" element={<Empleados />} />
        <Route path="/Empleados/Edit" element={<Empleados_Edit />} />
        <Route path="/Empleados/Edit/:id_usuario" element={<Empleados_Edit />} />
        <Route path='/pedido' element={<Pedidos/>} />
        <Route path="/Registros" element={<Registros/>} />
        <Route path="/login" element={<Navigate to="/" />} />
        <Route path="/Venta" element={<Venta/>} />
      </Routes>
    </>
  );
}

export default App;
