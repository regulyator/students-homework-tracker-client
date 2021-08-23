import {Button, Container, Table} from "react-bootstrap";
import {useState} from "react";
import StudentsGitHubEdit from "./StudentsGitHubEdit";

export default function StudentsGitHub(props) {
    const [homeworkStudents, setHomeworkStudents] = useState(props.homework.students);
    const [groupStudents] = useState(props.students);

    const handleSave = (event) => {
        event.preventDefault();
        props.save(homeworkStudents);
    }

    const addMissingStudents = () => {
        let newStudents = groupStudents.filter(student => !homeworkStudents.some(value => value.studentId === student.id));
        let newHomeWorkStudents = newStudents.map(groupStudent => {
            return {studentId: groupStudent.id}
        });
        setHomeworkStudents([...homeworkStudents, ...newHomeWorkStudents])
    }


    return (
        <Container fluid>
            {groupStudents.length > homeworkStudents.length &&
            <Button variant="warning" type="submit" onClick={addMissingStudents}>
                Добавить новых студентов
            </Button>
            }

            <Table hover height="300px">
                <thead>
                <tr>
                    <th>ФИО</th>
                    <th>Пользователь GitHub</th>
                    <th>URL репозитария GitHub</th>
                </tr>
                </thead>
                <tbody>
                {homeworkStudents?.map((homeworkStudent, idx) => (
                    <tr key={idx}>
                        <StudentsGitHubEdit student={homeworkStudent}
                                            fio={groupStudents.find(groupStudent => groupStudent.id === homeworkStudent.studentId).fio}/>
                    </tr>
                ))}
                </tbody>
            </Table>
            <Button variant="outline-success" onClick={handleSave}>
                Сохранить
            </Button>
        </Container>

    );
}
