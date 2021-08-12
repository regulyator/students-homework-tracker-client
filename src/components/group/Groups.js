import {Container, Table} from "react-bootstrap";
import {useEffect, useState} from "react";
import {loadAllGroups} from "../../api/main/GroupApi";

export default function Groups(props) {
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        loadAllGroups().then(groups => setGroups(groups))
    }, []);

    return (
        <Container>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Курс</th>
                    <th>Дата начала</th>
                    <th>Дата окончания</th>
                </tr>
                </thead>
                <tbody>
                {groups?.map((group, idx) => (
                    <tr key={idx}>
                        <td>{group.course.courseName}</td>
                        <td>{group.groupStart}</td>
                        <td>{group.groupEnd}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </Container>
    );
}