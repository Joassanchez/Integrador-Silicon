import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Empleados extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Empleados: []
    };
  }

  componentDidMount() {
    fetch('http://localhost:8080/usuario')
      .then(res => res.json())
      .then(result => {
        this.setState({
          Empleados: result
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    const filas = this.state.Empleados.map((Empleado, index) => {
      return (
        <tr key={index}>
          <td>{Empleado.nickname}</td>
          <td>{Empleado.password}</td>
          <td>{Empleado.email}</td>
          <td>{Empleado.NombreRol}</td>
        </tr>
      );
    });

    return (
      <>
        <Link to="/Empleados_Edit">
          <button className="btn btn-primary">Nuevo</button>
        </Link>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Nickname</th>
              <th scope="col">contraseña</th>
              <th scope="col">Email</th>
              <th scope="col">Rol</th>
            </tr>
          </thead>
          <tbody>{filas}</tbody>
        </table>
      </>
    );
  }
}

export default Empleados;
