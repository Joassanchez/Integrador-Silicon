import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export class Menu extends Component {
  render() {
    return (
      <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <Link to="/" className='nav-link'> Inicio</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link to="/Empleados" className='nav-link'> Empleados</Link>
                </li>
                <li className="nav-item">
                  <Link to="/Empleados_edit" className='nav-link'> Empleados_Edit</Link>
                </li>

                <li className="nav-item">
                  <Link to="/Registro_Ventas" className='nav-link'> Registro Ventas</Link>
                </li>
                <li className="nav-item">

                </li>

              </ul>
            </div>
          </div>
        </nav>
      </>
    )
  }
}

export default Menu

