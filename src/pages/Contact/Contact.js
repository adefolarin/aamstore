import { React, useEffect, useState } from 'react'
import { Card, Image, InputGroup } from 'react-bootstrap';
import { Link, useLocation, useSearchParams, useNavigate } from 'react-router-dom';
import { Container, Col, Row, Button, ButtonGroup, ButtonToolbar, Table, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideoCamera, faShareNodes, faDownload, faFileAudio, faUser, faLocation, faClock, faPerson, faArrowLeft, faAngleRight, faBook, faMessage } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faFacebook, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faPhone, faMapLocationDot, faMapLocation, faAddressCard, faAddressBook } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { serverurl } from '../../providers/ServerUrl';
import '../EventDetail.css';

export const Contact = () => {


    /**********************************************
       POST CONTACT FORM DATA TO THE API
     **********************************************/

       const [buttontext, setButtonText] = useState('Send');
       const [message, setMessageText] = useState();
       const [successmessage, setSuccessMessage] = useState();
       const [errormessage, setErrorMessage] = useState();
   
       const [contact_name, setContactName] = useState();
       const [contact_email, setContactEmail] = useState();
       const [contact_pnum, setContactPnum] = useState();
       const [contact_subject, setContactSubject] = useState();
       const [contact_message, setContactMessage] = useState();
   
       const navigate = useNavigate();
   
       const Save = async () => {
           setButtonText("Processing");
           if(contact_name === "" || contact_email === "" || contact_pnum === "" || contact_subject === "" || contact_message === "") {
               setMessageText("error");
               setErrorMessage("All Fields are Required");
               setButtonText("Send");
           } else {
           try {
                         
               const items = { contact_name, contact_email, contact_pnum, contact_subject, contact_message };
               //console.warn(items);
               const result = await axios.post(serverurl + "/api/contact", items);
               setMessageText("success");
               setSuccessMessage(result.data.message);
               setButtonText("Send");
               console.warn(result);
           
           } catch (error) {
               setMessageText("error");
               setErrorMessage("!!Sorry, Your Message Could Not Be Processed");
               setButtonText("Send");
               console.log(error);
           }
         }
       };





    return (
        <div>

            <div>
                <br></br><br></br>
                <div style={{ position: 'relative' }}>
                    <Image fluid src="images/img3.jpg" alt="Card image" id="bannerimg" />
                    <div id="banneroverlay">
                        <div id="bannerid" className='text-center'>
                            <p id="navhistory">
                                <Link to="/" id="homelink" reloadDocument>Home &nbsp; &#60; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Link>
                                <Link to="/contact" reloadDocument className='text-white' id="currentlink">CONTACT</Link>
                            </p>
                            <h4>Contact Us</h4>
                        </div>
                    </div>
                </div>
            </div>

            <br></br><br></br>
            <Container>
                <Row>
                    <Col md={12}>
                        <div>
                            <br></br>
                            <Row>

                                <Col md={4}>
                                    <Card id="deptcard" style={{ backgroundColor: '#135592', color: '#fff', padding: '38px' }}>
                                        <Card.Title>
                                            <div className='text-center' id="bluecolor">
                                                <button className='btn' style={{ backgroundColor: '#fff', color: '#135592', borderRadius: '50%', marginTop: '10px', marginBottom: '10px', fontSize: '20px' }}><FontAwesomeIcon icon={faAddressBook} /></button>
                                                <br></br><br></br>
                                                <h5 style={{ color: '#fff', fontSize: '18px' }}>1391, Oswego Street, Aurora CO 80010</h5>
                                            </div>
                                        </Card.Title>
                                    </Card>
                                </Col>


                                <Col md={4}>
                                    <Card id="deptcard" style={{ backgroundColor: '#135592', color: '#fff', padding: '50px' }}>
                                        <Card.Title>
                                            <div className='text-center' id="bluecolor">
                                                <button className='btn' style={{ backgroundColor: '#fff', color: '#135592', borderRadius: '50%', marginTop: '10px', marginBottom: '10px', fontSize: '20px' }}><FontAwesomeIcon icon={faPhone} /></button>
                                                <br></br><br></br>
                                                <h5 style={{ color: '#fff', fontSize: '18px' }}>+1-720-859-1737</h5>
                                            </div>
                                        </Card.Title>
                                    </Card>
                                </Col>

                                <Col md={4}>
                                    <Card id="deptcard" style={{ backgroundColor: '#135592', color: '#fff', padding: '50px' }}>
                                        <Card.Title>
                                            <div className='text-center' id="bluecolor">
                                                <button className='btn' style={{ backgroundColor: '#fff', color: '#135592', borderRadius: '50%', marginTop: '10px', marginBottom: '10px', fontSize: '20px' }}><FontAwesomeIcon icon={faEnvelope} /></button>
                                                <br></br><br></br>
                                                <h5 style={{ color: '#fff', fontSize: '18px' }}> info@kccconline.org</h5>
                                            </div>
                                        </Card.Title>
                                    </Card>
                                </Col>


                            </Row>
                        </div>
                    </Col>
                </Row>
            </Container>

            <br></br><br></br>


            <div>
                <Container>
                    <Row>
                        <Col md={12}>
                            <Card id="deptcard">
                                <Card.Header style={{ backgroundColor: '#135592', color: '#fff', fontSize: '20px', textAlign: 'center' }}>
                                    Send Us A Message
                                </Card.Header>
                                <Card.Body>
                                    <Form>

                                        <InputGroup className="mb-3" controlId="">
                                            <Button variant="outline-secondary" id="button-addon1">
                                            <FontAwesomeIcon icon={faUser} />
                                            </Button>
                                            <Form.Control type="text" size="lg" placeholder="Full Name" style={{ fontSize: '16px', padding: '15px' }}
                                                value={contact_name} onChange={(e) => setContactName(e.target.value)} />
                                        </InputGroup>

                                        <InputGroup className="mb-3" controlId="">
                                            <Button variant="outline-secondary" id="button-addon1">
                                            <FontAwesomeIcon icon={faEnvelope} />
                                            </Button>        
                                            <Form.Control type="email" size="lg" placeholder="Email" style={{ fontSize: '16px', padding: '15px' }}
                                                value={contact_email} onChange={(e) => setContactEmail(e.target.value)} />
                                      
                                        </InputGroup>

                                        <InputGroup className="mb-3" controlId="">
                                            <Button variant="outline-secondary" id="button-addon1">
                                            <FontAwesomeIcon icon={faPhone} />
                                            </Button>
                                            <Form.Control type="text" size="lg" placeholder="Pnone Number" style={{ fontSize: '16px', padding: '15px' }}
                                                value={contact_pnum} onChange={(e) => setContactPnum(e.target.value)} />
                                        </InputGroup>

                                        <InputGroup className="mb-3" controlId="">
                                            <Button variant="outline-secondary" id="button-addon1">
                                            <FontAwesomeIcon icon={faBook} />
                                            </Button>
                                            <Form.Control type="text" size="lg" placeholder="Subject" style={{ fontSize: '16px', padding: '15px' }}
                                                value={contact_subject} onChange={(e) => setContactSubject(e.target.value)} />
                                        </InputGroup>

                                        <Form.Group className="mb-3" controlId="">
                                            <Form.Control type="text" size="lg" placeholder="Message" style={{ fontSize: '16px', padding: '15px' }}
                                                value={contact_message} onChange={(e) => setContactMessage(e.target.value)} as="textarea" rows={3} />
                                        </Form.Group>
                                    </Form>
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
                                    <ButtonToolbar
                                        className="justify-content-between"
                                        aria-label="Toolbar with Button groups"
                                    >

                                        <ButtonGroup className="me-4" aria-label="First group">
                                            {
                                                buttontext === "Processing" ?
                                                    <Button class="btn btn-danger" style={{ backgroundColor: '#249D59', color: '#fff', borderRadius: '0', border: 'none', fontWeight: 'bold' }} onClick={Save}>
                                                        {buttontext}
                                                    </Button> :
                                                    ''
                                            }

                                            {
                                                buttontext === "Send" ?
                                                    <Button class="btn btn-danger" style={{ backgroundColor: 'red', color: '#fff', borderRadius: '0', border: 'none', fontWeight: 'bold' }} onClick={Save}>
                                                        {buttontext}
                                                    </Button> :
                                                    ''
                                            }
                                        </ButtonGroup>
                                    </ButtonToolbar>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>

            <br></br>



        </div >
    )
}
