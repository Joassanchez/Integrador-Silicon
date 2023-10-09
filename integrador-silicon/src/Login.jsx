import React, { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams, useNavigate } from 'react-router-dom';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nickname: '',
            password: '',
        };
    }

    handleSubmit = (event) => {
        event.preventDefault();

        
        let usuario = {
            nickname: this.state.nickname,
            password: this.state.password,
        };

        const parametros = {
            method: 'POST',
            body: JSON.stringify(usuario),
            headers: {
                'Content-Type': 'application/json',
                
            }


        }

        fetch('http://localhost:8080/security/login', parametros)
            .then((res) => res.json())
            .then((result) => {
                if (result.ok) {
                    toast.success('Bienvenido', {
                        position: 'bottom-center',
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'light',
                    });

                    this.props.navigate('/Empleados');
                } else {
                    toast.error(result.body.message, {
                        position: 'bottom-center',
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'light',
                    });
                }
            })
            .catch((error) => {
                toast.error(error.message, {
                    position: 'bottom-center',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                });
            });
    };

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h1>Iniciar Sesión</h1>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-floating">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="nickname"
                                    onChange={this.handleChange}
                                    value={this.state.nickname}
                                    name="nickname"
                                />
                                <label htmlFor="nickname">Usuario</label>
                            </div>
                            <br />

                            <div className="form-floating">
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    onChange={this.handleChange}
                                    value={this.state.password}
                                    name="password"
                                />
                                <label htmlFor="password">Contraseña</label>
                            </div>
                            <br />

                            <input className="btn btn-primary" type="submit" value="Ingresar" />
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default function LoginWrapper() {
    const p = useParams();
    const navigate = useNavigate();

    return (
        <>
            <Login navigate={navigate} params={p} />
        </>
    );
}
