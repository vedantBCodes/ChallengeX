import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import "./homePage.css";
import gadekarPrithvi from "../Images/communityImage1.png";
import shraddhaPatil from "../Images/communityImage2.png";
import moreAbhijeet from "../Images/communityImage3.png";

const CommunitySection_05 = () => {
  return (
    <>
      <Container className="mt-3">
        <Row className="d-flex , justify-content-center">
          <Col md={10}>
            <h1>From the ChallengeX community</h1>
            <p style={{ fontSize: "20px" }}>
              10+ poeple have already joined our community
            </p>
          </Col>
        </Row>
        <Row className="d-flex , justify-content-center">
          <Col md={4}>
            <img src={gadekarPrithvi} alt="" width={250} />
            <h1 style={{fontSize:'30px',fontWeight:'700'}} className="mt-2">Abhijeet More</h1>

            <p>India</p>
            <hr />
            <div>
              <p
                style={{
                  padding: "10px",
                  boxShadow: "2px 2px 2px 2px rgb(213, 212, 212)",
                  borderRadius: "10px",
                }}
              >
                "This platform is a fun way to pass time while feeling
                productive. Whether it’s solving tasks like puzzles, quizzes, or
                brain teasers, or just playing entertaining games, the fact that
                I can earn rewards makes it even more motivating. However, I’d
                like to see a variety of tasks so it doesn’t feel
                repetitive and the focus should remain on skill-building .
              </p>
            </div>
          </Col>
          <Col md={3}> 
            <img src={shraddhaPatil} alt="" width={250} />
            <h1 style={{fontSize:'30px',fontWeight:'700'}} className="mt-2">Shraddha Patil</h1>
            <p>India</p>
            <hr />
            <div>
              <p
                style={{
                  padding: "10px",
                  boxShadow: "2px 2px 2px 2px rgb(213, 212, 212)",
                  borderRadius: "10px",
                }}
              >
                "I like platforms that encourage learning and skill-building
                through tasks while offering rewards. If the tasks can be
                educational, like math problems ,logic-based challenges, it 
                would be a win-win. But it’s important that the rewards aren’t 
                too hard to achieve ."
              </p>
            </div>
          </Col>
          <Col md={4}>
            <img src={moreAbhijeet} alt="" width={250} />
            <h1 style={{fontSize:'30px',fontWeight:'700'}} className="mt-2">Prithvi Gadekar</h1>
            <p>India</p>
            <hr />
            <div>
              <p
                style={{
                  padding: "10px",
                  boxShadow: "2px 2px 2px 2px rgb(213, 212, 212)",
                  borderRadius: "10px",
                }}
              >
                "Combining games and tasks with rewards makes this platform more
                exciting than just a regular gaming app. If the games are
                challenging and the tasks vary in difficulty, it could keep
                players engaged for longer. The key challenge would be ensuring
                fair play, especially if there’s a leaderboard or competitive
                element."
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CommunitySection_05;
