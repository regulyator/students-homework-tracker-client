import {Button, ButtonGroup, Container, Table} from "react-bootstrap";
import {useEffect, useState} from "react";
import {deleteCourse, loadAllCourses, saveCourse} from "../../api/main/CourseApi";
import CourseEdit from "./CourseEdit";

export default function Courses(props) {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        loadAllCourses().then(courses => setCourses(courses))
    }, []);

    const addNewCourse = (event) => {
        event.preventDefault();
        setCourses([...courses, {id: null, courseName: '', courseDescription: ''}])
    }

    const handleDeleteCourse = (course, idx) => {
        if (course.id !== null) {
            deleteCourse(course.id).then()
        }

        let filteredTeachers = courses.filter(function (value, index) {
            return index !== idx;
        });
        setCourses(filteredTeachers);
    }

    const handleSaveCourse = (course) => {
        saveCourse(course).then()
    }

    return (
        <Container>
            <div>
                <h4 className='mt-1 mb-1 float-start'>Курсы</h4>
                <Button variant="outline-success" size="sm" onClick={addNewCourse}
                        className='mt-1 mb-1 float-end'>Добавить</Button>
            </div>
            <Table striped hover>
                <thead>
                <tr>
                    <th width="40%">Наименование</th>
                    <th width="46%">Описание</th>
                    <th width="14%" align="center">Действия</th>
                </tr>
                </thead>
                <tbody>
                {courses?.map((course, idx) => (
                    <tr key={idx}>

                        <CourseEdit course={course}/>

                        <td align="center">
                            <ButtonGroup size="sm" className='mt-1 mb-1 float-end'>
                                <Button size='sm' variant="success"
                                        onClick={() => handleSaveCourse(course)}>Сохранить</Button>
                                <Button size='sm' variant="danger"
                                        onClick={() => handleDeleteCourse(course, idx)}>Удалить</Button>
                            </ButtonGroup>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </Container>
    );
}
