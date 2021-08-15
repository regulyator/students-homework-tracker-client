import {Form} from "react-bootstrap";
import {useState} from "react";

export default function CourseEdit(props) {
    const [course, setCourse] = useState(props.course);
    const [courseName, setCourseName] = useState(props.course.courseName);
    const [courseDescription, setCourseDescription] = useState(props.course.courseDescription);

    const handleCourseFioChange = (event) => {
        setCourseName(event.target.value)
        course.courseName = event.target.value
    }

    const handleCourseEmailChange = (event) => {
        setCourseDescription(event.target.value)
        course.courseDescription = event.target.value
    }

    return (
        <>
            <td>
                <Form.Control
                    type="text"
                    placeholder="Наименование"
                    value={courseName}
                    onChange={handleCourseFioChange}/>
            </td>
            <td>
                <Form.Control
                    type="text"
                    placeholder="Описание"
                    value={courseDescription}
                    onChange={handleCourseEmailChange}/>
            </td>
        </>

    );
}