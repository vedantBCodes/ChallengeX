import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import "./homePage.css";
import gadekarPrithvi from '../Images/communityImage1.png'
import shraddhaPatil from '../Images/communityImage2.png'
import moreAbhijeet from '../Images/communityImage3.png'



const CommunitySection_05 = () => {
  return (
    <>
      <Container className="mt-5">
        <Row className="d-flex , justify-content-center">
          <Col md={10}>
            <h1>From the ChallengeX community</h1>
            <p style={{fontSize:'20px'}}>10+ poeple have already joined our community</p>
          </Col>
        </Row>
        <Row className="d-flex , justify-content-center">
          <Col md={4}>
            <img src={gadekarPrithvi} alt="" width={250}/>
            <h1>Prithvi Gadekar</h1>
            <p>India</p> 
            <hr />
            <div>
              <p style={{padding:'10px',boxShadow:'2px 2px 2px 2px rgb(213, 212, 212)',borderRadius:'10px'}}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Officia culpa doloribus laboriosam asperiores, facilis placeat
                est ea excepturi tempora ad perspiciatis alias tenetur voluptas
                consequuntur, quia veniam adipisci reiciendis, deleniti autem
                odit beatae iusto. Dicta, quia!
              </p>
            </div>
          </Col>
          <Col md={4}>
          <img src={shraddhaPatil} alt="" width={250}/>
            <h1>Shraddha Patil</h1>
            <p>India</p>
            <hr />
            <div>
              <p style={{padding:'10px',boxShadow:'2px 2px 2px 2px rgb(213, 212, 212)',borderRadius:'10px'}}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Officia culpa doloribus laboriosam asperiores, facilis placeat
                est ea excepturi tempora ad perspiciatis alias tenetur voluptas
                consequuntur, quia veniam adipisci reiciendis, deleniti autem
                odit beatae iusto. Dicta, quia!
              </p>
            </div>
          </Col>
          <Col md={4}>
          <img src={moreAbhijeet} alt="" width={250}/>
            <h1>Abhijeet More</h1>
            <p>India</p> 
            <hr />
            <div>
              <p style={{padding:'10px',boxShadow:'2px 2px 2px 2px rgb(213, 212, 212)',borderRadius:'10px'}}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Officia culpa doloribus laboriosam asperiores, facilis placeat
                est ea excepturi tempora ad perspiciatis alias tenetur voluptas
                consequuntur, quia veniam adipisci reiciendis, deleniti autem
                odit beatae iusto. Dicta, quia!
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CommunitySection_05;
