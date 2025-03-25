import React from 'react'
import './homePage.css'
import { Container, Row, Col, Navbar, Nav, Button, Card } from 'react-bootstrap';
import siteLogo2 from '../Images/siteLogo2.webp';

const Navbar_01 = () => {
  return (
   <>
    {/* Navbar */}
    <Navbar bg="black" variant="dark"  >
        <Container className='navContainer'>
          <h1><img src={siteLogo2} alt="" width={40} /> ChallengeX</h1>
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#home">About</Nav.Link>
              <Nav.Link href="#about">Contact</Nav.Link>
              <Nav.Link href="#contact">LogIn</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
    </Navbar>
      
   </>
  )
}

export default Navbar_01