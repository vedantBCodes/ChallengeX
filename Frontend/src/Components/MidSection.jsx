import React from 'react'
import './homePage.css'
import { Container , Row , Col } from 'react-bootstrap'
import level1Image from '../Images/MidSectionImages/level1Image.png'
import level2Image from '../Images/MidSectionImages/level2Image.png'
import level3Image from '../Images/MidSectionImages/level3Image.png'

const MidSection = () => {
  return (
    <>
    <Container className='midsectionContainer'>
        <Row>
            <Col md={12}>
            <h1 style={{fontWeight:'bolder',color:'#29CD9C',fontSize:'30px',position:'relative',top:'10px'}}>U N L O C K&nbsp;&nbsp;&nbsp;&nbsp;Y O U R&nbsp;&nbsp;&nbsp;&nbsp;P O T E N T I A L</h1>
            <h2 style={{fontWeight:'900'}}>Level up, earn more.</h2>
            <p style={{color:'#727272',fontSize:'25px'}}>Get trained on more difficult tasks that pay more.</p>
            </Col>
        </Row>
        <Row >
            <Col className='midsectionSubContainer'>
                <div>
                <img src={level1Image} alt="" />
                <Row>
                    <Col> <br />
                       <b>Difficulty</b> <br />
                       <div style={{backgroundColor:'#29CD9C',width:'20px',height:'20px',borderRadius:'50%'}} className="midsectiondiv"></div> &nbsp;
                       <div style={{backgroundColor:'#C4C4C480',width:'20px',height:'20px',borderRadius:'50%'}} className="midsectiondiv"></div> &nbsp;
                       <div style={{backgroundColor:'#C4C4C480',width:'20px',height:'20px',borderRadius:'50%'}} className="midsectiondiv"></div>
                    </Col>
                    <Col> <br />
                      <b>Pay</b> <br />
                      <div style={{width:'20px',height:'20px',borderRadius:'50%',position:'relative',bottom:'5px'}} className="midsectiondiv"> <img src="https://cdn.prod.website-files.com/5e6035eb6aea331e9e880fa0/60edaa707b811b1d631ffe4f_Pay%201.png" alt=""/> </div> &nbsp;
                      <div style={{backgroundColor:'#C4C4C480',width:'20px',height:'20px',borderRadius:'50%'}} className="midsectiondiv"></div> &nbsp;
                       <div style={{backgroundColor:'#C4C4C480',width:'20px',height:'20px',borderRadius:'50%'}} className="midsectiondiv"></div>
                    </Col>
                </Row>
                </div>
                <div>
                <img src={level2Image} alt="" />
                <Row>
                    <Col> <br />
                       <b>Difficulty</b> <br />
                       <div style={{backgroundColor:'#29CD9C',width:'20px',height:'20px',borderRadius:'50%'}} className="midsectiondiv"></div> &nbsp;
                       <div style={{backgroundColor:'#FFE454',width:'20px',height:'20px',borderRadius:'50%'}} className="midsectiondiv"></div> &nbsp;
                       <div style={{backgroundColor:'#C4C4C480',width:'20px',height:'20px',borderRadius:'50%'}} className="midsectiondiv"></div>
                    </Col>
                    <Col> <br />
                      <b>Pay</b> <br />
                      <div style={{width:'20px',height:'20px',borderRadius:'50%',position:'relative',bottom:'5px'}} className="midsectiondiv"> <img src="https://cdn.prod.website-files.com/5e6035eb6aea331e9e880fa0/60edaa707b811b1d631ffe4f_Pay%201.png" alt=""/> </div> &nbsp;
                      <div style={{width:'20px',height:'20px',borderRadius:'50%',position:'relative',bottom:'5px'}} className="midsectiondiv"> <img src="https://cdn.prod.website-files.com/5e6035eb6aea331e9e880fa0/60edaa707b811b1d631ffe4f_Pay%201.png" alt=""/> </div> &nbsp;
                      <div style={{backgroundColor:'#C4C4C480',width:'20px',height:'20px',borderRadius:'50%'}} className="midsectiondiv"></div>
                    </Col>
                </Row>
                </div>
                <div>
                <img src={level3Image} alt="" />
                <Row>
                    <Col> <br />
                       <b>Difficulty</b> <br />
                       <div style={{backgroundColor:'#29CD9C',width:'20px',height:'20px',borderRadius:'50%'}} className="midsectiondiv"></div> &nbsp;
                       <div style={{backgroundColor:'#FFE454',width:'20px',height:'20px',borderRadius:'50%'}} className="midsectiondiv"></div> &nbsp;
                       <div style={{backgroundColor:'#F31E1E',width:'20px',height:'20px',borderRadius:'50%'}} className="midsectiondiv"></div>
                    </Col>
                    <Col> <br />
                      <b>Pay</b> <br />
                      <div style={{width:'20px',height:'20px',borderRadius:'50%',position:'relative',bottom:'5px'}} className="midsectiondiv"> <img src="https://cdn.prod.website-files.com/5e6035eb6aea331e9e880fa0/60edaa707b811b1d631ffe4f_Pay%201.png" alt=""/> </div> &nbsp;
                      <div style={{width:'20px',height:'20px',borderRadius:'50%',position:'relative',bottom:'5px'}} className="midsectiondiv"> <img src="https://cdn.prod.website-files.com/5e6035eb6aea331e9e880fa0/60edaa707b811b1d631ffe4f_Pay%201.png" alt=""/> </div> &nbsp;
                      <div style={{width:'20px',height:'20px',borderRadius:'50%',position:'relative',bottom:'5px'}} className="midsectiondiv"> <img src="https://cdn.prod.website-files.com/5e6035eb6aea331e9e880fa0/60edaa707b811b1d631ffe4f_Pay%201.png" alt=""/> </div> &nbsp;
                    </Col>
                </Row>
                </div>
            </Col>
        </Row>
    </Container>
    </>
  )
}

export default MidSection