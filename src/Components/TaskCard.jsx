import React from 'react'
import { Card, Button } from 'react-bootstrap';
import './homePage.css'


const TaskCard = ({img,title,desc}) => {
  return (
   <>
   <Card style={{ width: '18rem' }} className="custom-card">
      <Card.Img variant="top" src={img} style={{height:'300px'}} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
         {desc}
        </Card.Text>
        <Button variant="primary">Start the Game</Button>
      </Card.Body>
    </Card>
   </>
  )
}

export default TaskCard