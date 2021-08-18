import {Button, Form, Tabs, Tab, ListGroup, ButtonGroup, Table} from "react-bootstrap";
import {useState} from "react";
import moment from "moment";
import {saveHomework} from "../../api/main/HomeworkApi";
import StudentEdit from "../student/StudentEdit";

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
    const [groupStudents, setGroupStudents] = useState(props.students);


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

    const addMissingStudents = () => {
        let newStudents = groupStudents.filter(student => !homeworkStudents.some(value => value.studentId === student.id));
        let newHomeWorkStudents = newStudents.map(groupStudent => {
            return {studentId: groupStudent.id}
        });
        setHomeworkStudents([...homeworkStudents, ...newHomeWorkStudents])
        console.log(newHomeWorkStudents)
    }


    return (
        <Tabs defaultActiveKey="main" id="uncontrolled-tab-example" className="mb-3">

            <Tab eventKey="main" title="Основные данные">
                <Form onSubmit={handleSave}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Наименование домашней работы</Form.Label>
                        <Form.Control type="text" placeholder="Наименование домашней работы" value={homeworkName}
                                      onChange={handleChangeName}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Метка домашней работы</Form.Label>
                        <Form.Control type="text" placeholder="Метка домашней работы" value={homeworkTag}
                                      onChange={handleChangeTag}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Описание домашней работы</Form.Label>
                        <Form.Control as="textarea" rows={3} value={homeworkDescription}
                                      onChange={handleChangeDescription}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Дата начала</Form.Label>
                        <Form.Control type="date" value={moment(homeworkStart).format('YYYY-MM-DD')}
                                      onChange={handleChangeDateStart}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Дата окончания</Form.Label>
                        <Form.Control type="date" value={moment(homeworkEnd).format('YYYY-MM-DD')}
                                      onChange={handleChangeDateEnd}/>
                    </Form.Group>
                    <Button variant="outline-success" type="submit">
                        Сохранить
                    </Button>
                </Form>
            </Tab>
            <Tab eventKey="students" title="GitHub">
                {/*{homeworkStudents?.map((homeworkStudent, idx) => (
                        <ListGroup.Item>{homeworkStudent.studentId}</ListGroup.Item>
                    ))}*/}
                {groupStudents.length > homeworkStudents.length &&
                <Button variant="warning" type="submit" onClick={addMissingStudents}>
                    Добавить новых студентов
                </Button>
                }

                <Table hover>
                    <thead>
                    <tr>
                        <th>ФИО</th>
                        <th>Пользователь GitHub</th>
                        <th>URL репозитария GitHub</th>
                        {/*<th width="14%" align="center">Действия</th>*/}
                    </tr>
                    </thead>
                    <tbody>
                    {homeworkStudents?.map((homeworkStudent, idx) => (
                        <tr key={idx}>
                            <td>
                                {groupStudents.find(groupStudent => groupStudent.id === homeworkStudent.studentId).fio}
                            </td>
                            <td>
                                <Form.Control
                                    type="text"
                                    placeholder="Пользователь GitHub (например -  user)"
                                    value={homeworkStudents.githubUserName}
                                    /*onChange={handleStudentEmailChange}*//>
                            </td>
                            <td>
                                <Form.Control
                                    type="text"
                                    placeholder="URL репозитария GitHub (например -  hw-repo)"
                                    value={homeworkStudents.homeworkRepositoryUrl}
                                    /*onChange={handleStudentEmailChange}*//>
                            </td>

                            {/*<StudentEdit student={student}/>*/}

                            {/*<td align="center">
                                <ButtonGroup size="sm" className='mt-1 mb-1 float-end'>
                                    <Button size='sm' variant="success"
                                            onClick={() => handleSaveStudent(student)}>Сохранить</Button>
                                    <Button size='sm' variant="danger"
                                            onClick={() => handleDeleteStudent(student, idx)}>Удалить</Button>
                                </ButtonGroup>
                            </td>*/}
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </Tab>
        </Tabs>

    );
}
