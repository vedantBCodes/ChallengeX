import React from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
const Header_02 = () => {
  return (
    <>
      <div className="headerContainer" style={{ textAlign: "left" }}>
        <div className="headerSubContainer">
          <h1>Money Doesn't Grow on Trees, But It Can Grow From Tasks!</h1>
          <h6>- Vedant Yeotikar</h6>
          <p>
           <Button variant="light" style={{ color: 'black', backgroundColor: 'white', borderColor: 'white' }}>
      Contact Me
    </Button>
          </p>
        </div>
      </div>
      <Container className="mt-5">
        <Row className="d-flex , justify-content-start">
          <Col md={6} className=" text-white p-3">
            <p
              style={{ textAlign: "left", fontWeight: "900" }}
              className="fs-1"
            >
              Earn While Doing Online Tasks From Home
            </p>
            <p style={{ textAlign: "start" }}>
              Join our community of 240,000+ taskers!
            </p>
          </Col>
          <Col md={5} className="p-3">
            {" "}
            <Button id="earningBtn">Start Earning Today</Button>
          </Col>
        </Row>
      </Container>
      <Container className=" globalCommunity ">
        <Row className="d-flex , justify-content-center">
          <Col md={14} className=" text-white p-3">
            <p
              style={{
                textAlign: "center",
                color: "#29CD9C",
                fontWeight: "900",
              }}
              className="fs-5"
            >
              JOIN &nbsp; A &nbsp; GLOBAL &nbsp; COMMUNITY{" "}
            </p>
            <p style={{ color: "white", fontWeight: "900" }} className="fs-1">
              Meet entrepreneurial taskers like you.
            </p>
            <p style={{ color: "rgb(163, 160, 160)" }}>
              Join a community of 240,000+ taskers.
            </p>
          </Col>
        </Row>
        <Row className="d-flex , justify-content-center">
          <Col md={3}>
            <span
              style={{ color: "#29CD9C", fontWeight: "900" }}
              className="fs-1"
            >
              2,40,000+
            </span>{" "}
            <br />
            <span style={{ color: "white" }}>Total Taskers</span>
          </Col>
          <Col md={3}>
            <span
              style={{ color: "#29CD9C", fontWeight: "900" }}
              className="fs-1"
            >
              $15M
            </span>{" "}
            <br />
            <span style={{ color: "white" }}>Total Earnings</span>
          </Col>
          <Col md={3}>
            <span
              style={{ color: "#29CD9C", fontWeight: "900" }}
              className="fs-1"
            >
              90+
            </span>{" "}
            <br />
            <span style={{ color: "white" }}>Countries</span>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row className="d-flex , justify-content-center mt-5">
          <Col md={10}>
            <p
              style={{
                textAlign: "center",
                color: "#29CD9C",
                fontWeight: "900",
                fontSize: "30px",
              }}
            >
              H O W &nbsp; I T &nbsp; W O R K S
            </p>
            <h2
              style={{
                textAlign: "center",
                color: "black",
                fontWeight: "bolder",
                fontSize: "40px",
              }}
            >
              Do tasks, get paid. It's that simple
            </h2>
            <p style={{ fontSize: "20px", color: "#808080" }}>
              From guessing number to solving suduku, earn money completing
              simple tasks.
            </p>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row className="d-flex , justify-content-center mt-5 gap-3">
          <Col md={3} className="fairFlexibleAndFun">
            <div class="Icon  Icon--black ">
              <svg class="" viewBox="0 0 40 40">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M8 18C9.65685 18 11 16.6569 11 15C11 13.3431 9.65685 12 8 12C6.34315 12 5 13.3431 5 15C5 16.6569 6.34315 18 8 18ZM8 20C10.7614 20 13 17.7614 13 15C13 12.2386 10.7614 10 8 10C5.23858 10 3 12.2386 3 15C3 17.7614 5.23858 20 8 20ZM31 20H8H4V22H19.5799C19.4102 22.0781 19.2589 22.2062 19.1494 22.3841L12.939 32.4761C12.529 33.1423 13.0083 34.0002 13.7906 34.0002H26.2115C26.9938 34.0002 27.4732 33.1423 27.0632 32.4761L20.8527 22.3841C20.7432 22.2062 20.5919 22.0781 20.4223 22H36V20H31ZM31 20C28.2386 20 26 17.7614 26 15C26 12.2386 28.2386 10 31 10C33.7614 10 36 12.2386 36 15C36 17.7614 33.7614 20 31 20ZM15.5802 32.0002L20.0011 24.8162L24.4219 32.0002H15.5802ZM34 15C34 16.6569 32.6569 18 31 18C29.3431 18 28 16.6569 28 15C28 13.3431 29.3431 12 31 12C32.6569 12 34 13.3431 34 15Z"
                ></path>
              </svg>
            </div>
            <br />
            <h4 style={{ textAlign: "left" }}>Fair</h4>
            <p style={{ textAlign: "left" ,fontSize:'20px' }}>
              Earn at least &#8377; 8.00 per task—often with bigger payments and
              incentives.
            </p>
          </Col>
          <Col md={3} className="fairFlexibleAndFun">
            <div class="Icon  Icon--black ">
              <svg class="" viewBox="0 0 40 40">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M26.5679 16.7387L22.4567 12.7272H27.1739C30.9623 12.7272 34 15.7261 34 19.3635C34 23.001 30.9623 25.9999 27.1739 25.9999V27.9999C32.0203 27.9999 36 24.1516 36 19.3635C36 14.5755 32.0203 10.7272 27.1739 10.7272H22.4567L26.5679 6.71564L25.1712 5.28418L19.3016 11.0115C19.1088 11.1996 19 11.4577 19 11.7272C19 11.9967 19.1088 12.2547 19.3016 12.4429L25.1712 18.1702L26.5679 16.7387ZM12.7991 22.2369L16.6597 26.2729H12.3043C8.8685 26.2729 6 23.3393 6 19.6365C6 15.9337 8.8685 13.0002 12.3043 13.0002V11.0002C7.68107 11.0002 4 14.9139 4 19.6365C4 24.3592 7.68107 28.2729 12.3043 28.2729H16.6597L12.7991 32.309L14.2444 33.6914L19.7226 27.9641C20.0925 27.5775 20.0925 26.9683 19.7226 26.5817L14.2444 20.8544L12.7991 22.2369Z"
                ></path>
              </svg>
            </div>
            <br />
            <h4 style={{ textAlign: "left" }}>Flexible</h4>
            <p style={{ textAlign: "left" ,fontSize:'20px'}}>
              Choose the studies you want to take part in. Exit at any time, for
              any reason.{" "}
            </p>
          </Col>
          <Col md={3} className="fairFlexibleAndFun">
            <div class="Icon  Icon--black ">
              <svg class="" viewBox="0 0 40 40">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M5 20.5C5 11.9377 11.9377 5 20.5 5C29.0623 5 36 11.9377 36 20.5C36 29.0623 29.0623 36 20.5 36C11.9377 36 5 29.0623 5 20.5ZM20.5 7C13.0423 7 7 13.0423 7 20.5C7 27.9577 13.0423 34 20.5 34C27.9577 34 34 27.9577 34 20.5C34 13.0423 27.9577 7 20.5 7ZM15.5 19C16.6046 19 17.5 18.1046 17.5 17C17.5 15.8954 16.6046 15 15.5 15C14.3954 15 13.5 15.8954 13.5 17C13.5 18.1046 14.3954 19 15.5 19ZM25.5 19C26.6046 19 27.5 18.1046 27.5 17C27.5 15.8954 26.6046 15 25.5 15C24.3954 15 23.5 15.8954 23.5 17C23.5 18.1046 24.3954 19 25.5 19ZM11.0703 23.3322C12.4422 27.2156 16.1448 29.9991 20.5014 29.9991C24.858 29.9991 28.5605 27.2156 29.9324 23.3322L28.0466 22.666C26.9484 25.7748 23.9842 27.9991 20.5014 27.9991C17.0185 27.9991 14.0544 25.7748 12.9561 22.666L11.0703 23.3322Z"
                ></path>
              </svg>
            </div>
            <br />
            <h4 style={{ textAlign: "left" }}>Fun</h4>
            <p style={{ textAlign: "left" ,fontSize:'20px'}}>
              Explore, contribute to, and learn from all kinds of interesting
              tasks.It will be fun .
            </p>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row className="d-flex , justify-content-center mt-5 gap-3">
          <Col md={10}>
            <p style={{ color: "#29CD9C", fontWeight: "700" }}>
              F L E X I B L E &nbsp; S C H E D U L E
            </p>
            <h2 style={{ fontWeight: "900" }}>Work from anywhere, anytime.</h2>
            <p style={{ color: "#d1d1d1" }}>
              Enjoy the safety & flexibility of working remotely. All you need
              is a computer & internet.
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Header_02;
