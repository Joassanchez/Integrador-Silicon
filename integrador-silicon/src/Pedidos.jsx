import React, { Component } from 'react';
import { toast } from 'react-toastify';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export class Pedidos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Pedidos: [],
      Detalle_Pedido: [],
      
      idToDelete: '',
    };

    this.handleClickDeleteDetalle = this.handleClickDeleteDetalle.bind(this);
    this.showModalDeleteDetalle = this.showModalDeleteDetalle.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    let parametros = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authorization': sessionStorage.getItem('token'),
      },
    };

    fetch('http://localhost:8080/pedido', parametros)
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
          this.setState({
            Pedidos: result.body,
          });
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
        console.log(error);
      });

    fetch('http://localhost:8080/Pedidos/Detalles')
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
          this.setState({
            Detalle_Pedido: result.body,
          });
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
        console.log(error);
      });
  }

  closeModal() {
    this.setState({
      modal: false,
      idToDelete: null,
    });
  }

  showModalDeleteDetalle = (Id_DetallePedido) => {
    this.setState({
      modal: true,
      idToDelete: Id_DetallePedido,
    });
  };

  handleClickDeleteDetalle() {

    let parametros = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({ idToDelete: this.state.idToDelete })
    }
   
    //this.state.idToDelete se carga cuando abrimos el modal con showModal(vehiculo_id)
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
                    //al finalizar la eliminacion volvemos a invocar el componentDidMount() para recargar nuestro listado
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

  render() {
    return (
      <>
        <div className="container">
          <br></br>
          <h1 className="">
            <strong>Registro de Pedidos</strong>
          </h1>
          <br></br>
          <span>{"   "}</span>
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
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>nro_pedido</th>
                          <th>Estado</th>
                          <th>fecha</th>
                          <th>Usuario</th>
                          <th>Producto</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{Pedido.nro_pedido}</td>
                          <td>{Pedido.estado}</td>
                          <td>{Pedido.fecha}</td>
                          <td>{Pedido.nickname}</td>
                          <td>{Pedido.NombreProducto}</td>
                        </tr>
                      </tbody>
                    </table>
                  </button>
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
                          <th>Id_DetallePedido</th>
                          <th>CantPedido</th>
                          <th>nro_pedido</th>
                          <th>estado</th>
                          <th>fecha</th>
                          <th>nickname</th>
                          <th>nombreProducto</th>
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.Detalle_Pedido
                          .filter((detalle) => detalle.nro_pedido === Pedido.nro_pedido)
                          .map((detalle, detalleIndex) => (
                            <tr key={detalleIndex}>
                              <td>{detalle.Id_DetallePedido}</td>
                              <td>{detalle.CantPedido}</td>
                              <td>{detalle.nro_pedido}</td>
                              <td>{detalle.estado}</td>
                              <td>{detalle.fecha}</td>
                              <td>{detalle.nickname}</td>
                              <td>{Pedido.NombreProducto}</td>
                              <td>
                                <button
                                  type="button"
                                  className="btn btn-primary"
                                  onClick={() => this.showModalDeleteDetalle_venta(detalle.Id_DetallePedido)}
                                >
                                  Editar
                                </button>
                                <span>{"     "}</span>
                                <button
                                  type="button"
                                  className="btn btn-danger"
                                  onClick={() => this.showModalDeleteDetalle(detalle.Id_DetallePedido)}
                                >
                                  Eliminar
                                </button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Modal show={this.state.modal} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmación de Eliminacion</Modal.Title>
          </Modal.Header>
          <Modal.Body>¿Está seguro de eliminar el Detalle seleccionado?</Modal.Body>
          <Modal.Footer>
            <Button variant="info" onClick={this.closeModal}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={this.handleClickDeleteDetalle}>
              Eliminar
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default Pedidos;
