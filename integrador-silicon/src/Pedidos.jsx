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
      CantPedido: 0,
      Id_producto: 0,
    };


    this.handleClickEditDetalle = this.handleClickEditDetalle.bind(this);
    this.handleClickDeleteDetalle = this.handleClickDeleteDetalle.bind(this);
    this.showModalEditDetalle = this.showModalEditDetalle.bind(this);
    this.showModalDeleteDetalle = this.showModalDeleteDetalle.bind(this);
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

  showModalEditDetalle(nro_pedido) {
    this.setState({
      modalEdit: true,
      idToCambiar: nro_pedido,
    });
  }

  showModalDeleteDetalle(Id_DetallePedido) {
    this.setState({
      modal: true,
      idToDelete: Id_DetallePedido,
    });
  }

  closeModal() {
    this.setState({
      modal: false,
      modalEdit: false,
      idToDelete: null,
      idToCambiar: null,
    });
  }

  handleClickEditDetalle() {

    let estadoNum;
    switch (this.state.estado) {
      case 'Aceptado':
        estadoNum = 2;
        break;
      case 'Rechazado':
        estadoNum = 3;
        break;
      default:
        estadoNum = 1;
    }

    let parametros = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        estado: estadoNum,

      }),
    };

    const url = `http://localhost:8080/pedido/${this.state.idToCambiar}`;

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
            position: 'bottom-center',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });
          this.closeModal();
          this.componentDidMount();
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
        console.error('Error:', error);
      });
  }
  handleClickDeleteDetalle() {

    let parametros = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    }
    const url = `http://localhost:8080/Pedidos/Detalles/${this.state.idToDelete}`
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
            (error) => { console.log(error) }
        );
}


  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  traducirEstado = (estado) => {
    switch (estado) {
      case 1:
        return 'En espera';
      case 2:
        return 'Aceptado';
      case 3:
        return 'Rechazado';
      default:
        return 'Desconocido';
    }
  };
 

  render() {
    var Decoded = jwt_decode(sessionStorage.getItem('token'));
    const nombreROL = Decoded.nombreROL;

    return (
      <div className="container">
        <br />
        <h1 className="">
          <strong>Registro de Pedidos</strong>
        </h1>
        <br />
        <span> </span>
        <div className="accordion" id="accordionExample">
          {this.state.Pedidos.map((Pedido, index) => (
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
                  <table className="table table-striped ">
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
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => this.showModalEditDetalle(Pedido.nro_pedido)}
                  >
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
                  <table className="table table-striped">
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
                      {this.state.Detalle_Pedido
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
                                  className="btn btn-danger"
                                  onClick={() => this.showModalDeleteDetalle(detalle.Id_DetallePedido)}
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

        <Modal show={this.state.modal} onHide={this.closeModal}>
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

        <Modal show={this.state.modalEdit} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Modificar Estado del Pedido</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              {this.state.Detalle_Pedido
                .filter((detalle) => detalle.nro_pedido === this.state.idToCambiar)
                .map((detalle, index) => (
                  <div key={index}>
                    <h4>Pedido</h4>
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>Número de Pedido</th>
                          <th>ID Detalle Pedido</th>
                          <th>Producto</th>
                          <th>Cantidad</th>
                          <th>Estado</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{detalle.nro_pedido}</td>
                          <td>{detalle.Id_DetallePedido}</td>
                          <td>{detalle.NombreProducto}</td>
                          <td>{detalle.CantPedido}</td>
                          <td>
                            <div className="dropdown mg-10">
                              <button
                                className="btn btn-secondary dropdown-toggle"
                                type="button"
                                id={`dropdownMenuButton${index}`}
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                {this.state.estado || 'Seleccionar Estado'}
                              </button>
                              <ul className="dropdown-menu" aria-labelledby={`dropdownMenuButton${index}`}>
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
                                <li>
                                  <a className="dropdown-item" href="#" onClick={() => this.setState({ estado: 'En espera' })}>
                                    En espera
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                ))}
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
