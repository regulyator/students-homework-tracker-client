import {Accordion, Button, ButtonGroup, Form} from "react-bootstrap";
import {useEffect, useState} from "react";
import {loadStudentById} from "../../api/main/StudentApi";
import {loadGroupById, saveGroup} from "../../api/main/GroupApi";
import {loadHomeWorkById} from "../../api/homework/HomeworkApi";
import {Github} from "react-bootstrap-icons";
import {loadAllTeachers} from "../../api/main/TeacherApi";
import {saveTask} from "../../api/verifytask/VerifyTaskApi";

export default function Task(props) {
    const [task, setTask] = useState(props.task);
    const [student, setStudent] = useState();
    const [group, setGroup] = useState();
    const [homework, setHomework] = useState();
    const [assignedTeacherId, setAssignedTeacherId] = useState(props.task.assignedTeacherId);
    const [verified, setVerified] = useState(props.task.verified);
    const [teachers, setTeachers] = useState([]);

    useEffect(() => {
        loadPRData()
    }, [task]);

    const loadPRData = () => {
        loadStudentById(task.studentId)
            .then(student => setStudent(student));
        loadGroupById(task.groupId)
            .then(group => setGroup(group))
        loadHomeWorkById(task.homeworkId)
            .then(homework => setHomework(homework))
        loadAllTeachers()
            .then(teachers => setTeachers(teachers))
    }

    const handleChangeAssignedTeacher = (event) => {
        setAssignedTeacherId(event.target.value)
        task.assignedTeacherId = event.target.value
    }

    const handleChangeVerified = (event) => {
        setVerified(event.target.checked)
        task.verified = event.target.checked
    }

    const handleSave = (event) => {
        event.preventDefault()
        saveTask(task).then(task => setTask(task))
    }


    return (
        <>
            <Accordion.Header>
                PR (студент: {student?.fio}, группа: {group?.groupName}, ДЗ: {homework?.homeworkName})
            </Accordion.Header>
            <Accordion.Body>
                <Form onSubmit={handleSave}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Проверяющий</Form.Label>
                        <Form.Control as="select" value={assignedTeacherId}
                                      onChange={handleChangeAssignedTeacher}>
                            {assignedTeacherId === null && <option/>}
                            {teachers.map((teacher) =>
                                <option key={teacher.id}
                                        value={teacher.id}>{teacher.fio}</option>
                            )}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Принято" checked={verified} onChange={handleChangeVerified}/>
                    </Form.Group>
                    <ButtonGroup>
                        <Button variant="outline-success" type="submit">
                            Сохранить
                        </Button>
                        <Button variant="outline-primary" href={task.pullRequestUrl} target="_blank">Ссылка на
                            PR <Github className="mb-1"/></Button>
                    </ButtonGroup>

                </Form>

            </Accordion.Body>
        </>

    );
}
