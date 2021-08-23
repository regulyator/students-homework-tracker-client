import "./GroupStudents.css"

import {Col, Container, ListGroup, Row} from "react-bootstrap";
import {useEffect} from "react";
import {loadAllStudents} from "../../api/main/StudentApi";

const {useState} = require("react");
const {Button, Modal} = require("react-bootstrap");

export default function GroupStudents(props) {
    const [show, setShow] = useState(false);
    const [groupStudents, setGroupStudents] = useState(props.students);
    const [students, setStudents] = useState([]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        loadAllStudents().then(students => {
            let filteredStudents = students.filter(student => !groupStudents.some(value => value.id === student.id));
            setStudents(filteredStudents);
        })
    }, [props.students]);

    const handleAddStudent = (student) => {
        let newGroupStudent = [...groupStudents, student];
        let filteredStudents = students.filter(student => !newGroupStudent.some(value => value.id === student.id));
        setStudents(filteredStudents);
        setGroupStudents(newGroupStudent);
    }

    const handleRemoveStudent = (student) => {
        let newStudents = [...students, student];
        let filteredStudents = groupStudents.filter(student => !newStudents.some(value => value.id === student.id));
        setStudents(newStudents);
        setGroupStudents(filteredStudents);
    }

    return (
        <>
            <Button variant="outline-primary" onClick={handleShow}>
                Студенты
            </Button>

            <Modal size="lg" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Студенты</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row>
                            <Col md={6}>
                                <h4>Доступные</h4>
                                <ListGroup variant="flush" className="list-group">
                                    {students?.map((student, idx) => (
                                        <ListGroup.Item eventKey={idx} action
                                                        onDoubleClick={() => handleAddStudent(student)}>{student.fio}</ListGroup.Item>
                                    ))}
                                </ListGroup>
                            </Col>
                            <Col md={6}>
                                <h4>Добавленные</h4>
                                <ListGroup variant="flush" className="list-group">
                                    {groupStudents?.map((student, idx) => (
                                        <ListGroup.Item eventKey={idx} action
                                                        onDoubleClick={() => handleRemoveStudent(student)}>{student.fio} </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Отмена
                    </Button>
                    <Button variant="primary" onClick={() => props.saveGroupStudents(groupStudents)}>
                        Сохранить
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
