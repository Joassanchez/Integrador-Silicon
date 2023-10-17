import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';

function Menu() {
    const navigate = useNavigate();

    const [token, setToken] = useState("");

    useEffect(() => {
        const t = sessionStorage.getItem('token')
        if (t !== token) {
            setToken(t)
        }
    });


    function logout() {
        sessionStorage.removeItem('token');
        setToken("");
        navigate("/");

    }

    // const token = sessionStorage.getItem('token')
    if (token !== "" && token !== null) {
        // var decoded = jwt_decode(token);
        return (
            <>
                <nav className="navbar navbar-expand-lg bg-body-tertiary ">
                    <div className="container">
                        <Link to="/" className='nav-link'> Login</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link to="/Empleados" className='nav-link'> Empleados</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/Ventas" className='nav-link'> Registro Ventas</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/pedido" className='nav-link'> Pedido</Link>
                                </li>
                                <li className="nav-item">

                                    <button className='btn btn-danger' onClick={() => logout()}>
                                        <span className="material-symbols-outlined">
                                            logout
                                        </span>
                                    </button>

                                    

                                </li>

                            </ul>
                        </div>
                    </div>
                </nav>
            </>
        )
    } else {
        return (
            <>
                <nav className="navbar navbar-expand-lg bg-body-tertiary">
                    <div className="container">
                        <Link to="/" className='nav-link'> Login</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                       
                    </div>
                </nav>
            </>
        )
    }

}

export default Menu