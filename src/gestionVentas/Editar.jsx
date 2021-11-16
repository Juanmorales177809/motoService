import { Row, Container, Col, Form, Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

function EditarVentaPage() {
  let searching = localStorage.getItem("searching");

  const [detalle, setDetalle] = useState("");
  const [cantidad, setCantidad] = useState(0);
  const [fechaventa, setFechaVenta] = useState("");
  const [valor, setValor] = useState();
  const [documento, setDocumento] = useState("");
  const [name, setName] = useState("");
  const [responsable, setResponsable] = useState("");
  const [estado, setEstado] = useState("");
  const [ventas, setVentas] = useState([]);
  const [validUser, setValidUser] = useState(false);
  const { user, isAuthenticated } = useAuth0();
  const [search, setSearch] = useState([""]);
  const [seleccion, setSeleccion] = useState([]);
  const [first, setFirst] = useState(0);

  const productData = {
    id: searching,
    detalle: detalle,
    cantidad: cantidad,
    fechaVenta: fechaventa,
    valor: valor,
    documento: documento,
    name: name,
    Responsable: responsable,
    estado: estado,
  };


  
  const getVentas = async () => {
    try {
      const response = await fetch("http://localhost:3001/get-ventas");
      const jsonResponse = await response.json();
      const responseVentas = jsonResponse.data;
      const listVentas = responseVentas.map((venta) => {
        if (venta.id == searching) {
          let date= new Date(venta.fechaVenta);
            
          if(first===0) 
          { 
            // let date1= date.getDay()+ "-" + date.getMonth()+ "-" +date.getFullYear() ;
            let date1= (date.toISOString().slice(0, 19).replace('T', ' ')) ;
            console.log(date1)
            setDetalle(venta.detalle);
            setCantidad(venta.cantidad);
            setFechaVenta( date1);
            setValor(venta.valor);
            setDocumento(venta.documento);
            setName(venta.name);
            setResponsable(venta.Responsable);
            setEstado(venta.estado);
            // console.log(productData);
            setFirst(1); 
            console.log("estoy en el if");
        }
        console.log("se ejecuto get")
     
          return (
            <div>
              <Container fluid>
                <Row>
                  <Col>
                    <Container fluid>
                      <Form.Label style={{ fontWeight: "bold" }}>
                        Fecha
                      </Form.Label>
                      <Row>
                        <Form.Control
                          defaultValue={date}
                          type="date"
                          name="date"
                          onChangeCapture={(e) => setFechaVenta(e.target.value)}
                          style={{ width: "300px", backgroundColor: "#EFEF91" }}
                        />
                      </Row>
                    </Container>
                  </Col>

                  <Col>
                    <Form.Group as={Row} controlId="formPlaintextPassword">
                      <Form.Label style={{ fontWeight: "bold" }}>
                        Documento Cliente
                      </Form.Label>

                      <Form.Control
                        defaultValue={venta.documento}
                        type="number"
                        placeholder="Ingrese # documento Cliente"
                        onChangeCapture={(e) => setDocumento(e.target.value)}
                        style={{ width: "300px", backgroundColor: "#EFEF91" }}
                        
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group
                      as={Row}
                      className="mb-3"
                      controlId="formPlaintextPassword"
                    >
                      <Form.Label style={{ fontWeight: "bold" }}>
                        Nombre Cliente
                      </Form.Label>

                      <Form.Control
                        defaultValue={venta.name}
                        type="text"
                        placeholder="Ingrese nombre de cliente"
                        onChangeCapture={(e) => setName(e.target.value)}
                        style={{ width: "300px", backgroundColor: "#EFEF91" }}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Container>
              <br />
              <Container fluid>
                <Row>
                  <Col>
                    <Container fluid>
                      <Form.Label style={{ fontWeight: "bold" }}>
                        Detalle
                      </Form.Label>
                      <Row>
                        <Form.Control
                          type="text"
                          placeholder=""
                          defaultValue={venta.detalle}
                          onChangeCapture={(e) => setDetalle(e.target.value)}
                          style={{ width: "300px", backgroundColor: "#EFEF91" }}
                          placeholder="Ingrese detalle de venta"
                        />
                      </Row>
                    </Container>
                  </Col>

                  <Col>
                    <Form.Group as={Row} controlId="formPlaintextPassword">
                      <Form.Label style={{ fontWeight: "bold" }}>
                        Cantidad
                      </Form.Label>

                      <Form.Control
                        type="number"
                        defaultValue={venta.cantidad}
                        placeholder=""
                        onChangeCapture ={(e) => setCantidad(e.target.value)}
                        style={{ width: "300px", backgroundColor: "#EFEF91" }}
                        placeholder="Ingrese Cantidad"
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group
                      as={Row}
                      className="mb-3"
                      controlId="formPlaintextPassword"
                    >
                      <Form.Label style={{ fontWeight: "bold" }}>
                        Valor
                      </Form.Label>

                      <Form.Control
                        type="number"
                        onChangeCapture={(e) => setValor(e.target.value)}
                        style={{ width: "300px", backgroundColor: "#EFEF91" }}
                        placeholder="Ingrese Valor"
                        defaultValue={venta.valor}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Container>
              <br />
              <Container fluid>
                <Row>
                  <Col>
                    <Container fluid>
                      <Form.Label style={{ fontWeight: "bold" }}>
                        Responsable
                      </Form.Label>
                      <Row>
                        <Form.Control
                          type="text"
                          placeholder=""
                          onChangeCapture={(e) => setResponsable(e.target.value)}
                          style={{ width: "300px", backgroundColor: "#EFEF91" }}
                          placeholder="Ingrese responsable   "
                          defaultValue={venta.Responsable}
                        />
                      </Row>
                    </Container>
                  </Col>

                  <Col>
                    <Form.Group as={Row} controlId="formPlaintextPassword">
                      <Form.Label style={{ fontWeight: "bold" }}>
                        Estado
                      </Form.Label>

                      <Form.Control
                        type="text"
                        placeholder=""
                        onChangeCapture={(e) => setEstado(e.target.value)}
                        style={{ width: "300px", backgroundColor: "#EFEF91" }}
                        placeholder="Ingrese Estado"
                        defaultValue={venta.estado}
                      />
                    </Form.Group>
                  </Col>
                  <Col></Col>
                </Row>
              </Container>
              <br /> <br />
              
            </div>
          );
        }
      });
      setVentas(listVentas);

      setSeleccion(responseVentas);
    } catch (error) {
      console.log(error);
    }
  };

 

//   const validateUserRole = async () => {
//     getVentas();
//     const response = await fetch(
//       `http://localhost:3001/get-user?email=${user.email}`
//     );
//     const jsonResponse = await response.json();
//     return jsonResponse;
//   };

//   const grantAccess = async () => {
//     getVentas();
//     let userData;
//     if (isAuthenticated) {
//       userData = await validateUserRole();
//     } else {
//       setValidUser(false);
//       return;
//     }
//     if (userData) {
//       if (userData.role != "Invited") {
//         setValidUser(true);
//         localStorage.setItem("state", true);
//         await getVentas();
//       } else {
//         setValidUser(false);
//       }
//     } else {
//       setValidUser(false);
//     }
//   };
  useEffect(() => {
    // grantAccess();
    getVentas();
   
  
  },[isAuthenticated,validUser]);
  console.log(cantidad)
console.log(productData)
const putdata = async (procuctData) => {
    
  const response = await fetch(`http://localhost:3001/update-venta`, {
     method: "PUT",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(productData),
   });
   const jsonResponse = await response.json();
   console.log(productData);
   console.log(first);
  
   
   window.location.href = "/ges-ventas";
 };
 

  return <div>{ventas}
  <Container>
                <Button variant="dark" onClick={putdata}>
                  {" "}
                  Actualizar
                </Button>
              </Container>
  </div>;
}

export default EditarVentaPage;
