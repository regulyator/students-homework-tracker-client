import {Button, Modal, ListGroup, Accordion} from "react-bootstrap";
import {useEffect, useState} from "react";
import moment from "moment";
import {loadAllGroupHomeWork} from "../../api/main/HomeworkApi";
import GroupEdit from "../group/GroupEdit";
import HomeworkEdit from "./HomeworkEdit";

export default function Homeworks(props) {
    const [fullscreen, setFullscreen] = useState(true);
    const [show, setShow] = useState(false);
    const [group, setGroup] = useState(props.group);
    const [homeworks, setHomeworks] = useState([]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        if (group.id !== null) {
            loadAllGroupHomeWork(group.id)
                .then(homeworks => {
                    console.log(homeworks)
                    setHomeworks(homeworks)
                })
        }
    }, [props.group.id]);

    const addHomework = (event) => {
        setHomeworks([...homeworks, {id: null,
            homeworkName: 'НОВАЯ ДОМАШНЯЯ РАБОТА',
            homeworkDescription: '',
            homeworkTag: '',
            homeworkStart: group.groupStart,
            homeworkEnd: group.groupEnd,
            groupId: group.id,
            students: []}])
    }


    return (
        <>
            <Button variant="outline-primary" onClick={handleShow}>
                Домашние работы
            </Button>

            <Modal size="lg" show={show} fullscreen={fullscreen} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{"Домашние работы группы: " + (group.id !== null ?
                        (group?.course?.courseName
                            + " ("
                            + moment(group.groupStart).format('DD.MM.YYYY')
                            + " - "
                            + moment(group.groupEnd).format('DD.MM.YYYY')
                            + ")") : 'НОВАЯ ГРУППА')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Button variant="outline-success" size="sm" className='mt-1 mb-1' onClick={addHomework}>Добавить</Button>
                    <Accordion defaultActiveKey="0">
                        {homeworks?.map((homework, idx) => (
                            <Accordion.Item eventKey={idx}>
                                <Accordion.Header>{homework.homeworkName}
                                </Accordion.Header>
                                <Accordion.Body>
                                    <HomeworkEdit homework={homework}/>
                                </Accordion.Body>
                            </Accordion.Item>
                        ))}
                    </Accordion>
                </Modal.Body>
            </Modal>
        </>
    );
}
