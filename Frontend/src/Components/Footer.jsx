import React from 'react'
import { Container,Col,Row } from 'react-bootstrap'
import emailIcon from '../Images/emailIcon.png'
import "./homePage.css";
import heartLogo from '../Images/heartlogo.png'
import copyrightLogo from '../Images/copyrightIcon6.png'
import instaLogo from '../Images/SocialMediaIcons/instagramIcon2.svg'
import facebookLogo from '../Images/SocialMediaIcons/facebookIcon2.svg'
import githubIcon from '../Images/SocialMediaIcons/githubIcon2.png'
import twitterIcon from '../Images/SocialMediaIcons/twitterIcon2.svg'
import youtubeIcon from '../Images/SocialMediaIcons/youtubeIcon2.svg'

const Footer = () => {
  return (
   <>
    <Container className="mt-1 mb-3 text-align-center " >
        <Row className='d-flex justify-content-center align-items-center'>
          <Col md={8}  className='p-5 pt-3 pb-4' style={{backgroundColor:'rgb(223, 231, 222)',borderRadius:'10px'}}>
          <img src={emailIcon} alt="" width={50}/>
          <p style={{color:'rgb(109, 214, 107)',fontSize:'20px'}}>Save this article</p>
          <p>Enter your email address and we'll send straight to your inbox .</p>
          <div>  
            <input type="email" placeholder='Email Address' id="emailInput" /> &nbsp;
            <button  id='emailBtn'>SEND</button>
            </div>     
          <div><input type="checkbox" id='checkbox' style={{width:'25px'}}/><label htmlFor="checkbox" id="footerCheckbox">Send me new released tasks from the Work at Home</label></div>
          </Col>
        </Row>
      </Container>

      <div className='footer'>
      <Container className="mt-0  text-align-center " style={{backgroundColor:'black'}}>
        <Row className='d-flex justify-content-center align-items-center'>
          <Col md={6}>
          <p style={{fontSize:'40px',color:'white'}}>Don't miss out</p>
            <p style={{fontSize:'25px',color:'white'}}>Sign up to stay updated on the latest in technology</p>
        <input type="email" placeholder="   &#9993;  Email Address"  name="email" required style={{padding:'10px 20px',borderRadius:'5px'}}/>  &nbsp;&nbsp;
        <input type="submit" name="Subscribe to ChallengeX" value="Subscribe To ChallengeX" class="subscribeBox"/> <br /> <br />
        <p style={{fontSize:'17px',color:'white'}}>We're committed to your privacy. ChallengeX uses the information you provide to us to contact you about our relevant
      content, products, and services. You may unsubscribe from these communications at any time.</p>
          </Col>
          <Col md={4}>
          <p style={{color:'white',fontSize:'20px'}}>Get in touch</p>
      <p><img src={instaLogo} alt="" class="icons"/> &nbsp;&nbsp;&nbsp;
        <img src={facebookLogo} alt="" class="icons"/>  &nbsp;&nbsp;&nbsp;
        <img src={youtubeIcon} alt="" class="icons"/>  &nbsp;&nbsp;&nbsp;
        <a href="https://github.com/vedantBCodes" target='_blank'><img src={githubIcon} alt="" class="icons"/></a> &nbsp;&nbsp;
        <img src={twitterIcon} alt="" class="icons"/>  &nbsp;&nbsp;
      </p>
          </Col>
        </Row>
      </Container>

      <hr style={{border:'1px solid white'}}/>
      <h4 class="text-center copyrightLine" style={{fontSize:'17px'}}>
     copyright&nbsp;<img src={copyrightLogo} alt="" width={20} />&nbsp;.&nbsp;Made with
     <img src={heartLogo} alt="" width={25} /> by vedant yeotikar.
     All rights reserved .
   </h4> 
   </div>
     </>
  )
}

export default Footer