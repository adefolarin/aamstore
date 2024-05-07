// VideoBackground.js
import { React, useState } from 'react';
import { Container, Col, Row, ButtonGroup, Image, InputGroup, Form, Button, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faMapLocationDot, faMousePointer } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faFacebook, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { serverurl } from '../../providers/ServerUrl';
import axios from 'axios';

import './Footer.css'

export const Footer = () => {


  /**********************************************
       POST NEWS LETTER FORM DATA TO THE API
   **********************************************/

 const [buttontext, setButtonText] = useState("Subscribe");
 const [message, setMessageText] = useState();
 const [successmessage, setSuccessMessage] = useState();
 const [errormessage, setErrorMessage] = useState();

 const [newsletter_email, setNewsLetterEmail] = useState();

 const Save = async () => {
  setButtonText("Processing");
  if (newsletter_email === "") {
      setMessageText("error");
      setErrorMessage("All Fields are Required");
      setButtonText("Subscribe");
  } else {
      try {

          const items = { newsletter_email };
          //console.warn(items);
          const result = await axios.post(serverurl + "/api/newsletter", items);
          setMessageText("success");
          setSuccessMessage(result.data.message);
          setButtonText("Subscribe");
          console.warn(result);

      } catch (error) {
          setMessageText("error");
          setErrorMessage("!!Sorry, Your Subscription To Our News Letter Could Not Be Processed");
          setButtonText("Subscribe");
          console.log(error);
      }
  }
};


  return (
    <div style={{ marginTop: '0px' }}>

      <div style={{ backgroundColor: '#135592', paddingTop: '50px', paddingBottom: '50px' }} id="footer">
        <Container>
          <Row>
            <Col sm={12} md={4}>
              <div id="footercol1">
                <Image src="images/logoaam.png" id="logo" fluid />
                <br></br><br></br>
                <div>
                  <p>
                  The Wealthy Place Where Champions Are Raised.
                  Kingdom Connection Christian Center is a Word of Faith, 
                  non-denominational, full gospel church.


                  </p>
                </div>

                <div>
                  <div>
                    <p>
                      <FontAwesomeIcon icon={faMapLocationDot} />
                      &nbsp; 1391, Oswego Street, Aurora CO 80010
                    </p>
                  </div>
                  <div>
                    <p>
                      <FontAwesomeIcon icon={faPhone} />&nbsp; +1-720-859-1737
                    </p>
                  </div>
                  <div>
                    <p>
                      <FontAwesomeIcon icon={faEnvelope} />&nbsp; info@kccconline.org
                    </p>
                  </div>
                </div>

                <div>
                  <p>
                    <ButtonGroup className="me-2" aria-label="First group">
                      <Link to="#" className='btn btn-danger' id="footerbtn">
                        <FontAwesomeIcon icon={faFacebook} />
                      </Link>
                    </ButtonGroup>
                    <ButtonGroup className="me-2" aria-label="Second group">
                      <Link to="#" className='btn btn-danger' id="footerbtn">
                        <FontAwesomeIcon icon={faInstagram} />
                      </Link>
                    </ButtonGroup>
                    <ButtonGroup className="me-2" aria-label="Second group">
                      <Link to="#" className='btn btn-danger' id="footerbtn">
                        <FontAwesomeIcon icon={faTwitter} />
                      </Link>
                    </ButtonGroup>
                    <ButtonGroup className="me-2" aria-label="Second group">
                      <Link to="#" className='btn btn-danger' id="footerbtn">
                        <FontAwesomeIcon icon={faYoutube} />
                      </Link>
                    </ButtonGroup>

                  </p>
                </div>
              </div>
            </Col>

            <Col sm={12} md={4}>
              <div id="quicklinks">
                <h5 className='text-center'>QUICK LINKS</h5>
              </div>
              <br></br>
              <div className='' id="footerlinks">
                <Row>
                  <Col sm={6}>
                    <p><Link to="/livestream" id="link">Live Service</Link></p>
                    <p><Link to="/events" id="link">Our Events</Link></p>
                    <p><Link to="/store" id="link">E Store</Link></p>
                    <p><Link to="/departments" id="link">Departments</Link></p>
                    <p><Link to="/review" id="link" reloadDocument>Year In Review</Link></p>
                    <p><Link to="/give" id="link">Give</Link></p>
                  </Col>
                  <Col sm={6}>
                    <p><Link to="/about" id="link">Welcome Message</Link></p>
                    <p><Link to="/about" id="link">Our Mission</Link></p>
                    <p><Link to="/foodbank" id="link">Food Bank</Link></p>
                    <p><Link to="/sermons" id="link">Sermons</Link></p>
                    <p><Link to="/podcasts" id="link">Podcasts</Link></p>
                    <p><Link to="/donation" id="link">Donate</Link></p>
                  </Col>
                </Row>
              </div>
            </Col>

            <Col sm={12} md={4}>
              <div id="letterid">
                <h5 className='text-center'>NEWS LETTER</h5>
                <br></br>
                <p>
                  Sign up to newsletter to stay updated on all news and events at KCCC. Email updates on new publications, announcements and lots more. We promise we won't spam your box.
                </p>
                <br></br>
                <div>
                  {
                    message === 'success' ?
                      <div className='alert alert-success alert-sm'>
                        {successmessage}
                      </div> :
                      ''
                  }

                  {
                    message === 'error' ?
                      <div className='alert alert-danger alert-sm'>
                        {errormessage}
                      </div> :
                      ''
                  }
                </div>
                <p>
                  <InputGroup size='lg'>
                    <Form.Control
                      placeholder="Email Address"
                      aria-label="Email Address"
                      style={{ borderRadius: '0', fontSize: '14px' }}  value={newsletter_email} onChange={(e) => setNewsLetterEmail(e.target.value)} />

                    {
                     buttontext === "Processing" ?
                    <Button class="btn btn-danger" style={{ backgroundColor: 'red', color: '#fff', borderRadius: '0', border: 'none', fontSize:'15px', fontWeight:'bold'}} onClick={Save}>
                      {buttontext}
                    </Button> : ''
                    }

                     {
                     buttontext ===  "Subscribe" ?
                    <Button class="btn btn-danger" style={{ backgroundColor: 'red', color: '#fff', borderRadius: '0', border: 'none', fontSize:'15px', fontWeight:'bold' }} onClick={Save}>
                      {buttontext}
                    </Button> : ''
                    }


                  </InputGroup>
                </p>
              </div>
            </Col>
          </Row>

          <Row>
            <Col sm={12}>
              <p className='text-center' style={{ fontSize: '13px' }}>
                Copyright  &copy; KCCC 2024. All Right Reserved.
              </p>
            </Col>
          </Row>

        </Container>
      </div>


    </div>
  );
};
