import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

export class Internal_Empleados_Edit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nickname: '',
      password: '',
      email: '',
      id_rol: '1'
    };
  }


  handleSubmit = (event) => {
    event.preventDefault();
    let Usuario = {
      nickname: this.state.nickname,
      password: this.state.password,
      email: this.state.email,
      id_rol: this.state.id_rol
    }

    let Parametros = {
      method: 'POST',
      body: JSON.stringify(Usuario),
      headers: {
        'Content-Type': 'application/json'
      }
    }

    fetch('http://localhost:8080/usuario/', Parametros)
      .then((res) => {
        return res.json().then((body) => ({
          status: res.status,
          ok: res.ok,
          headers: res.headers,
          body: body,
        }));
      })
      .then((result) => {
        if (result.ok) {
          alert('Éxito');
        } else {
          alert(result.body.message);
        }
      })
      .catch((error) => {
        alert(error.message);
      });
    this.props.navigate('/Empleados');
  };


  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <form onSubmit={this.handleSubmit}>
              <select
                className="form-select"
                id="id_rol"
                aria-label="Default select example"
                onChange={this.handleChange}
                value={this.state.id_rol}
                name="id_rol"
              >
                <option value='1'>Administrador</option>
                <option value='2'>Empleado</option>
              </select>
              <br />
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="floatingNickname"
                  placeholder="Nickname"
                  onChange={this.handleChange}
                  value={this.state.nickname}
                  name="nickname"
                />
                <label htmlFor="floatingNickname">Nickname</label>
              </div>
              <br />
              <div className="form-floating">
                <input
                  type="password"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  onChange={this.handleChange}
                  value={this.state.password}
                  name="password"
                  required
                  minLength={8}
                  maxLength={20}
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  title="Debe contener al menos un número y una letra mayúscula y minúscula, y tener al menos 8 caracteres o más."
                />
                <label htmlFor="floatingPassword">Password</label>
              </div>
              <br />
              <div className="form-floating">
                <input
                  type="email"
                  className="form-control"
                  id="floatingEmail"
                  placeholder="Email"
                  onChange={this.handleChange}
                  value={this.state.email}
                  name="email"
                />
                <label htmlFor="floatingEmail">Email</label>
              </div>
              <br />
              <input className="btn btn-primary" type="submit" value="Guardar" />
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Empleados_Edit

export function Empleados_Edit() {
  const navigate = useNavigate();

  return (
    <>
      <Internal_Empleados_Edit navigate={navigate} />
    </>
  );
}
