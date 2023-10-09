import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Menu from './Menu';
import Empleados from './Empleados';
import Empleados_Edit from './Empleados_Edit';
import LoginWrapper from './Login'; 

function App() {
  return (
    <>
      <Menu />
      <Routes>
        <Route path="/" element={<LoginWrapper />} /> 
        <Route path="/Empleados/*" element={<Empleados />} />
        <Route path="/Empleados_Edit" element={<Empleados_Edit />} />
        <Route path="/login" element={<Navigate to="/" />} /> 
      </Routes>
    </>
  );
}

export default App;
