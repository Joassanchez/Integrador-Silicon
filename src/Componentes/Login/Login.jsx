import React from 'react';
import './Login.css'

export const Login = () => {

    const [usuario, setUsuario] = useState("")
    const [contraseña, setContraseña] = useState("")

    return (
        <body>
            <section>
                <h2 className="Titulo">Heladeria Los Copos</h2>
                <form className="formulario">
                    <h1>Login</h1>
                    <a>Usuario</a>
                    <input className="conteiner" type='text' placeholder="  Ingrese Usuario" 
                        value ={usuario}
                        onChange={e => setUsuario(e.trget.value)}
                    />

                    <a>Contraseña</a>
                    <input className="conteiner" type='password' placeholder="  Ingrese Contraseña" 
                        value ={contraseña}
                        onChange={e => setContraseña(e.trget.value)}
                    />

                    <button className="buttonIngresar" type="button" >Ingresar</button>
                </form>
            </section>
        </body>
    )
}
