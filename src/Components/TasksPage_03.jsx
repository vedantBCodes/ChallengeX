
import quizGameImage from '../Images/quizGameImage.webp';
import tictactoeImage from '../Images/tic-tac-toeImage.webp';
import guessingGameImage from '../Images/guessingGameImage.webp';
import wordSearchImage from '../Images/wordSearchImage.webp';
import memoryGameImage from '../Images/memoryGameImage.png';
import matchPairImage from '../Images/matchPairImage.png'
import typingSpeedTestImage from '../Images/typingSpeedTestImage.webp'
import colorSpotterImage from '../Images/colorSpotterImage.png'
import PuzzleImage from '../Images/15PuzzleImage2.webp';
import rapidFireImage from '../Images/rapidFireImage.webp'
import calculatingSpeedTest from '../Images/calculatingSpeedTest.png'
import sudukuImage from '../Images/sudukuTaskImage.webp';
import { Link } from 'react-router-dom';

import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import './homePage.css';

function TasksPage_03() {
  const [slideIndex, setSlideIndex] = useState(0); // Control which card set is shown
  const [cardData, setCardData] = useState([]);    // State for fetched card data
  
  const images = [quizGameImage,tictactoeImage,guessingGameImage,wordSearchImage,memoryGameImage,matchPairImage,typingSpeedTestImage,colorSpotterImage,PuzzleImage,rapidFireImage,calculatingSpeedTest,sudukuImage ];

  // Fetch data from JSON file located in the public folder
  useEffect(() => {
    fetch('./data.json') // Fetching the file
      .then((response) => response.json())
      .then((data) => setCardData(data))
      .catch((error) => console.error('Error fetching card data:', error));
  }, []);

  const handleSlide = (index) => setSlideIndex(index);

  return (
    <Container>
      <div className="d-flex justify-content-center mb-4">
        <Button variant="primary" className="mx-2" onClick={() => handleSlide(0)}>Level-1 Tasks</Button>
        <Button variant="success" className="mx-2" onClick={() => handleSlide(1)}>Level-2 Tasks</Button>
        <Button variant="danger" className="mx-2" onClick={() => handleSlide(2)}>Level-3 Tasks</Button>
      </div>

      <Row className="card-slider">
        <div className="card-track" style={{ transform: `translateX(-${slideIndex * 100}%)` }}>
          {cardData.map((card, index) => (
            <Col key={index} xs={12} sm={6} md={4} lg={3} className="card-wrapper">
              <Card className="custom-card mb-4">
                <Card.Img variant="top" src={images[index]} />
                <Card.Body>
                  <Card.Title>{card.title}</Card.Title>
                  <Card.Text>{card.text}</Card.Text>
                  <Button className='bg-primary'><Link to={card.path} className='text-white text-decoration-none'>Start the Game</Link></Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </div>
      </Row>
    </Container>
  );
}

export default TasksPage_03;