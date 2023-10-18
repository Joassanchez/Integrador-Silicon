import React, { Component, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap-icons/font/bootstrap-icons.css'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import jwt_decode from "jwt-decode";


export class Venta extends Component {

    constructor(props) {
        super(props)

        this.state = {

            productos: [],
            crearVenta: [],
            detallesVenta: [],
            Metodo_Pago: [],
            modal: false,
            

            CantVenta: '',
            NombredelProducto: '',
            precioProducto: '',
            
        }

        this.showModalConfirmar = this.showModalConfirmar.bind(this);
        this.closeModal = this.closeModal.bind(this);

    }

    componentDidMount() {


        fetch("http://localhost:8080/Registros/Detalles/Productos")
            .then(res => {
                return res.json()
                    .then(body => {
                        console.log(body)
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
                            productos: result.body,
                            //siempre que se monta el componente el modal tiene que estar cerrado
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

        fetch("http://localhost:8080/Registros")
            .then(res => {
                return res.json()
                    .then(body => {
                        console.log(body)
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
                            crearVenta: result.body,
                            //siempre que se monta el componente el modal tiene que estar cerrado
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

        fetch("http://localhost:8080/Registros/Metodo_Pago")
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
                            Metodo_Pago: result.body,
                            //siempre que se monta el componente el modal tiene que estar cerrado
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

    /*showModalConfirmar(idEmpleado){
        
        this.setState({

            modal: true,
            
        })
    }*/

    closeModal() {
        this.setState({

            modal: false,
            idEmpleado: null,
        })
    }

    CrearVenta() {
        const detallesVentaActual = [...this.state.detallesVenta];
        const numeroVenta = this.state.crearVenta.length > 0 ? this.state.crearVenta[this.state.crearVenta.length - 1].nro_venta + 1 : 1;


        this.setState({
            detallesVenta: detallesVentaActual,
            elnumero: numeroVenta
        })

    }


    eliminarTodo() {

    }

    eliminarProducto(IdProducto) {
        const detallesVentaActual = [...this.state.detallesVenta];
        const productoIndex = detallesVentaActual.findIndex(detalle => detalle.Id_producto === IdProducto);

        if (productoIndex !== -1) {
            // Elimina el producto del array proporcionando el índice y la cantidad de elementos a eliminar (1)
            detallesVentaActual.splice(productoIndex, 1);
        }

        this.setState({
            detallesVenta: detallesVentaActual,
        });
    }

    decrementarProducto(IdProducto) {
        const detallesVentaActual = [...this.state.detallesVenta];
        const productoIndex = detallesVentaActual.findIndex(detalle => detalle.Id_producto === IdProducto);

        if (productoIndex !== -1 && detallesVentaActual[productoIndex].CantVenta > 1) {
            detallesVentaActual[productoIndex].CantVenta -= 1;

            this.setState({
                detallesVenta: detallesVentaActual,
            });
        }
    }

    agregarProducto(Id_Producto, NombreProducto, precio_unitario) {
        const detallesVentaActual = [...this.state.detallesVenta];
        const productoIndex = detallesVentaActual.findIndex(detalle => detalle.Id_producto === Id_Producto);

        let montoTotal = this.state.CantVenta * precio_unitario;

        if (productoIndex !== -1) {
            detallesVentaActual[productoIndex].CantVenta += 1;
            detallesVentaActual[productoIndex].monto = detallesVentaActual[productoIndex].CantVenta * precio_unitario;
        } else {
            // Si el producto no está en detallesVenta, agrégalo con cantidad 1
            detallesVentaActual.push({
                Id_producto: Id_Producto,
                CantVenta: 1,
                NombredelProducto: NombreProducto,
                precioProducto: precio_unitario,

            });
        }

        this.setState({
            Id_producto: Id_Producto,
            detallesVenta: detallesVentaActual,
            CantVenta: this.state.CantVenta + 1,
            NombredelProducto: NombreProducto,
            precioProducto: precio_unitario,

        });
    }

    handleClickCargarVenta() {

        let parametros = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({

                id_metodo: this.state.metodoDePagoSeleccionado, //si o si se debe seleccionar un producto pero es un error, CAMBIAR
                id_usuario: this.state.idEmpleado
            })
        };

        console.log(parametros.body)

        const url = `http://localhost:8080/Registros/Detalles/${this.state.idToEditDetalle}`

        fetch(url, parametros)
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
                        toast.success(result.body.message, {
                            position: "bottom-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                        //al finalizar la modificacion volvemos a invocar el componentDidMount() para recargar nuestro listado

                        this.closeModal();
                        this.componentDidMount();
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
                (error) => { console.error('Error:', error); }
            );
    }

    render() {

        var tokenDecoded = jwt_decode(sessionStorage.getItem('token'));
        const nombreEmpleado = tokenDecoded.nickname
        const idEmpleado = tokenDecoded.usuarioID

        return (
            
            <div className='col-12 mt-5'>
                <div className='col-5 ms-5 p-4 fs-3'>
                    Empleado: {nombreEmpleado}
                </div>
                <div className='d-flex justify-content-around'>
                    <div className='col-5 bg-light text-dark mg-2'>
                        <div className='p-3 bg-warning fs-2 text-dark col-12 '>
                            <div className="row justify-content-between">
                                <div className="col-4">
                                    Venta
                                </div>
                                <div className="col-4 text-end">
                                    <button
                                        type="button"
                                        className="btn btn-lg btn-dark"
                                        onClick={() => this.CrearVenta()}
                                    >
                                        <i class="bi bi-clipboard-plus"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="p-3 mt-4 fs-3">
                            Productos:
                        </div>
                        <div className='col-12 p-3 fs-4 me-5'>
                            <table className='table table-hover '>
                                <tbody>
                                    {this.state.productos.map(producto => (
                                        <tr key={producto.id}>
                                            <td className='align-items-center fs-5'>{producto.NombreProducto}</td>
                                            <td className='text-center'>
                                                <button
                                                    type="button"
                                                    className="btn btn-primary"
                                                    onClick={() => this.agregarProducto(producto.Id_producto, producto.NombreProducto, producto.precio_venta)}
                                                >
                                                    <i className="bi bi-plus-circle"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className='col-5 bg-light '>
                        <div className='p-3 bg-warning fs-2 text-dark col-12 '>
                            <div className="row justify-content-between">
                                <div className="col-5">
                                    Detalles de la Venta
                                </div>
                                <div className="col-3 text-end">
                                    <button
                                        type="button"
                                        className="btn btn-lg btn-dark"
                                        onClick={() => this.CrearVenta()}
                                    >
                                        <i class="bi bi-trash3"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="row justify-content-start">
                            <div className="col-2 p-2 ms-4 fs-3">
                                Venta
                            </div>
                            <div className="col-2 ms-4 p-2 fs-4">
                                <div className=' p-6 fs-5'>{this.state.elnumero}</div>
                            </div>
                        </div>
                        <div className="col-2 ms-4 fs-3">
                            Detalles:
                        </div>
                        <div className="col-12 p-3 fs-4">
                            <table className='table table-hover '>
                                <tbody>
                                    {this.state.detallesVenta.map(detalles => (
                                        <tr key={detalles.id}>
                                            <td className='align-items-center fs-5'>{detalles.NombredelProducto}</td>
                                            <td className='align-items-center fs-5'>{"$"}{detalles.precioProducto}</td>
                                            <td className='align-items-center fs-5'>{detalles.CantVenta}</td>
                                            <td className='text-end'>
                                                <button
                                                    type="button"
                                                    className="btn btn-dark me-3"
                                                    onClick={() => this.decrementarProducto(detalles.Id_producto)}
                                                >
                                                    <i class="bi bi-dash-circle"></i>
                                                </button>

                                                <button
                                                    type="button"
                                                    className="btn btn-danger"
                                                    onClick={() => this.eliminarProducto(detalles.Id_producto)}
                                                >
                                                    <i class="bi bi-trash3"></i>
                                                </button>
                                            </td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="dropdown col-10 justify-content-center align-items-end">
                                <button className="btn btn-success dropdown-toggle col-6" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    {this.state.nombreMetodo || 'Seleccionar Método'}
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    {this.state.Metodo_Pago.map((metodo, index) => (
                                        <li key={index}>
                                            <a className="dropdown-item" href="#" onClick={() => this.setState({ metodoDePagoSeleccionado: metodo.id_metodo, nombreMetodo: metodo.NombrePago })}>
                                                {metodo.NombrePago}
                                            </a>
                                        </li>//El a es lo que nos da el warning
                                    ))}
                                </ul>
                            </div>

                        </div>
                    </div>
                </div>
                <div class="container text-center col-5">
                    <div class="row align-items-center m-5">
                        <div class="col">
                            <Button variant="primary col-12" onClick={this.showModalConfirmar(idEmpleado)}>
                                Cargar Venta
                            </Button>
                        </div>
                    </div>
                </div>

                <Modal show={this.state.modal} onHide={this.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirmación</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Desea crear esta Venta ?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={this.closeModal}>
                            Cancelar
                        </Button>
                        <Button variant="primary" onClick={this.handleClickCargarVenta}>
                            Guardar
                        </Button>

                    </Modal.Footer>
                </Modal>
            </div>

        )
    }
}

export default Venta