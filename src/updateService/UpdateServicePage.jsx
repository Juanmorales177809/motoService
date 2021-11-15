import React, { Fragment, useEffect, useState } from "react";
import "./UpdateServiceStyle.css";
import { Link } from "react-router-dom";
import apiBaseUrl from "../shared/utils/Api";
import ForbidenComponent from "../shared/components/fordiben/ForbidenComponent";
import { useAuth0 } from "@auth0/auth0-react";
import { Redirect } from "react-router";
import Form from "react-bootstrap/Form";

function UpdateServicePage() {
  const [services, setServices] = useState([]);
  const [validUser, setValidUser] = useState(false);
  const { user, isAuthenticated } = useAuth0();
  const [Valor, setValor] = useState([]);
  const [buscar, setbuscar] = useState();
  const [search, setSearch] = useState([]);
  const [guardar, setGuardar] = useState(true);

  function deleteElement(id) {
    deleteService(id);
    console.log(id);
  }
  const updateService = (id, updateService) => {
    setService(
      service.map((service) => (service.id === id ? updateService : service))
    );
  };

  const [service, setService] = useState({});

  function onBuscar() {
    setbuscar(true);
  }

  const getService = async () => {
    try {
      const response = await fetch("http://localhost:3001/get-Service");
      const jsonResponse = await response.json();
      const responseServices = jsonResponse.data;
      const listservices = responseServices.map((service) => {
        if (buscar === true) {
          if (search == service.id || search == service.detalle) {
            return (
              <tr>
                <th scope="row">{service.id}</th>
                <td>{service.detalle}</td>
                <td>
                  <input
                    name="valor"
                    type="number"
                    onChangeCapture={(e, id) => {
                      uppdateValor(service.id, e.target.value);
                    }}
                    class="form-control pesos"
                    id="inputNombre"
                    placeholder={service.valor}
                  />
                </td>
                <td>
                <Form.Select
                  aria-label="Default select example"
                  onChangeCapture={(e) => {
                    uppdateEstado(service.id, e.target.value);
                  }}
                >
                  <option value={service.estado}> {service.estado}</option>
                  <option value="Activo">Activo</option>
                  <option value="Inactivo">Inactivo</option>
                </Form.Select>
                </td>
                <td>
                  <div className="mb-3">
                    {validUser === true ? (
                      <button
                        onClick={(id) => deleteElement(service.id)}
                        type="button"
                        class="btn btn-dark bot"
                      >
                        {" "}
                        Borrar{" "}
                      </button>
                    ) : (
                      <ForbidenComponent />
                    )}
                  </div>
                </td>
                <div className="mb-3">
                  <td></td>
                </div>
              </tr>
            );
          }
          if (search === "") {
            setbuscar(false);
            return (
              <tr>
                <th scope="row">{service.id}</th>
                <td>{service.detalle}</td>
                <td>
                  <input
                    name="valor"
                    type="number"
                    onChangeCapture={(e, id) => {
                      uppdateValor(service.id, e.target.value);
                    }}
                    class="form-control pesos"
                    id="inputNombre"
                    placeholder={service.valor}
                  />
                </td>
                <td>
                <Form.Select
                  aria-label="Default select example"
                  onChangeCapture={(e) => {
                    uppdateEstado(service.id, e.target.value);
                  }}
                >
                  <option value={service.estado}> {service.estado}</option>
                  <option value="Activo">Activo</option>
                  <option value="Inactivo">Inactivo</option>
                </Form.Select>
                </td>
                <td>
                  <span>
                   
                      {" "}
                      {validUser == true ? (
                        <button type="button" class="btn btn-dark">
                          Guardar
                        </button>
                      ) : (
                        <ForbidenComponent />
                      )}
                  </span>
                </td>
                <div className="mb-3">
                  <td></td>
                </div>
              </tr>
            );
          }
          if (search !== service.id) {
            return <p></p>;
          }
        } else {
          return (
            <tr>
              <th scope="row">{service.id}</th>
              <td>{service.detalle}</td>
              <td>
                <input
                  name="valor"
                  type="number"
                  onChangeCapture={(e, id) => {
                    uppdateValor(service.id, e.target.value);
                  }}
                  class="form-control pesos"
                  id="inputNombre"
                  defaultValue={service.valor}
                />
              </td>
              <td>
                <Form.Select
                  aria-label="Default select example"
                  onChangeCapture={(e) => {
                    uppdateEstado(service.id, e.target.value);
                  }}
                >
                  <option value={service.estado}> {service.estado}</option>
                  <option value="Activo">Activo</option>
                  <option value="Inactivo">Inactivo</option>
                </Form.Select>
              </td>
              <td>
                <div className="mb-3">
                  {validUser == true ? (
                    <button
                      onClick={(id) => deleteElement(service.id)}
                      type="button"
                      class="btn btn-dark bot"
                    >
                      {" "}
                      Borrar{" "}
                    </button>
                  ) : (
                    <ForbidenComponent />
                  )}
                </div>
              </td>
              <div className="mb-3">
                <td></td>
              </div>
            </tr>
          );
        }
      });

      setServices(listservices);
    } catch (error) {
      console.log(error);
    }
  };

  const validateUserRole = async () => {
    const response = await fetch(
      `http://localhost:3001/get-user?email=${user.email}`
    );
    const jsonResponse = await response.json();
    return jsonResponse;
  };

  const grantAccess = async () => {
    let userData;
    if (isAuthenticated) {
      userData = await validateUserRole();
    } else {
      setValidUser(false);
      return;
    }
    if (userData) {
      if (userData.role != "Invited") {
        setValidUser(true);
        localStorage.setItem("state", true);
        await getService();
      } else {
        setValidUser(false);
      }
    } else {
      setValidUser(false);
    }
  };
  const deleteService = async (id) => {
    const productData = {
      id: id,
    };

    const response = await fetch(`http://localhost:3001/delete-service`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });
    const jsonResponse = await response.json();
    console.log(jsonResponse);
  };

  const uppdateValor = async (id, valor) => {
    setGuardar(false);
    const productData = {
      id: id,
      valor: valor,
    };
    console.log(id);
    console.log(valor);
    const response = await fetch(`http://localhost:3001/update-service-value`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });
    const jsonResponse = await response.json();
    console.log(jsonResponse);
  };

  const uppdateEstado = async (id, valor) => {
    setGuardar(false);
    const productData = {
      id: id,
      estado: valor,
    };
    console.log(id);
    console.log(valor);
    const response = await fetch(`http://localhost:3001/update-service-state`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });
    const jsonResponse = await response.json();
    console.log(jsonResponse);
  };

  useEffect(() => {
    grantAccess();
  }, [isAuthenticated, validUser]);

  console.log(search);
  getService();

  return (
    <Fragment>
      <div>
        <hr class="linea"></hr>

        <h2 class="texti">EDITAR SERVICIOS</h2>
        <div className="row">
          <div className="col ">
            <a class="texti0">SERVICIOS</a>
          </div>
        </div>
        <hr class="linea line0"></hr>
        <div class="row row0">
          <div class="col">
            {validUser === true ? (
              <input
                type="search"
                class="form-control inpu"
                placeholder="# Servicio"
                aria-label="Search"
                aria-describedby="search-addon"
                onChangeCapture={(e) => {
                  setSearch(e.target.value);
                }}
              />
            ) : (
              <ForbidenComponent />
            )}
          </div>
          <div class="col">
            {validUser == true ? (
              <button
                type="button"
                class="btn btn-dark but1"
                onClick={onBuscar}
              >
                Buscar
              </button>
            ) : (
              <ForbidenComponent />
            )}
          </div>
        </div>
        <table class="table row1">
          <thead class="table-dark ">
            <tr>
              <th scope="col">Id </th>
              <th scope="col">Servicio</th>
              <th scope="col">Valor</th>
              <th scope="col">Estado</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>{services}</tbody>
        </table>

        {validUser == true ? (
          <Link to="/ges-service">
            {" "}
            <button
              type="button"
              disabled={guardar}
              onClick={setGuardar}
              style={{ marginLeft: "34%", width: "30%" }}
              class="btn btn-dark"
            >
              Guardar
            </button>{" "}
          </Link>
        ) : (
          <ForbidenComponent />
        )}

        <hr class="linea line1"></hr>

        {/* <!-- Button trigger modal --> */}
      </div>
    </Fragment>
  );
}
export default UpdateServicePage;
