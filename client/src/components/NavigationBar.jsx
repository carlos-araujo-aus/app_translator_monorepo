import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const NavigationBar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="sm" className="rounded-bottom">
        <Navbar.Brand as={NavLink} to="/">
            🎵🎤 AI Transcriber
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar-nav" />
        <Navbar.Collapse id="main-navbar-nav">
            <Nav className="ms-auto">
                {isAuthenticated ? (
                    <>
                        <Nav.Link as={NavLink} to="/" end>Dashboard</Nav.Link>
                        <Nav.Link as={NavLink} to="/history">History</Nav.Link>
                        <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                    </>
                ) : (
                    <>
                        <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
                        <Nav.Link as={NavLink} to="/register">Register</Nav.Link>
                    </>
                )}
            </Nav>
        </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;