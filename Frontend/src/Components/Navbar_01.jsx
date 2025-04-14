import React from 'react';
import './homePage.css';
import { Container, Navbar, Nav } from 'react-bootstrap';
import siteLogo from '../Images/challengeXLogo.png';
import { Link } from 'react-router-dom';
// import Login from "./Login";
import Logout from "./Logout";
import { useAuth } from '../context/AuthProvider';

const Navbar_01 = () => {
const [authUser, setAuthUser] = useAuth();
console.log(authUser);

  return (
    <>
      {/* Navbar */}
      <Navbar expand="lg" variant="dark" className="navbar">
  <Container className="navContainer justify-content-between">
    {/* Toggle button moved before the brand/logo */}
    <Navbar.Toggle aria-controls="basic-navbar-nav" className="order-1" />

    <Navbar.Brand as={Link} to="/" className="d-flex align-items-center order-2 mx-auto mx-lg-0">
  <img src={siteLogo} alt="ChallengeX Logo" width={40} className="me-2" />
  <span id="siteName">ChallengeX</span>&nbsp;&nbsp;&nbsp;
  {authUser ? (
    <>
      <img
        src="https://img.icons8.com/ios-filled/500/ffffff/user-male-circle.png"
        alt="User Profile"
        width={40}
        className="d-none d-lg-inline-block ms-3"
      />
      &nbsp;
      <span id="welcomeStatement">Welcome , {authUser.fullname}</span>
    </>
  ) : (
    " "
  )}
</Navbar.Brand>


    <Navbar.Collapse id="basic-navbar-nav" className="order-3 w-100 w-lg-auto">
      <Nav className="ms-auto">
        <Nav.Link as={Link} to="/task">Tasks</Nav.Link>
        <Nav.Link as={Link} onClick={() => window.open("https://vedantbcodes.github.io/My-personal-portfolio/", "_blank")}>About</Nav.Link>
        <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
        {authUser ? (
          <Logout />
        ) : (
          <Nav.Link as={Link} to="/login">LogIn</Nav.Link>
        )}
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>

    </>
  );
};

export default Navbar_01;