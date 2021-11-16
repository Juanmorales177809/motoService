import { useAuth0 } from "@auth0/auth0-react";
import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Form,
  FormControl,
  Row,
  Container,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import ForbidenComponent from "../shared/components/fordiben/ForbidenComponent";
import { Redirect } from "react-router";
import Eliminar from "./Eliminar";

function GesVentasPage() {
  const [ventas, setVentas] = useState([]);
  const [validUser, setValidUser] = useState(false);
  const { user, isAuthenticated } = useAuth0();
  const [search, setSearch] = useState([""]);
  const [seleccion, setSeleccion] = useState([]);
  const [buscar, setBuscar] = useState(false);

  let sschange = (e) => {
    setSearch(e.target.value);
    localStorage.setItem("searching", search);
    localStorage.getItem("searching");
  };
function setBuscar1(){
    setBuscar(true)
}
  let ssclick = (e) => {
    window.location.href = "/edit-venta";
    localStorage.setItem("searching", search);
    localStorage.getItem("searching");
  };

  let ssdelete = (e) => {
    localStorage.setItem("searching", search);
    localStorage.getItem("searching");
  };

  const seleccion2 = seleccion
    .filter((sel) => sel.id == search)
    .map((venta, key) => (
      <tr>
        <td>{venta.id}</td>
        <td>{venta.detalle}</td>
        <td>{venta.cantidad}</td>
        <td>{new Date(venta.fechaVenta).toLocaleDateString()}</td>
        <td>{venta.valor}</td>
        <td>{venta.documento}</td>
        <td>{venta.name}</td>
        <td>{venta.Responsable}</td>
        <td>{venta.estado}</td>
        <td>
          {" "}
          <Button variant="dark" style={{ height: "40px", padding: "0px" }}>
            <Button
              variant="dark"
              onClick={ssclick}
              style={{
                paddingLeft: "20px",
                paddingRight: "20px",
                paddingButtom: "0px",
                paddingTop: "0px",
              }}
            >
              Editar
            </Button>
          </Button>{" "}
        </td>
        <td>
          {" "}
          <Button
            style={{ height: "40px", padding: "0px" }}
            onClick={ssdelete}
            variant="dark"
          >
            <Eliminar />
          </Button>{" "}
        </td>
      </tr>
    ));

  const getVentas = async () => {
    try {
      const response = await fetch("http://localhost:3001/get-ventas");
      const jsonResponse = await response.json();
      const responseVentas = jsonResponse.data;
      const listVentas = responseVentas.map((venta) => (
        <tr key={venta.id.toString()}>
          <td>{venta.id}</td>
          <td>{venta.detalle}</td>
          <td>{venta.cantidad}</td>
          <td>{new Date(venta.fechaVenta).toLocaleDateString()}</td>
          <td>{venta.valor}</td>
          <td>{venta.documento}</td>
          <td>{venta.name}</td>
          <td>{venta.Responsable}</td>
          <td>{venta.estado}</td>
        </tr>
      ));
      setVentas(listVentas);
      setSeleccion(responseVentas);
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
        await getVentas();
      } else {
        setValidUser(false);
      }
    } else {
      setValidUser(false);
    }
  };
  useEffect(() => {
    grantAccess();
    getVentas();
    setSearch("");
    localStorage.setItem("searching", false);
    localStorage.getItem("searching");
  }, [isAuthenticated, validUser]);

  console.log(buscar)
  if (search === "" || buscar===false) {
    console.log("en blanco");

    console.log(search);
    console.log(seleccion2);

    return (
      <Container>
        <div>
          <hr class="linea"></hr>

          <h2 class="texti">Gestión Ventas</h2>
          <div className="row">
            <div className="col">
              <Button
                variant="dark"
                onClick={(event) => (window.location.href = "/reg-ventas")}
              >
                {" "}
                Registrar nueva venta +{" "}
              </Button>
            </div>
          </div>

          <br />

          <div>
            <span>
              <Form className="d-flex" style={{ paddingLeft: "15px",Width:"150px" }}>
                <Row>
                  <Form.Control
                    style={{ backgroundColor: "#EFEF91" }}
                    size="sm"
                    type="text"
                    placeholder="Order ID"
                    onChangeCapture={(e) => {
                      setSearch(e.target.value);
                    }}
                  />
                </Row>
              </Form>
           
              <button type="button" onClick={setBuscar1} className="btn btn-dark" style={{marginLeft: "210px",marginTop:"-60px" }}>
                Buscar
              </button>
            </span>

            <br />

            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID Venta</th>
                  <th>Servicio</th>
                  <th>Cantidad</th>
                  <th>Fecha Venta</th>
                  <th>Valor</th>
                  <th>Documento cliente</th>
                  <th>Nombre cliente</th>
                  <th>Responsable</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>{ventas}</tbody>
            </Table>
          </div>
        </div>
      </Container>
    );
  } else {
    console.log("digitando");
    console.log(search);
    console.log(seleccion2);

    if (buscar === true) {
        console.log("buscando")
    
      return (
        <Container>
          <div>
            <hr class="linea"></hr>

            <h2 class="texti">Gestión Ventas</h2>
            <div className="row">
              <div className="col">
                <Button
                  variant="dark"
                  onClick={(event) => (window.location.href = "/reg-venta")}
                >
                  {" "}
                  Registrar nueva venta +{" "}
                </Button>
              </div>
            </div>

            <br />

            <div>
              <Form className="d-flex" style={{ paddingLeft: "15px" }}>
                <Row>
                  <Form.Control
                    style={{ backgroundColor: "#EFEF91" }}
                    size="sm"
                    type="text"
                    placeholder="Order ID"
                    defaultValue={search}
                    onChangeCapture={(e) => {
                      setSearch(e.target.value);
                    }}
                  />
                </Row>
              </Form>
              <br />

              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>ID Venta</th>
                    <th>Servicio</th>
                    <th>Cantidad</th>
                    <th>Fecha Venta</th>
                    <th>Valor</th>
                    <th>Documento cliente</th>
                    <th>Nombre cliente</th>
                    <th>Responsable</th>
                    <th>Estado</th>
                    <th>Editar</th>
                    <th>Eliminar</th>
                  </tr>
                </thead>
                <tbody>{seleccion2}</tbody>
              </Table>
            </div>
          </div>
        </Container>
      );
    }
  }
}

export default GesVentasPage;
