import 'bootstrap/dist/css/bootstrap.min.css';

import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap'

export default function Navigation() {

    return (
        <Navbar bg="primary" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand>Homework tracker</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <LinkContainer to="/opentasks">
                            <Nav.Link>PR для проверки</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/groups">
                            <Nav.Link>Группы</Nav.Link>
                        </LinkContainer>
                        <NavDropdown title="Обзор" id="basic-nav-dropdown">
                            <LinkContainer to="/courses">
                                <NavDropdown.Item>Курсы</NavDropdown.Item>
                            </LinkContainer>
                            <NavDropdown.Divider/>
                            <LinkContainer to="/teachers">
                                <NavDropdown.Item>Преподаватели</NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to="/students">
                                <NavDropdown.Item>Студенты</NavDropdown.Item>
                            </LinkContainer>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

    );
}
