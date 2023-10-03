import React, { Component } from 'react'

export class Empleados extends Component {
    render() {
        return (
            <>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Apellido</th>
                            <th scope="col">Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Santiago</td>
                            <td>Puto</td>
                            <td>SantiagoPuto@gmail.com</td>
                        </tr>
                    </tbody>
                </table>
            </>
        )
    }
}

export default Empleados