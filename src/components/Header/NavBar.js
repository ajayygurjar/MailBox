import React from 'react';
import { Container, Nav, Navbar, } from 'react-bootstrap';
import './NavBar.css';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <Navbar bg="light" expand="lg" className="navbar-main">
            <Container fluid>
                <Navbar.Brand href="/">Mailbox</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-nav" />
                <Navbar.Collapse id="navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Item>
                            <Nav.Link  as={Link} to="/" active>Home</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link as={Link} to="/inbox">Inbox</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link as={Link} to="/mail">Mail</Nav.Link>  
                        </Nav.Item>
                        
                        
                    </Nav>
                    
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;
