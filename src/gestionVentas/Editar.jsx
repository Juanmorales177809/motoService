import { Row, Container, Col, Form, Button, } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';


function EditarVentaPage() {


    let searching = localStorage.getItem('searching')


    const [detalle, setDetalle] = useState('');
    const [cantidad, setCantidad] = useState(0);
    const [fechaventa, setFechaVenta] = useState('');
    const [valor, setValor] = useState();
    const [documento, setDocumento] = useState('');
    const [name, setName] = useState('');
    const [responsable, setResponsable] = useState('');
    const [estado, setEstado] = useState('');
    const [ventas, setVentas] = useState([]);
    const [validUser, setValidUser] = useState(false);
    const { user, isAuthenticated } = useAuth0();
    const [seleccion, setSeleccion] = useState([]);


    const productData = {
        id: `${searching}`,
        detalle: `${detalle}`,
        cantidad: cantidad,
        fechaVenta: `${fechaventa}`,
        valor: valor,
        documento: `${documento}`,
        name: `${name}`,
        Responsable: `${responsable}`,
        estado: `${estado}`,

    }
    const getVentas = async () => {
        try {
            const response = await fetch("http://localhost:3001/get-ventas");
            const jsonResponse = await response.json();
            const responseVentas = jsonResponse.data;
            const listVentas = responseVentas.map((venta) => {
                if (venta.id == searching) { return [venta.detalle, venta.name, venta.fechaVenta, venta.valor, venta.cantidad, venta.documento, venta.Responsable, venta.estado] }
                else {
                    return 0;
                }
            }
            );
            setVentas(listVentas)

            setSeleccion(responseVentas)

        }

        catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        grantAccess();
        getVentas();




    }, [isAuthenticated, validUser]);

    const validateUserRole = async () => {
        const response = await fetch(`http://localhost:3001/get-user?email=${user.email}`);
        const jsonResponse = await response.json();
        return jsonResponse;
    }

    const grantAccess = async () => {
        let userData;
        if (isAuthenticated) {
            userData = await validateUserRole();
        }
        else {
            setValidUser(false);
            return;
        }
        if (userData) {
            if (userData.role != 'Invited') {
                setValidUser(true);
                localStorage.setItem("state", true);
                await getVentas();

            }
            else {
                setValidUser(false);
            }
        }
        else {
            setValidUser(false);
        }
    }




    const putdata = () => {



        fetch(`http://localhost:3001/update-venta`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(productData),
        });
        console.log(productData);
        window.location.href = '/ges-ventas'
    };

    return (

        <div>
            <Container fluid>
                <Row>
                    <Col>
                        <Container fluid>
                            <Form.Label style={{ fontWeight: 'bold' }}>
                                Fecha
                            </Form.Label>
                            <Row>
                                <Form.Control type="date" name='date' onChange={(e) => setFechaVenta(e.target.value)} style={{ width: '300px', backgroundColor: '#EFEF91' }} />
                            </Row >
                        </Container>
                    </Col>

                    <Col>
                        <Form.Group as={Row} controlId="formPlaintextPassword">
                            <Form.Label style={{ fontWeight: 'bold' }} >
                                Documento Cliente
                            </Form.Label>

                            <Form.Control defaultValue={ventas[1]} type="number" placeholder="Ingrese # documento Cliente" onChange={(e) => setDocumento(e.target.value)} style={{ width: '300px', backgroundColor: '#EFEF91' }} style={{ width: '300px', backgroundColor: '#EFEF91' }} />

                        </Form.Group>

                    </Col>
                    <Col>
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                            <Form.Label style={{ fontWeight: 'bold' }}>
                                Nombre Cliente
                            </Form.Label>

                            <Form.Control type="text" placeholder="Ingrese nombre de cliente" onChange={(e) => setName(e.target.value)} style={{ width: '300px', backgroundColor: '#EFEF91' }} />

                        </Form.Group>

                    </Col>

                </Row >
            </Container >
            <br />
            <Container fluid>
                <Row>
                    <Col>
                        <Container fluid>
                            <Form.Label style={{ fontWeight: 'bold' }}>
                                Detalle
                            </Form.Label>
                            <Row>
                                <Form.Control type="text" placeholder="" onChange={(e) => setDetalle(e.target.value)} style={{ width: '300px', backgroundColor: '#EFEF91' }} placeholder="Ingrese detalle de venta" />
                            </Row >
                        </Container>
                    </Col>

                    <Col>
                        <Form.Group as={Row} controlId="formPlaintextPassword">
                            <Form.Label style={{ fontWeight: 'bold' }} >
                                Cantidad
                            </Form.Label>

                            <Form.Control type="number" placeholder="" onChange={(e) => setCantidad(e.target.value)} style={{ width: '300px', backgroundColor: '#EFEF91' }} placeholder="Ingrese Cantidad" />

                        </Form.Group>

                    </Col>
                    <Col>
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                            <Form.Label style={{ fontWeight: 'bold' }}>
                                Valor
                            </Form.Label>

                            <Form.Control type="number" onChange={(e) => setValor(e.target.value)} style={{ width: '300px', backgroundColor: '#EFEF91' }} placeholder="Ingrese Valor" />

                        </Form.Group>

                    </Col>

                </Row >
            </Container >


            <br />

            <Container fluid>
                <Row>
                    <Col>
                        <Container fluid>
                            <Form.Label style={{ fontWeight: 'bold' }}>
                                Responsable
                            </Form.Label>
                            <Row>
                                <Form.Control type="text" placeholder="" onChange={(e) => setResponsable(e.target.value)} style={{ width: '300px', backgroundColor: '#EFEF91' }} placeholder="Ingrese responsable   " />
                            </Row >
                        </Container>
                    </Col>

                    <Col>
                        <Form.Group as={Row} controlId="formPlaintextPassword">
                            <Form.Label style={{ fontWeight: 'bold' }} >
                                Estado
                            </Form.Label>

                            <Form.Control type="text" placeholder="" onChange={(e) => setEstado(e.target.value)} style={{ width: '300px', backgroundColor: '#EFEF91' }} placeholder="Ingrese Estado" />

                        </Form.Group>

                    </Col>
                    <Col></Col>

                </Row >
            </Container >
            <br /> <br />
            <Container>

                <Button variant='dark' onClick={putdata}> Actualizar</Button>
            </Container>
        </div>
    )
}

export default EditarVentaPage
