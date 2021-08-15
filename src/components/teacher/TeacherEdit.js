import {Form} from "react-bootstrap";
import {useState} from "react";

export default function TeacherEdit(props) {
    const [teacher, setTeacher] = useState(props.teacher);
    const [teacherFio, setTeacherFio] = useState(props.teacher.fio);
    const [teacherEmail, setTeacherEmail] = useState(props.teacher.email);

    const handleTeacherFioChange = (event) => {
        setTeacherFio(event.target.value)
        teacher.fio = event.target.value
    }

    const handleTeacherEmailChange = (event) => {
        setTeacherEmail(event.target.value)
        teacher.email = event.target.value
    }

    return (
        <>
            <td>
                <Form.Control
                    type="text"
                    placeholder="ФИО"
                    value={teacherFio}
                    onChange={handleTeacherFioChange}/>
            </td>
            <td>
                <Form.Control
                    type="email"
                    placeholder="Email"
                    value={teacherEmail}
                    onChange={handleTeacherEmailChange}/>
            </td>
        </>

    );
}