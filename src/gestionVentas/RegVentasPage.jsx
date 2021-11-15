import { Row, Container, Col, Form, Button } from 'react-bootstrap';
import React, { useState } from 'react';

function RegVentasPage () {


    const [detalle, setDetalle] = useState('');
    const [cantidad, setCantidad] = useState(0);
    const [fechaventa, setFechaVenta] = useState('');
    const [valor, setValor] = useState();
    const [documento, setDocumento] = useState('');
    const [name, setName] = useState('');
    const [responsable, setResponsable] = useState('');
    const [estado, setEstado] = useState('');

    const productData = {
        detalle: `${detalle}`,
        cantidad: cantidad,
        fechaVenta: `${fechaventa}`,
        valor: valor,
        documento: `${documento}`,
        name: `${name}`,
        Responsable: `${responsable}`,
        estado: `${estado}`,

    }

    const postData = () => {



        fetch(`http://localhost:3001/add-venta`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(productData),
        });
        console.log(productData);



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

                            <Form.Control type="number" placeholder="Ingrese # documento Cliente" onChange={(e) => setDocumento(e.target.value)} style={{ width: '300px', backgroundColor: '#EFEF91' }} style={{ width: '300px', backgroundColor: '#EFEF91' }} />

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
                                <Form.Control type="text" placeholder="" onChange={(e) => setResponsable(e.target.value)} style={{ width: '300px', backgroundColor: '#EFEF91' }} placeholder="Ingrese responsable" />
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
            <br />
            <br /><br />
            <Container>

                <Button onClick={event => window.location.href = '/ges-ventas'} variant="dark"> <Button variant="dark" onClick={postData}>Guardar </Button></Button>

            </Container>
        </div >
    )
}

export default RegVentasPage 