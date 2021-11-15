import React, { Component, Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./EditarusuarioStyles.css";


import Form from "react-bootstrap/Form";
import { ElementContext } from "../context/elementContext";

function EditarUsuarioPage() {

  const [users, setServices] = useState([]);
  const [name, setName] = useState([]);
  const [role, setRole] = useState([]);
  const [email, setEmail] = useState([]);
  const [autorizado, setAutorizado] = useState([]);
  const [search, setSearch] = useState([]);
  const [buscar, setbuscar] = useState([]);

  function setRole1(value) {
    setRole(value.target.value);
  }
  function setName1(value) {
    setName(value.target.value);
  }


  function onBuscar() {

    setbuscar(true);

  }


  function setAutorizado1(value, id) {
    let value1 = value.target.value;

    if (value1 == "Autorizado") {
      value1 = "Si";
    } else {
      value1 = "No";
    }
    uppdatePermission(id, value1);
  }
  function setRole1(value, id) {
    setRole(value.target.value);
    console.log(value.target.value);
    console.log(id);
    uppdateRole(id, value.target.value);
  }
  function deleteElement(value, id) {
    deleteUser(id);
    console.log(value.target.value);
    console.log(id);
  }

  const getUsers = async () => {

    try {
      const response = await fetch("http://localhost:3001/get-users");
      const jsonResponse = await response.json();
      const responseServices = jsonResponse.data;

      const usersList = responseServices.map((user) => {
        if (buscar == true) {
          if (search == user.idUsuario) {
            return (

              <tr>
                <th scope="row">{user.idUsuario}</th>
                {/* <td><input type="text" placeholder={user.name} onChange={setName1}  /></td> */}
                <td>{user.name}</td>
                <td>
                  <Form.Select
                    aria-label="Default select example"
                    onChange={(e, id) => {
                      setRole1(e, user.idUsuario);
                    }}
                  >
                    <option>Elija un Rol...</option>
                    <option value="Admin">Administrador</option>
                    <option value="Vendedor">Vendedor</option>
                  </Form.Select>
                </td>
                <td>
                  <Form.Select
                    aria-label="Default select example"
                    onChange={(e, id) => {
                      setAutorizado1(e, user.idUsuario);
                    }}
                  >
                    <option value="No Autorizado"> Pendiente...</option>
                    <option value="Autorizado">Autorizado</option>
                    <option value="No Autorizado">No Autorizado</option>
                  </Form.Select>
                </td>
                <td>{user.email}</td>

                <td>
                  {" "}
                  <button
                    className="btn btn-dark"
                    onClick={(e, id) => {
                      deleteElement(e, user.idUsuario);
                    }}
                  >
                    {" "}
                    Borrar{" "}
                  </button>
                </td>
              </tr>
            )
          }

          if (search == "") {
            setbuscar(false);
            return (

              <tr>
                <th scope="row">{user.idUsuario}</th>
                {/* <td><input type="text" placeholder={user.name} onChange={setName1}  /></td> */}
                <td>{user.name}</td>
                <td>
                  <Form.Select
                    aria-label="Default select example"
                    onChange={(e, id) => {
                      setRole1(e, user.idUsuario);
                    }}
                  >
                    <option>Elija un Rol...</option>
                    <option value="Admin">Administrador</option>
                    <option value="Vendedor">Vendedor</option>
                  </Form.Select>
                </td>
                <td>
                  <Form.Select
                    aria-label="Default select example"
                    onChange={(e, id) => {
                      setAutorizado1(e, user.idUsuario);
                    }}
                  >
                    <option value="No Autorizado"> Pendiente...</option>
                    <option value="Autorizado">Autorizado</option>
                    <option value="No Autorizado">No Autorizado</option>
                  </Form.Select>
                </td>
                <td>{user.email}</td>

                <td>
                  {" "}
                  <button
                    className="btn btn-dark"
                    onClick={(e, id) => {
                      deleteElement(e, user.idUsuario);
                    }}
                  >
                    {" "}
                    Borrar{" "}
                  </button>
                </td>
              </tr>

            )
          }


          if (search !== "user.idUsuario") {


            return (

              <p></p>


            )
          }




        }

        else {
          return (<tr>
            <th scope="row">{user.idUsuario}</th>
            {/* <td><input type="text" placeholder={user.name} onChange={setName1}  /></td> */}
            <td>{user.name}</td>
            <td>
              <Form.Select
                aria-label="Default select example"
                onChange={(e, id) => {
                  setRole1(e, user.idUsuario);
                }}
              >
                <option>Elija un Rol...</option>
                <option value="Admin">Administrador</option>
                <option value="Vendedor">Vendedor</option>
              </Form.Select>
            </td>
            <td>
              <Form.Select
                aria-label="Default select example"
                onChange={(e, id) => {
                  setAutorizado1(e, user.idUsuario);
                }}
              >
                <option value="No Autorizado"> Pendiente...</option>
                <option value="Autorizado">Autorizado</option>
                <option value="No Autorizado">No Autorizado</option>
              </Form.Select>
            </td>
            <td>{user.email}</td>

            <td>
              {" "}
              <button
                className="btn btn-dark"
                onClick={(e, id) => {
                  deleteElement(e, user.idUsuario);
                }}
              >
                {" "}
                Borrar{" "}
              </button>
            </td>
          </tr>)


        }


      }

      );

      setServices(usersList);
      console.log(search)
    } catch (error) {
      console.log(error);
    }
  };


  const uppdateRole = async (id, rolValue) => {
    const productData = {
      idUsuario: id,
      role: rolValue,
    };

    const response = await fetch(`http://localhost:3001/update-user-role`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });
    const jsonResponse = await response.json();
    console.log(jsonResponse);
  };

  const deleteUser = async (id) => {
    const productData = {
      idUsuario: id,
    };

    const response = await fetch(`http://localhost:3001/delete-user`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });
    const jsonResponse = await response.json();
    console.log(jsonResponse);
  };

  const uppdatePermission = async (id, permissionValue) => {
    const productData = {
      idUsuario: id,
      autorizado: permissionValue,
    };

    const response = await fetch(
      `http://localhost:3001/update-user-Permissions`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      }
    );
    const jsonResponse = await response.json();
    console.log(jsonResponse);
  };


  useEffect(() => {
    getUsers();
  });

  return (
    <ElementContext.Consumer>
      {(context) => {
        const { changeBoxValue, active2, active1, active0 } = context;

        return (
          <Fragment>
            <h2 className="te">GESTIÓN DE USUARIOS</h2>
            <div className="row">
              <div className="col ">
                <a className="texti0 te0">Acceso Autorizado </a>
              </div>
            </div>
            <hr className="lin"></hr>


            <div className="input-group " style={{ width: "25%", marginLeft: "10%" }}>
              <input
                type="search"
                className="form-control rounded"
                placeholder="# Usuario"
                aria-label="Search"
                aria-describedby="search-addon"
                style={{ background: "#EFEF91" }}
                onChangeCapture={(e) => {
                  setSearch(e.target.value);
                }}
              />

              &nbsp;&nbsp;&nbsp;
              <button type="button" className="btn btn-dark" onClick={onBuscar}>
                Buscar
              </button>


            </div>

            <table className="table row1">
              <thead className="table-dark ">
                <tr>
                  <th scope="col">id</th>
                  <th scope="col">Nombres</th>
                  <th scope="col">Rol</th>
                  <th scope="col">Permisos</th>
                  <th scope="col">email</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>{users}</tbody>
            </table>



            <button
              type="button"
              className="btn btn-primary but2"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
            >
              {" "}
              Guardar
            </button>

            {/* <-- Modal --> */}
            <div
              className="modal fade"
              id="staticBackdrop"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              tabIndex="-1"
              aria-labelledby="staticBackdropLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="staticBackdropLabel">
                      Modal title
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">...</div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      data-bs-dismiss="modal"
                    >
                      {" "}
                      <Link
                        to="/ges-usuarios"
                        href=""
                        style={{ color: "white", textDecoration: "none" }}
                      >
                        Understood
                      </Link>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <hr className="lin"></hr>

            {/* <-- Modal --> */}
          </Fragment>
        );
      }}
    </ElementContext.Consumer>
  );
}

export default EditarUsuarioPage;