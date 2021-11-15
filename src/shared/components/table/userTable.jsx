import React from "react";


const userTable = () => {

    return (

        <table class="table row1">
                <thead class="table-dark ">
                    <tr>
                        <th scope="col">Id Servicio</th>
                        <th scope="col">Servicio</th>
                        <th scope="col">Valor</th>
                        <th scope="col">Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {services}
                </tbody>
            </table>
    )
}