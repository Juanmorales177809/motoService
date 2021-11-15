import React from 'react'
import { Row, Container, Col, Form, Dropdown, DropdownButton, Button, Table } from 'react-bootstrap'
import { BsPlus, BsDash } from "react-icons/bs";

function RegVentasPage() {

    const servicios =
        <div>
            <Container fluid>
                <Row>
                    <Col>
                        <Container fluid>
                            <Row>
                                <Col>Fecha</Col>
                                <Col><Form.Control type="date" name='date' /></Col>
                            </Row >
                        </Container>
                    </Col>
                    <Col>
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                            <Form.Label column sm="2">
                                Documento Cliente
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="number" placeholder="Ingrese # documento Cliente" />
                            </Col>
                        </Form.Group>

                    </Col>
                    <Col>
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                            <Form.Label column sm="2">
                                Nombre Cliente
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="text" placeholder="Ingrese nombre de cliente" />
                            </Col>
                        </Form.Group>
                    </Col>
                </Row >
            </Container >
            <br />
            <Container fluid>
                <Row>
                    <Col>
                        <Container fluid>
                            <Row>
                                <Col>Servicio</Col>
                                <Col><DropdownButton variant="" title="Elija un servicio">
                                    <Dropdown.Item as="button">Mantenieminto</Dropdown.Item>
                                    <Dropdown.Item as="button">Cambio de aceite</Dropdown.Item>
                                    <Dropdown.Item as="button">Lavado general</Dropdown.Item>
                                    <Dropdown.Item as="button">Lavado con polishada</Dropdown.Item>
                                    <Dropdown.Item as="button">Desinfección</Dropdown.Item>
                                </DropdownButton></Col>
                            </Row>

                        </Container>
                    </Col>
                    <Col className="align-items-center">
                        Cantidad
                        <Container> <Row >
                            <Col >
                                <BsPlus href="#"></BsPlus>
                            </Col>
                            <Col>
                                <Form.Control type="number" placeholder="" />
                            </Col>
                            <Col>
                                <BsDash href="#"></BsDash>
                            </Col>
                        </Row>
                        </Container>
                    </Col>
                    <Col>
                        <Container>
                            <Row>
                                <Col>Valor Unitario</Col>
                                <Col><Form.Control type="text" /></Col>
                                <Col><Button variant="dark" redirectTo="/">Insertar</Button></Col>
                            </Row>
                        </Container>
                    </Col>
                </Row >
            </Container >

            <Table striped bordered hover>
            <thead>
            <tr>
            <th>ID Servicio</th>
            <th>Servicio</th>
            <th>Cantidad</th>
            <th>Valor Unitario</th>
            <th>Valor Total</th>
            <th>Encargado</th>
            <th>Acción</th>
            </tr>
            </thead>
            <tbody>
            <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td>@mdo</td>
            <td>@mdo</td>
            <td><Button variant="dark"  redirectTo="/">Eliminar</Button></td>            
            </tr>

            </tbody>
            </Table>

            <Button variant="dark"  redirectTo="/">Guardar</Button>
        </div>
    return (
        servicios




    )
}


export default RegVentasPage