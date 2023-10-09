import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export class Empleados extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Empleados: []
    };
  }

  componentDidMount() {
    let parametros = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': sessionStorage.getItem('token')
      }
    };
    fetch('http://localhost:8080/usuario', parametros)
      .then(res => {
        return res.json()
          .then(body => {
            return {
              status: res.status,
              ok: res.ok,
              headers: res.headers,
              body: body
            };
          })
      }).then(
        result => {
          if (result.ok) {
            this.setState({
              Empleados: result.body,

            });
          } else {
            toast.error(result.body.message, {
              position: "bottom-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }
        }
      ).catch(
        (error) => { console.log(error) }
      );
  }
  render() {
    const filas = this.state.Empleados.map((Empleado, index) => {
      return (
        <tr key={index}>
          <td>{Empleado.nickname}</td>
          <td>{Empleado.password}</td>
          <td>{Empleado.email}</td>
          <td>{Empleado.id_rol}</td>
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
