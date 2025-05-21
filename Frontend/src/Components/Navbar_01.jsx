import React, { useState } from 'react';
import './homePage.css';
import { Container, Navbar, Nav, Form, FormControl, ListGroup, Row, Col,} from 'react-bootstrap';
import siteLogo from '../Images/challengeXLogo.png';
import { Link, useNavigate } from 'react-router-dom';
import Logout from "./Logout";
import { useAuth } from '../context/AuthProvider';
import { taskList } from './taskData'

const Navbar_01 = () => {
  const [authUser] = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
  const query = e.target.value;
  setSearchQuery(query);

  if (query.trim()) {
    const suggestions = taskList.filter(task =>
      task.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredSuggestions(suggestions);
  } else {
    setFilteredSuggestions([]);
  }
};

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/task?query=${encodeURIComponent(searchQuery.trim())}`);
      setFilteredSuggestions([]);
    }
  };

  const handleSuggestionClick = (task) => {
  navigate(`/${task.id}`);
  setSearchQuery('');
  setFilteredSuggestions([]);
};

  return (
    <>
      <Navbar expand="lg" variant="dark" className="navbar position-relative py-2">
        <Container fluid className="px-4">
          <Row className="w-100 align-items-center flex-wrap">
            {/* Left: Logo */}
            <Col xs={12} md="auto" className="d-flex align-items-center justify-content-center justify-content-md-start mb-2 mb-md-0">
              <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
                <img src={siteLogo} alt="ChallengeX Logo" width={40} className="me-2" />
                <span id="siteName">ChallengeX</span>
                {authUser && (
                  <>
                    <img
                      src="https://img.icons8.com/ios-filled/500/ffffff/user-male-circle.png"
                      alt="User Profile"
                      width={40}
                      className="d-none d-lg-inline-block ms-3"
                    />
                    <span id="welcomeStatement" className="ms-2">
                      Welcome, {authUser.fullname}
                    </span>
                  </>
                )}
              </Navbar.Brand>
            </Col>

            {/* Center: Search Bar */}
            <Col xs={12} md className="d-flex justify-content-center mb-2 mb-md-0">
  <div className="search-wrapper position-relative w-100 w-md-75">
    <Form onSubmit={handleSubmit}>
      <FormControl
        type="search"
        placeholder="Search tasks..."
        className="me-2"
        value={searchQuery}
        onChange={handleSearchChange}
      />
    </Form>
    {filteredSuggestions.length > 0 && (
      <ListGroup className="suggestion-dropdown">
        {filteredSuggestions.map((task, idx) => (
          <ListGroup.Item
            key={idx}
            action
            onClick={() => handleSuggestionClick(task)}
          >
            {task.title}
          </ListGroup.Item>
        ))}
      </ListGroup>
    )}
  </div>
</Col>


            {/* Right: Navigation Links */}
            <Col xs={12} md="auto" className="d-flex justify-content-center justify-content-md-end">
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto align-items-center">
                  <Nav.Link as={Link} to="/task">Tasks</Nav.Link>
                  <Nav.Link onClick={() => window.open("https://vedantbcodes.github.io/My-personal-portfolio/", "_blank")}>About</Nav.Link>
                  <Nav.Link as={Link} to="/contact">Contact</Nav.Link> &nbsp;
                  {authUser ? <Logout /> : <Nav.Link as={Link} to="/login">LogIn</Nav.Link>}
                </Nav>
              </Navbar.Collapse>
            </Col>

          </Row>
        </Container>

        {/* Suggestions Dropdown */}

      </Navbar>
    </>
  );
};

export default Navbar_01;
