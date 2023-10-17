import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import jwt_decode from "jwt-decode";
import { TrashFill, Pencil } from 'react-bootstrap-icons';

export class Pedidos extends Component {
  constructor(props) {
    super(props)

    this.state = {
      Pedidos: [],
      Detalle_Pedido: [],
      Productos: [],
      modal: false
    }
    this.handleClickDelete = this.handleClickDelete.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.showModal = this.showModal.bind(this)
  }


  componentDidMount() {

    let parametros = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authorization': sessionStorage.getItem('token')
      }
    }



    fetch("http://localhost:8080/pedido", parametros)
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
              Pedidos: result.body,
              modal: false
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
    fetch("http://localhost:8080/Pedidos/Detalles")
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
              detalle_venta: result.body,
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
      idToDelete: null
    })
  }

  showModal(nro_pedido) {

    this.setState({
      modal: true,
      idToDelete: nro_pedido
    })
  }


  handleClickDelete() {
    let parametros = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }

    const url = `http://localhost:8080/pedido/${this.state.idToDelete}`
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



  render() {

    var tokenDecoded = jwt_decode(sessionStorage.getItem('token'));
    const rol = tokenDecoded.rol;
    const filas = this.state.Pedidos.map((Pedido, index) => {
      return (
        <tr key={index}>
          <td>{Pedido.nro_pedido}</td>
          <td>{Pedido.estado}</td>
          <td>{Pedido.fecha}</td>
          <td>{Pedido.id_usuario}</td>
          <td>{Pedido.Id_producto}</td>
          <td>
            <Link to={`/pedido/Edit/${Pedido.nro_pedido}`} className='btn btn-primary'>
              <Pencil />
            </Link>


            <button className='btn btn-danger' onClick={() => this.showModal(Pedido.nro_pedido)}>
              <TrashFill />
            </button>

          </td>
        </tr>
      )

    });
    return (
      <>
        <div className='container'>
          <div>
            <table className='table table-hover'>
              <thead>
                <tr>
                  <th>nro_pedido</th>
                  <th>Estado</th>
                  <th>fecha</th>
                  <th>id_usuario</th>
                  <th>Id_producto</th>
                </tr>
              </thead>
              <tbody>
                {filas}
              </tbody>

            </table>

          </div>
          <Link to="/pedido/Edit" className='btn btn-primary'><span className="material-symbols">Nuevo</span></Link>

        </div>

        <Modal show={this.state.modal} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmación de Eliminacion</Modal.Title>
          </Modal.Header>
          <Modal.Body>¿Está seguro de eliminar el usuario seleccionado?</Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={this.closeModal}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={this.handleClickDelete}>
              Eliminar
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );

  }
}

export default Pedidos;