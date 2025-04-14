import React from 'react'
import joinNowSectionImage from '../Images/joinNowSectionImage.png'
import { Container,Col,Row } from 'react-bootstrap'
import './homePage.css';

const JoinNowSection_04 = () => {
  return (
    <>
    <Container className="mt-0">
        <Row className='d-flex , justify-content-center'>
          <Col md={5} className=" text-white p-3">
          <p id="joinNowSectionPara">Take the next step toward your personal and professional goals with ChallengeX.</p>
            <p style={{textAlign:'left'}}>Join now to receive personalized recommendations from the full ChallengeX catalog.</p>
            <button id="joinNowBtn">Join for Free</button>
            {/* <a id="joinNowBtn">Join for Free</a> */}
          </Col>
          <Col md={4} className="p-3">
          <img src={joinNowSectionImage} alt=""  width={300}/>
          </Col>
        </Row>
      </Container>

    </>
  )
}

export default JoinNowSection_04


