import {Accordion, Button, Container, Spinner} from "react-bootstrap";
import {useEffect, useState} from "react";
import {loadAllUnassignedTasks, scanRepositories} from "../../api/verifytask/VerifyTaskApi";
import Task from "./Task";
import {useLocation} from "react-router-dom";
import {loadTeacherById} from "../../api/main/TeacherApi";

export default function VerifyTasks(props) {
    const [tasks, setTasks] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [teacherId, setTeacherId] = useState(props.teacherId);
    const [teacher, setTeacher] = useState();

    const location = useLocation();

    useEffect(() => {
        setTeacherId(props.teacherId)
        loadTeacherById(teacherId)
            .then(teacher => setTeacher(teacher))
        loadTasks()
    }, [props.teacherId]);

    useEffect(() => {
        setTeacherId(location.teacherId)
        loadTeacherById(teacherId)
            .then(teacher => setTeacher(teacher))
        loadTasks()
    }, [location]);

    const loadTasks = () => {
        loadAllUnassignedTasks(false)
            .then(tasks => setTasks(tasks))
    }

    const refreshTasks = () => {
        setRefreshing(true);
        scanRepositories()
            .then(() => loadTasks())
            .then(() => setRefreshing(false));
    }

    return (
        <Container className='mt-2'>
            <Button variant="outline-warning" onClick={refreshTasks}>
                Обновить {"  "}
                {refreshing && <Spinner animation="border" variant="info" size="sm"/>}
            </Button>

            <Accordion defaultActiveKey="0" className="mt-2">
                {tasks?.map((task, idx) => (
                    <Accordion.Item eventKey={idx}>
                        <Task task={task} teacher={teacher}/>
                    </Accordion.Item>
                ))}
            </Accordion>
        </Container>
    );
}
