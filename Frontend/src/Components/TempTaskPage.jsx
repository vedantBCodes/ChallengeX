import quizGameImage from '../Images/quizGameImage.webp';
import tictactoeImage from '../Images/tic-tac-toeImage.webp';
import guessingGameImage from '../Images/guessingGameImage.webp';
import wordSearchImage from '../Images/wordSearchImage.webp';
import memoryGameImage from '../Images/memoryGameImage.png';
import matchPairImage from '../Images/matchPairImage.png';
import typingSpeedTestImage from '../Images/typingSpeedTestImage.webp';
import colorSpotterImage from '../Images/colorSpotterImage.png';
import PuzzleImage from '../Images/15puzzleImage2.webp';
import rapidFireImage from '../Images/rapidFireImage.webp';
import calculatingSpeedTest from '../Images/calculatingSpeedTest.png';
import sudukuImage from '../Images/sudukuTaskImage.webp';
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import './homePage.css';
import axios from "axios";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API_BASE_URL } from '../config/api';


function TempTasksPage() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [cardData, setCardData] = useState([]);

  const imageMap = {
    quizGameImage,
    tictactoeImage,
    guessingGameImage,
    wordSearchImage,
    memoryGameImage,
    matchPairImage,
    typingSpeedTestImage,
    colorSpotterImage,
    PuzzleImage,
    rapidFireImage,
    calculatingSpeedTest,
    sudukuImage
  };

    // Fetch task data from mongodb collection
    useEffect(() => {
      const getTask = async () => {
        try {
          const res = await axios.get(`${API_BASE_URL}/task`);
          setCardData(res.data);
        } catch (error) {
          console.log(error);
        }
      };
      getTask();
    }, []);

  const handleSlide = (index) => setSlideIndex(index);
  const handleOnClick = (e) => {
    e.preventDefault(); // Prevents navigation
    toast.info('Login to proceed');
  };
  const levelStart = slideIndex * 4 + 1;
  const levelEnd = levelStart + 3;
  const visibleCards = cardData
    .map((card) => ({ ...card, _idNum: Number(card.id) }))
    .filter((card) => Number.isFinite(card._idNum) && card._idNum >= levelStart && card._idNum <= levelEnd)
    .sort((a, b) => a._idNum - b._idNum);

  return (
    <Container fluid style={{ minHeight: '92.5vh' }} className='taskPageContainer pt-3'>
      <div className="d-flex justify-content-center flex-wrap mb-4">
        <Button variant="primary" className="mx-1" onClick={() => handleSlide(0)}>Level-1 Tasks</Button>
        <Button variant="success" className="mx-1" onClick={() => handleSlide(1)}>Level-2 Tasks</Button>
        <Button variant="danger" className="mx-1" onClick={() => handleSlide(2)}>Level-3 Tasks</Button>
      </div>
      <Row className="justify-content-center g-2">
        {visibleCards.map((card) => (
          <Col key={card._id || card.id} xs={12} sm={6} md={4} lg={3} xl={3} className="mb-4 d-flex align-items-stretch" style={{ minWidth: '250px', maxWidth: '300px' }}>
            <Card className="custom-card w-100">
              <Card.Img variant="top" src={imageMap[card.image]} className="img-fluid" />
              <Card.Body className="d-flex flex-column">
                <Card.Title>{card.title}</Card.Title>
                <Card.Text>{card.text}</Card.Text>
                <Button className='mt-auto bg-primary'>
                <Link to="#" onClick={handleOnClick} className="text-white text-decoration-none">Start the Game</Link>                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default TempTasksPage;
