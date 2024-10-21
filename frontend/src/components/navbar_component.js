import React from 'react';
import { Navbar, Nav, Container,Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../assets/images/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';


const NavbarComponent = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userToken'); 
    localStorage.removeItem('userId'); 
    localStorage.removeItem('userName'); 
    setIsLoggedIn(false);
    navigate('/'); // Redirecting the user to  the  landing page on logout
  };

  return (
    <Navbar bg="success" variant="dark" expand="lg">
      <Container className="p-1">
        <Navbar.Brand as={Link} to="/">
          <img src={logo} alt="Logo" width="40" height="40" className="d-inline-block align-top" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" className="text-white px-4">Home</Nav.Link>
            <Nav.Link as={Link} to="/" className="text-white px-4">About Us</Nav.Link>
            {isLoggedIn ? (
              <>
                <Nav.Link as={Link} to="/customer/all-loan-applications" className="text-white px-4">Loan Applications</Nav.Link>
                <Button variant="light" onClick={handleLogout} className="ms-2 ml-4 text-success">Logout</Button>
              </>
            ) : (
              <Button as={Link} to="/login" variant="light" className="ms-2 ml-4 text-success">Login</Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
