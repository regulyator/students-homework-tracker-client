import {Accordion, Container, Form, Button} from "react-bootstrap";
import {useEffect, useState} from "react";
import {loadAllGroups} from "../../api/main/GroupApi";
import moment from "moment";

export default function Groups(props) {
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        loadAllGroups().then(groups => setGroups(groups))
    }, []);

    return (
        <Container className='mt-2 mb-1'>
            <Accordion defaultActiveKey="0">
                {groups?.map((group, idx) => (
                    <Accordion.Item eventKey={idx}>
                        <Accordion.Header>{group?.course?.courseName
                        + " ("
                        + moment(group.groupStart).format('DD.MM.YYYY')
                        + " - "
                        + moment(group.groupEnd).format('DD.MM.YYYY')
                        + ")"}</Accordion.Header>
                        <Accordion.Body>
                            <Form>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Курс</Form.Label>
                                    <Form.Control type="text" value={group?.course?.courseName}/>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Дата начала</Form.Label>
                                    <Form.Control type="text" value={moment(group.groupStart).format('DD.MM.YYYY')}/>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Дата окончания</Form.Label>
                                    <Form.Control type="text" value={moment(group.groupEnd).format('DD.MM.YYYY')}/>
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Сохранить
                                </Button>
                            </Form>
                        </Accordion.Body>
                    </Accordion.Item>
                ))}
            </Accordion>
        </Container>
    );
}