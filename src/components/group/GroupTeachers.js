import {ListGroup} from "react-bootstrap";

const {useState} = require("react");
const {Button, Modal} = require("react-bootstrap");

export default function GroupTeachers(props) {
    const [show, setShow] = useState(false);
    const [teachers, setTeachers] = useState(props.teachers);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Преподаватели
            </Button>

            <Modal size="lg" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Преподаватели</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Button variant="outline-success" size="sm" className='m-2'>Добавить</Button>
                    <ListGroup variant="flush">
                        {teachers?.map((teacher, idx) => (
                            <ListGroup.Item eventKey={idx}>{teacher.fio}</ListGroup.Item>
                        ))}
                    </ListGroup>
                </Modal.Body>


                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Отмена
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Сохранить
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}