import React from 'react'
import ContactForm from './ContactForm'
import './contactus.css'
import { Container, Row ,Col } from 'react-bootstrap'
import contactusImage from '../../Images/contactusImage.svg'
import { MdMessage } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { HiMail } from "react-icons/hi";


const ContactPage = () => {
  
    
  return (
    <>
    <main className='contactFormMainContainer'>
    <Container >    
      <Row >
        <Col md={10} style={{textAlign:'left'}}>
        <h1 style={{textAlign:'left',fontWeight:'900'}}>CONTACT ME</h1>
      <p style={{fontSize:'15px',fontWeight:'700',color:'rgb(83, 83, 83)',textAlign:'left'}}>  LET'S CONNECT  : I AM HERE TO HELP, AND I WOULD LOVE TO HEAR FROM YOU ! 
        WHETHER YOU HAVE A QUESTION, COMMENT, OR JUST WANT TO CHAT , YOU CAN
        REACH OUT TO ME THROUGH THE CONTACT FORM OF THIS PAGE, OR BY PHONE,
        EMAIL, OR SOCIAL MEDIA .</p>
        </Col>
        <Col md={2}>
       
        </Col>

        </Row> 
        <Row>
          <Col md={5} className='mt-md-2'>
          <h6 style={{textAlign:'center',color:'blue'}}>If you like my work , please contact me</h6>
          <button>{<MdMessage fontSize="24px" color="white" />}<a href="sms:+1234567890">&nbsp; VIA CHAT SUPPORT</a></button>  &nbsp;
          <button>{<FaPhoneAlt fontSize="24px" />}<a href="tel:+1234567890">&nbsp; VIA CALL</a></button><br /> <br />
          <span>{<HiMail fontSize="24px" />}&nbsp; VIA EMAIL FORM</span>

          <div className='d-flex justify-content-center align-items-center ' id="contactForm"><ContactForm/></div>
       
          </Col>
          <Col md={6}>
          <img src={contactusImage} alt="" className='img-fluid' />
          </Col>
        </Row>
      
        </Container>

  
  </main>
   </>
  )
}

export default ContactPage