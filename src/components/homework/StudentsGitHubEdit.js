import {Form,} from "react-bootstrap";
import {useState} from "react";

export default function StudentsGitHubEdit(props) {
    const [student] = useState(props.student);
    const [studentFio] = useState(props.fio);
    const [studentGithubUserName, setStudentGithubUserName] = useState(props.student.githubUserName);
    const [studentHomeworkRepositoryUrl, setStudentHomeworkRepositoryUrl] = useState(props.student.homeworkRepositoryUrl);

    const handleStudentGithubUsernameChange = (event) => {
        let newGithubUsername = event.target.value;
        setStudentGithubUserName(newGithubUsername);
        student.githubUserName = newGithubUsername;
    }

    const handleStudentHomeworkRepositoryUrlChange = (event) => {
        let newStudentGithubRepository = event.target.value;
        setStudentHomeworkRepositoryUrl(newStudentGithubRepository);
        student.homeworkRepositoryUrl = newStudentGithubRepository;
    }


    return (
        <>
            <td>
                {studentFio}
            </td>
            <td>
                <Form.Control
                    type="text"
                    placeholder="Пользователь GitHub (например -  user)"
                    value={studentGithubUserName}
                    onChange={handleStudentGithubUsernameChange}/>
            </td>
            <td>
                <Form.Control
                    type="text"
                    placeholder="URL репозитария GitHub (например -  hw-repo)"
                    value={studentHomeworkRepositoryUrl}
                    onChange={handleStudentHomeworkRepositoryUrlChange}/>
            </td>
        </>
    );
}
