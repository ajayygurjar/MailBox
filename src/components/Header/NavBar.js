import React from 'react';
import { Button, Container, Nav, Navbar, } from 'react-bootstrap';
import './NavBar.css';
import {  useNavigate } from 'react-router-dom';
const NavBar = () => {
    const token=localStorage.getItem('token')
    const navigate=useNavigate()
    
    const logoutHandler=()=>{
        localStorage.removeItem('email')
            localStorage.removeItem('token')
            navigate('/auth')
            

    }
    return (
        <Navbar bg="light" expand="lg" className="navbar-main">
            <Container fluid>
                <Navbar.Brand href="/">Mailbox</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-nav" />
                <Navbar.Collapse id="navbar-nav">
                    
                    <Nav>
                        <Nav.Item>
                            {token && <Button variant='danger' onClick={logoutHandler} >Logout</Button>}
                            
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;
