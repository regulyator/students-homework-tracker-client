import {Button, ButtonGroup, Container, Table} from "react-bootstrap";
import {useEffect, useState} from "react";
import {deleteStudent, loadAllStudents, saveStudent} from "../../api/main/StudentApi";
import StudentEdit from "./StudentEdit";

export default function Students(props) {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        loadAllStudents().then(students => setStudents(students))
    }, []);

    const addNewStudent = (event) => {
        event.preventDefault();
        setStudents([...students, {id: null, fio: '', email: ''}])
    }

    const handleDeleteStudent = (student, idx) => {
        if (student.id !== null) {
            deleteStudent(student.id).then()
        }

        let filteredTeachers = students.filter(function (value, index) {
            return index !== idx;
        });
        setStudents(filteredTeachers);
    }

    const handleSaveStudent = (student) => {
        saveStudent(student).then()
    }

    return (
        <Container>
            <div>
                <h4 className='mt-1 mb-1 float-start'>Студенты</h4>
                <Button variant="outline-success" size="sm" onClick={addNewStudent} className='mt-1 mb-1 float-end'>Добавить</Button>
            </div>
            <Table striped hover>
                <thead>
                <tr>
                    <th width="50%">ФИО</th>
                    <th width="36%">Email</th>
                    <th width="14%" align="center">Действия</th>
                </tr>
                </thead>
                <tbody>
                {students?.map((student, idx) => (
                    <tr key={idx}>

                        <StudentEdit student={student}/>

                        <td align="center">
                            <ButtonGroup size="sm" className='mt-1 mb-1 float-end'>
                                <Button size='sm' variant="success"
                                        onClick={() => handleSaveStudent(student)}>Сохранить</Button>
                                <Button size='sm' variant="danger"
                                        onClick={() => handleDeleteStudent(student, idx)}>Удалить</Button>
                            </ButtonGroup>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </Container>
    );
}
