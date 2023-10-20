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
      productos: [],
      idToCambiar: '',
      estado: 'Aceptado',
      modal: false,
      CantPedido: '',      // Agregar estas propiedades con valores iniciales vacíos
      Id_producto: '',      // Agregar estas propiedades con valores iniciales vacíos
      Id_proveedor: '',    // Agregar estas propiedades con valores iniciales vacíos
    };

    this.handleClickCambiarDetalle = this.handleClickCambiarDetalle.bind(this);
    this.showModalCambiarDetalle = this.showModalCambiarDetalle.bind(this);
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


    fetch("http://localhost:8080/Pedidos/Detalles/Productos")
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
  }

  closeModal() {
    this.setState({
      modal: false,
      idToCambiar: '', // Restablecer el idToCambiar
      estado: 'Aceptado', // Restablecer el estado a Aceptado
    });
  }

  showModalCambiarDetalle = (Id_DetallePedido) => {
    this.setState({
      modal: true,
      idToCambiar: Id_DetallePedido,
    });
  };

  handleClickCambiarDetalle() {
    if (!this.state.CantPedido || !this.state.Id_producto || !this.state.Id_proveedor) {
      toast.error("Por favor, complete todos los campos.", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    let parametros = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        CantPedido: this.state.CantPedido,
        Id_producto: this.state.Id_producto,
        Id_proveedor: this.state.Id_proveedor,
        estado: this.state.estado,
      })
    };

    console.log(parametros.body);

    const url = `http://localhost:8080/Registros/Detalles/${this.state.idToCambiar}`;

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
      })
      .then(
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
            // Al finalizar la modificación, volvemos a invocar el componentDidMount() para recargar nuestro listado
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
      )
      .catch(
        (error) => { console.error('Error:', error); }
      );
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <>
        <div className="container">
          <br />
          <h1 className="">
            <strong>Registro de Pedidos</strong>
          </h1>
          <br />
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
                          <th>Producto</th>
                          <th>Cantidad</th>
                          <th>estado</th>
                          <th>Usuario</th>
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.Detalle_Pedido
                          .filter((detalle) => detalle.nro_pedido === Pedido.nro_pedido)
                          .map((detalle, detalleIndex) => (
                            <tr key={detalleIndex}>
                              <td>{detalle.Id_DetallePedido}</td>
                              <td>{Pedido.NombreProducto}</td>
                              <td>{detalle.CantPedido}</td>
                              <td>{detalle.estado}</td>
                              <td>{detalle.nickname}</td>
                              <td>
                                <button
                                  type="button"
                                  className="btn btn-primary"
                                  onClick={() => this.showModalCambiarDetalle(detalle.Id_DetallePedido)}
                                >
                                  Confirmar
                                </button>
                                <span>{"     "}</span>
                                <button
                                  type="button"
                                  className="btn btn-danger"
                                  onClick={() => this.showModalCambiarDetalle(detalle.Id_DetallePedido)}
                                >
                                  Rechazar
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
            <Modal.Title>Cambiar estado de detalle de pedido</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={this.handleClickCambiarDetalle}>
              <div className="form-group">
                <label htmlFor="estado">Estado</label>
                <select
                  id="estado"
                  name="estado"
                  className="form-control"
                  required
                  value={this.state.estado}
                  onChange={this.handleChange}
                >
                  <option value="Aceptado">Aceptado</option>
                  <option value="Rechazado">Rechazado</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="CantPedido">Cantidad de Pedido</label>
                <input
                  type="text"
                  id="CantPedido"
                  name="CantPedido"
                  className="form-control"
                  value={this.state.CantPedido}
                  onChange={this.handleChange}
                />
              </div>
              <div className="dropdown mg-10">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                  {this.state.nombreProducto || 'Seleccionar Producto'}
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                  {this.state.productos.map((producto, productoIndex) => (
                    <li key={productoIndex}>
                      <a className="dropdown-item" href="#" onClick={() => this.setState({ Id_producto: producto.Id_producto, nombreProducto: producto.NombreProducto })}>
                        {producto.NombreProducto}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>


              <div className="form-group">
                <label htmlFor="Id_proveedor">ID del Proveedor</label>
                <input
                  type="text"
                  id="Id_proveedor"
                  name="Id_proveedor"
                  className="form-control"
                  value={this.state.Id_proveedor}
                  onChange={this.handleChange}
                />
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={this.handleClickCambiarDetalle}>
              Confirmar
            </Button>
            <Button variant="secondary" onClick={this.closeModal}>
              Cancelar
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default Pedidos;
