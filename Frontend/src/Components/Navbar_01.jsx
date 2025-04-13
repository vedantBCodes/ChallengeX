import React from 'react';
import './homePage.css';
import { Container, Navbar, Nav } from 'react-bootstrap';
import siteLogo from '../Images/challengeXLogo.png';
import { Link } from 'react-router-dom';
import Login from "./Login";
import Logout from "./Logout";
import { useAuth } from '../context/AuthProvider';

const Navbar_01 = () => {

  const [authUser, setAuthUser] = useAuth();


  return (
    <>
      {/* Navbar */}
      <Navbar expand="lg" variant="dark" className='navbar'>
        <Container className='navContainer'>
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
            <img src={siteLogo} alt="ChallengeX Logo" width={40} className="me-2" />
            <span style={{color:'white',fontSize:'25px'}}>ChallengeX</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/task">Tasks</Nav.Link>
              <Nav.Link as={Link} onClick={() => window.open("https://vedantbcodes.github.io/My-personal-portfolio/", "_blank")}>About</Nav.Link>
              <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
              <Nav.Link as={Link} to="/login">LogIn</Nav.Link>
              {/* {authUser ? (
              <Logout />
            ) : (
              <div className="">
                <a
                  className="bg-black text-white px-3 py-2 rounded-md hover:bg-slate-800 duration-300 cursor-pointer"
                  onClick={() =>
                    document.getElementById("my_modal_3").showModal()
                  }
                >
                  Login
                </a>
                <Login />
              </div>
            )} */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Navbar_01;