
import { Button, Modal } from 'react-bootstrap'
import { useState } from 'react';


function Eliminar() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    let searching = localStorage.getItem('searching')

    

    const eliminarelemento = () => {
        const productData = {
            id : `${searching}`}
            
        fetch(`http://localhost:3001/delete-venta`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
    });
    handleClose();
    window.location.href = '/ges-ventas'
};


return (
    <>
        <Button style={{paddingTop : '0px', paddingButtom : '0px', paddingLeft :'20px', paddingRight :'20px'}} variant="dark" onClick={handleShow}>
            Eliminar 
        </Button>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Eliminar registro</Modal.Title>
            </Modal.Header>
            <Modal.Body>Está seguro que desea Eliminar este elemento?</Modal.Body>
            <Modal.Footer>
                <Button variant="light" onClick={handleClose}>
                    Cancelar
                </Button>
                <Button variant="dark" onClick={eliminarelemento} >
                    Confirmar
                </Button>
            </Modal.Footer>
        </Modal>
    </>
);
  }
export default Eliminar
