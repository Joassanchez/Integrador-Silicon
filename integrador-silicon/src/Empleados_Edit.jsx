import React, { Component } from 'react'

export class Empleados_Edit extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       nickname : "",
       password : "",
       email : "",
       id_rol: ""
    }
  }
  render() {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col'>
            <form >
              <select className="form-select" id="marca" aria-label="default select example">
                <option selected>Selecciona un Rol</option>
                <option value="1">Administrador</option>
                <option value="2">Empleado</option>
              </select>
              <br />
              <div className='form-floating'>
                <input type="text" className='form-control' id='floatingInput' placeholder='nickname' />
                <label for="floatingInput">Nickname</label>
              
                
              </div>

          </form>
            


          </div>
        </div>
      </div>
    )
  }
}

export default Empleados_Edit