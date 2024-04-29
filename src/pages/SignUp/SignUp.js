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

export const SignUp = () => {


    /**********************************************
       POST CONTACT FORM DATA TO THE API
     **********************************************/

    const [buttontext, setButtonText] = useState('Send');
    const [message, setMessageText] = useState();
    const [successmessage, setSuccessMessage] = useState();
    const [errormessage, setErrorMessage] = useState();

    const [membregs_name, setMembRegsName] = useState();
    const [membregs_address, setMembRegsAddress] = useState();
    const [membregs_email, setMembRegsEmail] = useState();
    const [membregs_pnum, setMembRegsPnum] = useState();
    const [membregs_gender, setMembRegsGender] = useState();
    const [membregs_maritalstatus, setMembRegsMaritalStatus] = useState();
    const [membregs_dob, setMembRegsDob] = useState();
    const [membregs_how, setMembRegsHow] = useState();
    const [membregs_reason, setMembRegsReason] = useState();
    const [membregs_bornagain, setMembRegsBornAgain] = useState();
    const [membregs_guidance, setMembRegsGuidance] = useState();
    const [membregs_request, setMembRegsRequest] = useState();
    const [membregs_updated, setMembRegsUpdated] = useState();

    /*useEffect(() => {
        setMembRegsDob("1985-02-23");
    },[])*/
    
   

    const navigate = useNavigate();

    const Save = async () => {
        setButtonText("Processing");
        if (membregs_name === "" || membregs_address === "" || membregs_email === "" || membregs_pnum === "" || membregs_gender === "" || membregs_maritalstatus === "" || membregs_dob === "" || membregs_how === "" || membregs_reason === "" || membregs_bornagain === "" || membregs_guidance === "" || membregs_request === "" || membregs_updated === "") {
            setMessageText("error");
            setErrorMessage("All Fields are Required");
            setButtonText("Send");
        } else {
            try {

                const items = { membregs_name, membregs_address, membregs_email, membregs_pnum, membregs_gender, membregs_maritalstatus, membregs_dob, membregs_how, membregs_reason, membregs_bornagain, membregs_guidance, membregs_request, membregs_updated };
                //console.warn(items);
                const result = await axios.post(serverurl + "/api/membreg", items);
                setMessageText("success");
                setSuccessMessage(result.data.message);
                setButtonText("Send");
                console.warn(result);

            } catch (error) {
                setMessageText("error");
                setErrorMessage("!!Sorry, Your Registration Could Not Be Processed");
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
                                <Link to="/signup" reloadDocument className='text-white' id="currentlink">SIGN UP</Link>
                            </p>
                            <h4>SIGN UP</h4>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <Container>
                    <Row>
                        <Col md={12}>
                            <Card id="deptcard" className="eventdetailimg">
                                <Card.Img id="eventimg" variant="top" src="images/signupbanner.png" thumbnail />
                            </Card>
                        </Col>
                    </Row>


                    <br></br><br></br>
                    <Row>

                    </Row>
                </Container>
            </div>

            <br></br>
            <Container>
                <Row>
                    <Col md={12}>
                        <div>
                            <h4 className='text-center' id='bluecolor'>Sign UP As A Member</h4>
                            <p className='text-center' id='bluecolor'>
                                Are you an online member interested in becoming a full member?
                                <br></br>
                                Please fill the form to join and experience the full benefits of being a child of God
                            </p>
                            <br></br>
                        </div>
                    </Col>
                </Row>
            </Container>

            <br></br>


            <div>
                <Container>
                    <Row>
                        <Col md={12}>
                            <Card id="deptcard">
                                <Card.Body>
                                    <Form>

                                        <InputGroup className="mb-3" controlId="">
                                            <Form.Control type="text" size="lg" placeholder="Full Name" style={{ fontSize: '16px', padding: '15px' }}
                                                value={membregs_name} onChange={(e) => setMembRegsName(e.target.value)} />
                                        </InputGroup>

                                        <InputGroup className="mb-3" controlId="">
                                            <Form.Control type="text" size="lg" placeholder="Full Address" style={{ fontSize: '16px', padding: '15px' }}
                                                value={membregs_address} onChange={(e) => setMembRegsAddress(e.target.value)} />
                                        </InputGroup>

                                        <InputGroup className="mb-3" controlId="">
                                            <Form.Control type="email" size="lg" placeholder="Email" style={{ fontSize: '16px', padding: '15px' }}
                                                value={membregs_email} onChange={(e) => setMembRegsEmail(e.target.value)} />

                                        </InputGroup>

                                        <Row>
                                            <Col>
                                                <InputGroup className="mb-3" controlId="">
                                                    <Form.Control type="text" size="lg" placeholder="Pnone Number" style={{ fontSize: '16px', padding: '15px' }}
                                                        value={membregs_pnum} onChange={(e) => setMembRegsPnum(e.target.value)} />
                                                </InputGroup>
                                            </Col>
                                            <Col>
                                                <InputGroup className="mb-3" controlId="">
                                                    <Form.Select type="text" size="lg" style={{ fontSize: '16px', padding: '15px' }}
                                                        value={membregs_gender} onChange={(e) => setMembRegsGender(e.target.value)} >
                                                        <option value=''>Gender</option>
                                                        <option value="Male">Male</option>
                                                        <option value="Female">Female</option>
                                                    </Form.Select>
                                                </InputGroup>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col>
                                                <InputGroup className="mb-3" controlId="">
                                                    <Form.Select type="text" size="lg" style={{ fontSize: '16px', padding: '15px' }}
                                                        value={membregs_maritalstatus} onChange={(e) => setMembRegsMaritalStatus(e.target.value)} >
                                                        <option value=''>Marital Status</option>
                                                        <option value="Single">Single</option>
                                                        <option value="Married">Married</option>
                                                    </Form.Select>
                                                </InputGroup>
                                            </Col>
                                            <Col>
                                                <InputGroup className="mb-3" controlId="">
                                                    <Form.Control type="date" size="lg" placeholder='Date Of Birth' style={{ fontSize: '16px', padding: '15px' }} 
                                                        value={membregs_dob} onChange={(e) => setMembRegsDob(e.target.value)} />
                                                </InputGroup>
                                            </Col>
                                        </Row>

                                        <InputGroup className="mb-3" controlId="">
                                            <Form.Select type="text" size="lg" style={{ fontSize: '16px', padding: '15px' }}
                                                value={membregs_how} onChange={(e) => setMembRegsHow(e.target.value)} >
                                                <option value=''>How did you hear about Kingdom Christian Connection Center?</option>
                                                <option value="Facebook">Facebook</option>
                                                <option value="Youtube">Youtube</option>
                                            </Form.Select>
                                        </InputGroup>

                                        <InputGroup className="mb-3" controlId="">
                                            <Form.Control type="text" size="lg" style={{ fontSize: '16px', padding: '15px' }} placeholder='Reason for joining: e.g I am seeking spiritual development'
                                                value={membregs_reason} onChange={(e) => setMembRegsReason(e.target.value)} />
                                        </InputGroup>
                                         
                                         <Container>
                                          <Row style={{ border:'1px solid #eee', borderRadius:'5px', padding:'0', padding:'10px' }}>
                                            <Col>
                                              <p>Are you born again?</p>
                                            </Col>
                                            <Col>
                                                <Form.Check
                                                    inline
                                                    reverse
                                                    label="Yes"
                                                    type='radio'
                                                    value='Yes'
                                                    name="membregs_bornagain"
                                                    
                                                    onChange={(e) => setMembRegsBornAgain(e.target.value)}
                                                  
                                                />
                                                <Form.Check
                                                    inline
                                                    reverse
                                                    label="No"
                                                    type='radio'
                                                    value='No'
                                                    name="membregs_bornagain"
                                                    
                                                    onChange={(e) => setMembRegsBornAgain(e.target.value)}
                                                   
                                                />
                                            </Col>

                                        </Row>
                                        </Container>
                                        <br></br>

                                        <Container>
                                          <Row style={{ border:'1px solid #eee', borderRadius:'5px', padding:'0', padding:'10px' }}>
                                            <Col>
                                              <p>Can we offer you guidance and support through counselling?</p>
                                            </Col>
                                            <Col>
                                                <Form.Check
                                                    inline
                                                    reverse
                                                    label="Yes"
                                                    type='radio'
                                                    name="membregs_guidance"
                                                    value='Yes'
                                             
                                                    onChange={(e) => setMembRegsGuidance(e.target.value)}
                                                  
                                                />
                                                <Form.Check
                                                    inline
                                                    reverse
                                                    label="No"
                                                    type='radio'
                                                    name="membregs_guidance"
                                                    value='No'
                                                    
                                                    onChange={(e) => setMembRegsGuidance(e.target.value)}
                                                   
                                                />
                                            </Col>
                                        </Row>
                                        </Container>
                                        <br></br>


                                        <InputGroup className="mb-3" controlId="">
                                            <Form.Control type="text" size="lg" placeholder="Write any specific prayer requests you may have" style={{ fontSize: '16px', padding: '15px' }}
                                                        value={membregs_request} onChange={(e) => setMembRegsRequest(e.target.value)} as="textarea" rows={5} />
                                        </InputGroup>


                                        <Container>
                                          <Row style={{ border:'1px solid #eee', borderRadius:'5px', padding:'0', padding:'15px' }}>
                                            <Col>
                                              <p>Would you like to receive news update and newsletter via email</p>
                                            </Col>
                                            <Col>
                                                <Form.Check
                                                    inline
                                                    reverse
                                                    label="Yes"
                                                    type='radio'
                                                    name="membregs_updated"
                                                    value='Yes'
                                                 
                                                    onChange={(e) => setMembRegsUpdated(e.target.value)}
                                                  
                                                />
                                                <Form.Check
                                                    inline
                                                    reverse
                                                    label="No"
                                                    type='radio'
                                                    name="membregs_updated"
                                                    value='No'
                                                 
                                                    onChange={(e) => setMembRegsUpdated(e.target.value)}
                                                   
                                                />
                                            </Col>
                                        </Row>
                                        </Container>




                                    </Form>
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
