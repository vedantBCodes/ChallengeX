import React, { useRef } from 'react'
import TaskCard from './TaskCard';
import { Button } from 'react-bootstrap';
import './homePage.css'


const TasksPage_03 = () => {
    const cardSubContainer1=useRef(false);
    const cardSubContainer2=useRef(false);
    const cardSubContainer3=useRef(null);
  return (
    <>
    <div className='cardContainer'>
        <div className='levels'>
        <Button variant="dark">Level-1</Button>
        <Button variant="dark">Level-2</Button>
        <Button variant="dark">Level-3</Button>
        </div>
        <div className='cardSubContainer1' ref={cardSubContainer1}>
        <TaskCard/>
        <TaskCard/>
        <TaskCard/>
        <TaskCard/>
        </div>
        <div className='cardSubContainer2' ref={cardSubContainer2}>
        <TaskCard/>
        <TaskCard/>
        <TaskCard/>
        <TaskCard/>
        </div>
        <div className='cardSubContainer3' ref={cardSubContainer3}>
        <TaskCard/>
        <TaskCard/>
        <TaskCard/>
        <TaskCard/>
        </div>
        
    </div>
    </>
  )
}

export default TasksPage_03