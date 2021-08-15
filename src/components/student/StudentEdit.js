import {Form} from "react-bootstrap";
import {useState} from "react";

export default function StudentEdit(props) {
    const [student, setStudent] = useState(props.student);
    const [studentFio, setStudentFio] = useState(props.student.fio);
    const [studentEmail, setStudentEmail] = useState(props.student.email);

    const handleStudentFioChange = (event) => {
        setStudentFio(event.target.value)
        student.fio = event.target.value
    }

    const handleStudentEmailChange = (event) => {
        setStudentEmail(event.target.value)
        student.email = event.target.value
    }

    return (
        <>
            <td>
                <Form.Control
                    type="text"
                    placeholder="ФИО"
                    value={studentFio}
                    onChange={handleStudentFioChange}/>
            </td>
            <td>
                <Form.Control
                    type="email"
                    placeholder="Email"
                    value={studentEmail}
                    onChange={handleStudentEmailChange}/>
            </td>
        </>

    );
}