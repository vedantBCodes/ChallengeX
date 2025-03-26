// import TaskCard from './TaskCard';
// import './homePage.css'
import PuzzleImage from '../Images/15PuzzleImage2.webp';
import sudukuImage from '../Images/sudukuTaskImage.webp';
import tictactoeImage from '../Images/tic-tac-toeImage.webp';
import wordSearchImage from '../Images/wordSearchImage.webp';


import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import './homePage.css';

function TasksPage_03() {
  const [slideIndex, setSlideIndex] = useState(0); // Control which card set is shown
  const [cardData, setCardData] = useState([]);    // State for fetched card data
  
  const images = [PuzzleImage,sudukuImage,tictactoeImage,wordSearchImage,PuzzleImage,sudukuImage,tictactoeImage,wordSearchImage,PuzzleImage,sudukuImage,tictactoeImage,wordSearchImage ];

  // Fetch data from JSON file located in the public folder
  useEffect(() => {
    fetch('./public/data.json') // Fetching the file
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
                    {/* <img src={images[index]} alt="" /> */}
                  <Card.Title>{card.title}</Card.Title>
                  <Card.Text>{card.text}</Card.Text>
                  <Button className='bg-primary'>Start the Game</Button>
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




// export default TasksPage_03;

// const TasksPage_03 = () => {
//     const cardSubContainer1=useRef(null);
//     const cardSubContainer2=useRef(null);
//     const cardSubContainer3=useRef(null);
//   return (
//     <>
    // <div className='cardContainer'>
    //     <div className='levels' >
    //     <Button variant="dark">Level-1</Button>
    //     <Button variant="dark">Level-2</Button>
    //     <Button variant="dark">Level-3</Button>
    //     </div>
    //     <div className='cardSubContainer1' ref={cardSubContainer1}>
    //     <TaskCard img={PuzzleImage} title="15-Puzzle" desc="15-puzzle is a classic sliding puzzle consisting of numbered tiles arranged in a 4x4 grid"/>
    //     <TaskCard img={sudukuImage} title="Suduku" desc="Sudoku is a logic-based number puzzle where players fill a 9x9 grid with digits from 1 to 9"/>
    //     <TaskCard img={tictactoeImage} title="Tic-Tac-Toe" desc="Tic-Tac-Toe is a classic two-player game where players take turns marking Xs and Os on a 3x3 grid"/>
    //     <TaskCard img={wordSearchImage} title="Word Search" desc="Word Search is a classic puzzle game where players find and highlight hidden words "/>
    //     </div>
    //     {/* <div className='cardSubContainer2' ref={cardSubContainer2}>
    //     <TaskCard img={PuzzleImage} title="15-Puzzle" desc="15-puzzle is a classic sliding puzzle consisting of numbered tiles arranged in a 4x4 grid"/>
    //     <TaskCard img={sudukuImage} title="Suduku" desc="Sudoku is a logic-based number puzzle where players fill a 9x9 grid with digits from 1 to 9"/>
    //     <TaskCard img={tictactoeImage} title="Tic-Tac-Toe" desc="Tic-Tac-Toe is a classic two-player game where players take turns marking Xs and Os on a 3x3 grid"/>
    //     <TaskCard img={wordSearchImage} title="Word Search" desc="Word Search is a classic puzzle game where players find and highlight hidden words "/>
    //     </div>
    //     <div className='cardSubContainer3' ref={cardSubContainer3}>
    //     <TaskCard img={PuzzleImage} title="15-Puzzle" desc="15-puzzle is a classic sliding puzzle consisting of numbered tiles arranged in a 4x4 grid"/>
    //     <TaskCard img={sudukuImage} title="Suduku" desc="Sudoku is a logic-based number puzzle where players fill a 9x9 grid with digits from 1 to 9"/>
    //     <TaskCard img={tictactoeImage} title="Tic-Tac-Toe" desc="Tic-Tac-Toe is a classic two-player game where players take turns marking Xs and Os on a 3x3 grid"/>
    //     <TaskCard img={wordSearchImage} title="Word Search" desc="Word Search is a classic puzzle game where players find and highlight hidden words "/>
    //     </div> */}
        
    // </div>
//     </>
//   )
// }

// export default TasksPage_03