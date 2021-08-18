import {Accordion, Container, Form, Button} from "react-bootstrap";
import {useEffect, useState} from "react";
import {loadAllGroups} from "../../api/main/GroupApi";
import moment from "moment";
import {loadAllCourses} from "../../api/main/CourseApi";
import GroupEdit from "./GroupEdit";

export default function Groups(props) {
    const [groups, setGroups] = useState([]);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        loadAllGroups().then(groups => setGroups(groups));
        loadAllCourses().then(courses => setCourses(courses));
    }, []);

    const addNewGroup = (event) => {
        event.preventDefault();
        setGroups([...groups, {id: null, course: null, groupStart: null, groupEnd: null, students: [], teachers: []}])
    }

    return (

        <Container className='mt-2'>
            <div>
                <h4 className='m-2 float-start'>Группы</h4>
                <Button variant="outline-success" size="sm" onClick={addNewGroup}
                        className='m-2 float-end'>Добавить</Button>
            </div>
            <Accordion defaultActiveKey="0">
                {groups?.map((group, idx) => (
                    <Accordion.Item eventKey={idx}>
                        <Accordion.Header>{group.id !== null ?
                            (group?.course?.courseName
                                + " ("
                                + moment(group.groupStart).format('DD.MM.YYYY')
                                + " - "
                                + moment(group.groupEnd).format('DD.MM.YYYY')
                                + ")") : 'НОВАЯ ГРУППА'}
                        </Accordion.Header>
                        <Accordion.Body>
                            <GroupEdit group={group} courses={courses}/>
                        </Accordion.Body>
                    </Accordion.Item>
                ))}
            </Accordion>
        </Container>
    );
}
