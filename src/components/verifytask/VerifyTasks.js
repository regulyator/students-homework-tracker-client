import {Accordion, Button, Container, InputGroup, Spinner} from "react-bootstrap";
import {useEffect, useState} from "react";
import {loadAllUnassignedTasks, scanRepositories} from "../../api/verifytask/VerifyTaskApi";
import Task from "./Task";

export default function VerifyTasks(props) {
    const [tasks, setTasks] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        loadTasks()
    }, []);

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
                        <Task task={task}/>
                    </Accordion.Item>
                ))}
            </Accordion>
        </Container>
    );
}
