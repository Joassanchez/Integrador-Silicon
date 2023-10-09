import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Menu from './Menu';
import Empleados from './Empleados';
import Empleados_Edit from './Empleados_Edit';
import LoginWrapper from './Login'; // Cambiamos la importación de Login

function App() {
  return (
    <>
      <Menu />
      <Routes>
        <Route path="/" element={<LoginWrapper />} /> {/* Cambiamos el elemento a LoginWrapper */}
        <Route path="/Empleados/*" element={<Empleados />} />
        <Route path="/Empleados_Edit" element={<Empleados_Edit />} />
        <Route path="/login" element={<Navigate to="/" />} /> {/* Agregamos una ruta para redirigir a la página de inicio */}
      </Routes>
    </>
  );
}

export default App;
