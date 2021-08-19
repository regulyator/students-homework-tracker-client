import {Accordion, Container} from "react-bootstrap";
import {useEffect, useState} from "react";
import {loadAllUnassignedTasks} from "../../api/main/VerifyTaskApi";

export default function VerifyTasks(props) {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        loadAllUnassignedTasks(false)
            .then(tasks => setTasks(tasks))
    }, []);

    return (
        <Container className='mt-2'>
            <Accordion defaultActiveKey="0">
                {tasks?.map((task, idx) => (
                    <Accordion.Item eventKey={idx}>
                        <Accordion.Header>
                            Домашняя работа для проверки
                        </Accordion.Header>
                        <Accordion.Body>
                            {task.pullRequestUrl}
                        </Accordion.Body>
                    </Accordion.Item>
                ))}
            </Accordion>
        </Container>
    );
}
