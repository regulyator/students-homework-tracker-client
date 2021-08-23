import {Col, Container, ListGroup, Row} from "react-bootstrap";
import {useEffect} from "react";
import {loadAllTeachers} from "../../api/main/TeacherApi";

const {useState} = require("react");
const {Button, Modal} = require("react-bootstrap");

export default function GroupTeachers(props) {
    const [show, setShow] = useState(false);
    const [groupTeachers, setGroupTeachers] = useState(props.teachers);
    const [teachers, setTeachers] = useState([]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        loadAllTeachers().then(teachers => {
            let filteredTeachers = teachers.filter(teacher => !groupTeachers.some(value => value.id === teacher.id));
            setTeachers(filteredTeachers);
        })
    }, [props.teachers]);

    const handleAddTeacher = (teacher) => {
        let newGroupTeachers = [...groupTeachers, teacher];
        let filteredTeachers = teachers.filter(teacher => !newGroupTeachers.some(value => value.id === teacher.id));
        setTeachers(filteredTeachers);
        setGroupTeachers(newGroupTeachers);
    }

    const handleRemoveTeacher = (teacher) => {
        let newTeachers = [...teachers, teacher];
        let filteredTeachers = groupTeachers.filter(teacher => !newTeachers.some(value => value.id === teacher.id));
        setTeachers(newTeachers);
        setGroupTeachers(filteredTeachers);
    }

    return (
        <>
            <Button variant="outline-primary" onClick={handleShow}>
                Преподаватели
            </Button>

            <Modal size="lg" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Преподаватели</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row>
                            <Col md={6}>
                                <h4>Доступные</h4>
                                <ListGroup variant="flush" className="list-group">
                                    {teachers?.map((teacher, idx) => (
                                        <ListGroup.Item eventKey={idx} action
                                                        onDoubleClick={() => handleAddTeacher(teacher)}>{teacher.fio}</ListGroup.Item>
                                    ))}
                                </ListGroup>
                            </Col>
                            <Col md={6}>
                                <h4>Добавленные</h4>
                                <ListGroup variant="flush" className="list-group">
                                    {groupTeachers?.map((teacher, idx) => (
                                        <ListGroup.Item eventKey={idx} action
                                                        onDoubleClick={() => handleRemoveTeacher(teacher)}>{teacher.fio} </ListGroup.Item>
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
                    <Button variant="primary" onClick={() => props.saveGroupTeachers(groupTeachers)}>
                        Сохранить
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
