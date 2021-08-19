import {Button, ButtonGroup, Form} from "react-bootstrap";
import {useEffect, useState} from "react";
import moment from "moment";
import {saveGroup} from "../../api/main/GroupApi";
import GroupTeachers from "./GroupTeachers";
import GroupStudents from "./GroupStudents";
import Homeworks from "../homework/Homeworks";

export default function GroupEdit(props) {
    const [courses] = useState(props.courses);
    const [group, setGroup] = useState(props.group);
    const [groupCourse, setGroupCourse] = useState(props.group.course);
    const [groupStart, setGroupStart] = useState(props.group.groupStart);
    const [groupEnd, setGroupEnd] = useState(props.group.groupEnd);
    const [groupTeachers, setGroupTeachers] = useState(props.group.teachers);
    const [groupStudents, setGroupStudents] = useState(props.group.students);

    useEffect(() => {
        setGroupCourse(props.group.course)
    }, [props.group]);

    const handleChangeCourse = (event) => {
        let newCourseSelected = courses.find((course) => {
            return course.id === event.target.value
        })
        setGroupCourse(newCourseSelected)
        group.course = newCourseSelected
    }

    const handleChangeDateStart = (event) => {
        let newDateStart = event.target.value
        setGroupStart(newDateStart)
        group.groupStart = newDateStart
    }

    const handleChangeDateEnd = (event) => {
        let newDateEnd = event.target.value
        setGroupEnd(newDateEnd)
        group.groupEnd = newDateEnd
    }

    const handleSave = (event) => {
        event.preventDefault()
        saveGroup(group).then(group => setGroup(group))
    }

    const handleSaveGroupStudents = (groupStudents) => {
        setGroupStudents(groupStudents);
        group.students = groupStudents;
        saveGroup(group).then(group => setGroup(group));
    }

    const handleSaveGroupTeachers = (groupTeachers) => {
        setGroupTeachers(groupTeachers);
        group.teachers = groupTeachers;
        saveGroup(group).then();
    }

    return (
        <Form onSubmit={handleSave}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Курс</Form.Label>
                <Form.Control as="select" value={groupCourse.id}
                              onChange={handleChangeCourse}>
                    {groupCourse === null && <option/>}
                    {courses.map((course) =>
                        <option key={course.id}
                                value={course.id}>{course.courseName}</option>
                    )}
                </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Дата начала</Form.Label>
                <Form.Control type="date" value={moment(groupStart).format('YYYY-MM-DD')}
                              onChange={handleChangeDateStart}/>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Дата окончания</Form.Label>
                <Form.Control type="date" value={moment(groupEnd).format('YYYY-MM-DD')} onChange={handleChangeDateEnd}/>
            </Form.Group>
            <Form.Group className="mb-3">
                <ButtonGroup aria-label="Basic example">
                    <GroupTeachers teachers={groupTeachers} saveGroupTeachers={handleSaveGroupTeachers}/>
                    <GroupStudents students={groupStudents} saveGroupStudents={handleSaveGroupStudents}/>
                    <Homeworks group={group}/>
                </ButtonGroup>
            </Form.Group>
            <Button variant="outline-success" type="submit">
                Сохранить
            </Button>
        </Form>
    );
}
