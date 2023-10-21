import React, { Component } from 'react';
import { toast } from 'react-toastify';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap';
import jwt_decode from 'jwt-decode';

class Pedidos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Pedidos: [],
      Detalle_Pedido: [],
      Proveedores: [],
      idToCambiar: null,
      estado: 'Aceptado',
      Id_proveedor: '',
      modalEdit: false,
      modal: false,
      idToDelete: null,
    };

    this.handleClickEditDetalle = this.handleClickEditDetalle.bind(this);
    this.showModalEditDetalle = this.showModalEditDetalle.bind(this);
    this.showModalDeleteDetalle = this.showModalDeleteDetalle.bind(this);
    this.showModalDeleteDetalle_venta = this.showModalDeleteDetalle_venta.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    fetch("http://localhost:8080/Pedido")
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
                  Pedidos: result.body,
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


fetch("http://localhost:8080/Pedidos/Detalles/")
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
                  Detalle_Pedido: result.body,
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

fetch("http://localhost:8080/Proveedor")
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
                  Proveedores: result.body,
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

  

  showModalEditDetalle(Id_DetallePedido) {
    this.setState({
      modalEdit: true,
      idToCambiar: Id_DetallePedido,
    });
  }

  showModalDeleteDetalle(idDetallePedido) {
    this.setState({
      modal: true,
      idToDelete: idDetallePedido,
    });
  }

  showModalDeleteDetalle_venta(Id_DetallePedido) {
    this.setState({
      modalEditDetalle: true,
      idToEditDetalle: Id_DetallePedido,
    });
  }

  closeModal() {
    this.setState({
      modal: false,
      modalEdit: false,
      modalEditDetalle: false,
      idToDelete: null,
      idToCambiar: null,
      Id_proveedor: '',
    });
  }

  handleClickEditDetalle() {
    let parametros = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        Id_proveedor: this.state.Id_proveedor,
      })
    };

    const url = `http://localhost:8080/Registros/Detalles/${this.state.idToCambiar}`;

    fetch(url, parametros)
      .then((res) => {
        return res.json().then((body) => {
          return {
            status: res.status,
            ok: res.ok,
            headers: res.headers,
            body: body,
          };
        });
      })
      .then((result) => {
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
          this.closeModal();
          this.fetchDetallePedidos();
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
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  traducirEstado = (estado) => {
  switch (estado) {
    case 1:
      return "En espera";
    case 2:
      return "Aceptado";
    case 3:
      return "Rechazado";
    default:
      return "Desconocido"; 
  }
}


  render() {
    const { Pedidos, Detalle_Pedido, Proveedores, modalEdit, modal, idToDelete, idToCambiar } = this.state;
    var Decoded = jwt_decode(sessionStorage.getItem('token'));
    const nombreROL = Decoded.nombreROL;

    return (
      <div className="container">
        <br />
        <h1 className=""><strong>Registro de Pedidos</strong></h1>
        <br />
        <span>{"   "}</span>
        <div className="accordion" id="accordionExample">
          {Pedidos.map((Pedido, index) => (
            <div className="accordion-item" key={index}>
              <h2 className="accordion-header" id={`heading${index}`}>
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse${index}`}
                  aria-expanded="true"
                  aria-controls={`collapse${index}`}
                >
                  <table className='table table-striped '>
                    <thead>
                      <tr>
                        <th className="bg-info">ID DE PEDIDO</th>
                        <th className="bg-info">FECHA</th>
                        <th className="bg-info">ESTADO</th>
                        <th className="bg-info">USUARIO</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{Pedido.nro_pedido}</td>
                        <td>{Pedido.fecha}</td>
                        <td>{this.traducirEstado(Pedido.estado)}</td>
                        <td>{Pedido.nickname}</td>
                      </tr>
                    </tbody>
                  </table>
                </button>
                {nombreROL === 1 && (
                  <button type="button" className="btn btn-success" onClick={() => this.showModalEditDetalle(Pedido.nro_pedido)}>
                    Modificar Estado
                  </button>
                )}
              </h2>
              <div
                id={`collapse${index}`}
                className="accordion-collapse collapse"
                aria-labelledby={`heading${index}`}
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body overflow-auto">
                  <table className='table table-striped'>
                    <thead>
                      <tr>
                        <th>Número de Pedido</th>
                        <th>ID Detalle Pedido</th>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        {nombreROL === 1 && <th>Opciones</th>}
                      </tr>
                    </thead>
                    <tbody>
                      {Detalle_Pedido
                        .filter((detalle) => detalle.nro_pedido === Pedido.nro_pedido)
                        .map((detalle, detalleIndex) => (
                          <tr key={detalleIndex}>
                            <td>{detalle.nro_pedido}</td>
                            <td>{detalle.Id_DetallePedido}</td>
                            <td>{detalle.NombreProducto}</td>
                            <td>{detalle.CantPedido}</td>
                            {nombreROL === 1 && (
                              <td>
                                <button
                                  type="button"
                                  className="btn btn-primary"
                                  onClick={() => this.showModalDeleteDetalle_venta(detalle.id_detalle_pedido)}
                                >
                                  Editar
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-danger"
                                  onClick={() => this.showModalDeleteDetalle(detalle.id_detalle_pedido)}
                                >
                                  Eliminar
                                </button>
                              </td>
                            )}
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Modal show={modal} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmación de Eliminación</Modal.Title>
          </Modal.Header>
          <Modal.Body>¿Está seguro de eliminar el detalle seleccionado?</Modal.Body>
          <Modal.Footer>
            <Button variant="info" onClick={this.closeModal}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={this.handleClickDeleteDetalle}>
              Eliminar
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={modalEdit} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Modificar Estado del Pedido</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <div className="dropdown mg 10">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                  {this.state.estado}
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                  <li>
                    <a className="dropdown-item" href="#" onClick={() => this.setState({ estado: 'Aceptado' })}>
                      Aceptado
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#" onClick={() => this.setState({ estado: 'Rechazado' })}>
                      Rechazado
                    </a>
                  </li>
                </ul>
              </div>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={this.closeModal}>
              Cancelar
            </Button>
            <Button variant="success" onClick={this.handleClickEditDetalle}>
              Guardar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default Pedidos;
