import {Button, ButtonGroup, Container, Table} from "react-bootstrap";
import {useEffect, useState} from "react";
import {deleteTeacher, loadAllTeachers, saveTeacher} from "../../api/main/TeacherApi";
import TeacherEdit from "./TeacherEdit";

export default function Teachers(props) {
    const [teachers, setTeachers] = useState([]);

    useEffect(() => {
        loadAllTeachers().then(teachers => setTeachers(teachers))
    }, []);

    const addNewTeacher = (event) => {
        event.preventDefault();
        setTeachers([...teachers, {id: null, fio: '', email: ''}])
    }

    const handleDeleteTeacher = (teacher, idx) => {
        if (teacher.id !== null) {
            deleteTeacher(teacher.id).then()
        }

        let filteredTeachers = teachers.filter(function (value, index) {
            return (teacher.id === null) ? index !== idx : value.id !== teacher.id;
        });
        setTeachers(filteredTeachers);
    }

    const handleSaveTeacher = (teacher) => {
        saveTeacher(teacher).then()
    }

    return (
        <Container>
            <div>
                <h4 className='mt-1 mb-1 float-start'>Преподаватели</h4>
                <Button variant="outline-success" size="sm" onClick={addNewTeacher}
                        className='mt-1 mb-1 float-end'>Добавить</Button>
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
                {teachers?.map((teacher, idx) => (
                    <tr key={idx}>

                        <TeacherEdit teacher={teacher}/>

                        <td align="center">
                            <ButtonGroup size="sm" className='mt-1 mb-1 float-end'>
                                <Button size='sm' variant="success"
                                        onClick={() => handleSaveTeacher(teacher)}>Сохранить</Button>
                                <Button size='sm' variant="danger"
                                        onClick={() => handleDeleteTeacher(teacher, idx)}>Удалить</Button>
                            </ButtonGroup>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </Container>
    );
}
