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
                    
                    
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;
