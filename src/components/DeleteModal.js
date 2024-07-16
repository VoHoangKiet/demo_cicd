import { Modal } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const DeleteModal = ({ show, onHide, onConfirm }) => {
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Patient</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to delete this patient?
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-secondary" onClick={onHide}>Cancel</button>
                <button className="btn btn-danger" onClick={onConfirm}>Delete</button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteModal;
