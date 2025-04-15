import React from 'react';
import { Container, Nav, Navbar, } from 'react-bootstrap';
import './NavBar.css';

const NavBar = () => {
    return (
        <Navbar bg="light" expand="lg" className="navbar-main">
            <Container fluid>
                <Navbar.Brand href="/">Mailbox</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-nav" />
                <Navbar.Collapse id="navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Item>
                            <Nav.Link href="/" active>Home</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="#">Product</Nav.Link>
                        </Nav.Item>
                        
                        <Nav.Item>
                            <Nav.Link href="#" disabled>About</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;
