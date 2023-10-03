import React from 'react';
import Menu from "./Menu";
import Empleados from './Empleados';
import Empleado_Edit from './Empleados_Edit';
import { Route, Routes } from 'react-router-dom';
import Login from './Login';

function App() {
  return (
    <>
      <Menu />
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/Empleados" element={<Empleados />}></Route>
        <Route path="/Empleados_Edit" element={<Empleado_Edit />}></Route>
      </Routes>
    </>

  );
}

export default App;
