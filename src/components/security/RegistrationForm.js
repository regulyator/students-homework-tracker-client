import React, {useState} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {Card, Col, Container, Row} from "react-bootstrap";
import {register} from "../../api/security/SecurityApi";
import {useHistory} from "react-router-dom";

export default function RegistrationForm(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    let history = useHistory();

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    const handleLogin = (event) => {
        event.preventDefault();

        register(email, password)
            .then(response => {
                    if (response.ok) {
                        alert("Это успех!")
                        history.push("/");
                    } else if (response.status === 422) {
                        alert("error")
                    }
                }
            );

    }

    return (
        <Container>
            <Row>
                <Col md={{span: 4, offset: 4}}>
                    <Card className="mt-5">
                        <Card.Body>
                            <Form onSubmit={handleLogin}>
                                <Form.Group controlId="email" className="mb-3">
                                    <Form.Label column>Имя пользователя/Email</Form.Label>
                                    <Form.Control
                                        autoFocus
                                        type="text"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group controlId="password" className="mb-3">
                                    <Form.Label>Пароль</Form.Label>
                                    <Form.Control
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </Form.Group>
                                <Button type="submit" disabled={!validateForm()}>
                                    Регистрация
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}