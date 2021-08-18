import {Button, Modal, ListGroup, Accordion, Form, ButtonGroup, Tabs, Tab} from "react-bootstrap";
import {useEffect, useState} from "react";
import moment from "moment";
import {loadAllGroupHomeWork, saveHomework} from "../../api/main/HomeworkApi";
import GroupEdit from "../group/GroupEdit";
import GroupTeachers from "../group/GroupTeachers";
import GroupStudents from "../group/GroupStudents";
import {saveGroup} from "../../api/main/GroupApi";

export default function HomeworkEdit(props) {
    const [fullscreen, setFullscreen] = useState(true);
    const [show, setShow] = useState(false);
    const [homework, setHomework] = useState(props.homework);
    const [homeworkName, setHomeworkName] = useState(props.homework.homeworkName);
    const [homeworkDescription, setHomeworkDescription] = useState(props.homework.homeworkDescription);
    const [homeworkTag, setHomeworkTag] = useState(props.homework.homeworkTag);
    const [homeworkStart, setHomeworkStart] = useState(props.homework.homeworkStart);
    const [homeworkEnd, setHomeworkEnd] = useState(props.homework.homeworkEnd);
    const [homeworkStudents, setHomeworkStudents] = useState(props.homework.students);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSave = (event) => {
        event.preventDefault();
        saveHomework(homework).then(homework => setHomework(homework));
    }

    const handleChangeName = (event) => {
        let newName = event.target.value;
        setHomeworkName(newName);
        homework.homeworkName = newName;
    }

    const handleChangeTag = (event) => {
        let newTag = event.target.value;
        setHomeworkTag(newTag);
        homework.homeworkTag = newTag;
    }

    const handleChangeDescription = (event) => {
        let newDescription = event.target.value;
        setHomeworkDescription(newDescription);
        homework.homeworkDescription = newDescription;
    }

    const handleChangeDateStart = (event) => {
        let newDateStart = event.target.value;
        setHomeworkStart(newDateStart);
        homework.groupStart = newDateStart;
    }

    const handleChangeDateEnd = (event) => {
        let newDateEnd = event.target.value;
        setHomeworkEnd(newDateEnd);
        homework.groupEnd = newDateEnd;
    }


    return (
        <Tabs defaultActiveKey="main" id="uncontrolled-tab-example" className="mb-3">
            <Tab eventKey="main" title="Основные данные">
                <Form onSubmit={handleSave}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Наименование домашней работы</Form.Label>
                        <Form.Control type="text" placeholder="Наименование домашней работы" value={homeworkName} onChange={handleChangeName}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Метка домашней работы</Form.Label>
                        <Form.Control type="text" placeholder="Метка домашней работы" value={homeworkTag} onChange={handleChangeTag}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Описание домашней работы</Form.Label>
                        <Form.Control as="textarea" rows={3} value={homeworkDescription} onChange={handleChangeDescription}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Дата начала</Form.Label>
                        <Form.Control type="date" value={moment(homeworkStart).format('YYYY-MM-DD')} onChange={handleChangeDateStart}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Дата окончания</Form.Label>
                        <Form.Control type="date" value={moment(homeworkEnd).format('YYYY-MM-DD')} onChange={handleChangeDateEnd}/>
                    </Form.Group>
                    <Button variant="outline-success" type="submit">
                        Сохранить
                    </Button>
                </Form>
            </Tab>
            <Tab eventKey="students" title="GitHub">

            </Tab>
        </Tabs>

    );
}
