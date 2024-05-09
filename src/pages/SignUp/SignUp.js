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
       POST SIGN UP FORM DATA TO THE API
     **********************************************/

    const [buttontext, setButtonText] = useState('SIGN UP');
    const [message, setMessageText] = useState();
    const [successmessage, setSuccessMessage] = useState();
    const [errormessage, setErrorMessage] = useState();

    const [storeusers_fname, setStoreUsersFName] = useState();
    const [storeusers_lname, setStoreUsersLName] = useState();
    const [storeusers_email, setStoreUsersEmail] = useState();
    const [storeusers_pnum, setStoreUsersPnum] = useState();
    const [storeusers_gender, setStoreUsersGender] = useState();
    const [storeusers_password, setStoreUsersPassword] = useState();
    const [storeusersconfirm_password, setStoreUsersCpassword] = useState();


    /*useEffect(() => {
        setMembRegsDob("1985-02-23");
    },[])*/
    
   

    const navigate = useNavigate();

    const Save = async () => {
        let filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        setButtonText("Processing");
        if (storeusers_fname === "" || storeusers_lname === "" || storeusers_email === "" || storeusers_pnum === "" || storeusers_gender === "" || storeusers_password === "" || storeusersconfirm_password === "") {
            setMessageText("error");
            setErrorMessage("All Fields are Required");
            setButtonText("SIGN UP");
        } 
        else if(!filter.test(storeusers_email)) {
            setMessageText("error");
            setErrorMessage("Email is not valid");
            setButtonText("SIGN UP");
        }
        else {
            try {

                const items = { storeusers_fname, storeusers_lname, storeusers_email, storeusers_pnum, storeusers_gender, storeusers_password, storeusersconfirm_password };
                //console.warn(items);
                const result = await axios.post(serverurl + "/api/storeregister", items);
                if(result.data.status == true) {
                    setMessageText("success");
                    navigate('/login?success=success');
                    //setSuccessMessage(result.data.message);
                    //setButtonText("SIGN UP");
                } else if(result.data.status == false) {
                    setMessageText("error");
                    setErrorMessage(result.data.message);
                    setButtonText("SIGN UP"); 
                } else if(result.data[0]['storeusers_password'] == 'Password Cannot Be Less Than 8 characters') {
                    setMessageText("error");
                    setErrorMessage('Password Cannot Be Less Than 8 characters');
                    setButtonText("SIGN UP");
                }
                else if(result.data[0]['storeusersconfirm_password'] == 'Confirm Password Cannot Be Less Than 8 characters') {
                    setMessageText("error");
                    setErrorMessage('Confirm Password Cannot Be Less Than 8 characters');
                    setButtonText("SIGN UP");
                }
                /*else if(result.data[0]['storeusers_email'] == 'Email is required') {
                    setMessageText("error");
                    setErrorMessage('Email is required');
                    setButtonText("SIGN UP");
                }
                else if(result.data[0]['storeusers_pnum'] == 'Valid Phone Number is required') {
                    setMessageText("error");
                    setErrorMessage('Phone number is required');
                    setButtonText("SIGN UP");
                }
                else if(result.data[0]['storeusers_gender'] == 'Gender is required') {
                    setMessageText("error");
                    setErrorMessage('Gender is required');
                    setButtonText("SIGN UP");
                }
                else if(result.data[0]['storeusers_password'] == 'Password is required') {
                    setMessageText("error");
                    setErrorMessage('Password is required');
                    setButtonText("SIGN UP");
                }
                else if(result.data[0]['storeusersconfirm_password'] == 'Confirm Password is required') {
                    setMessageText("error");
                    setErrorMessage('Confirm Password is required');
                    setButtonText("SIGN UP");
                }*/
                console.warn(result.data);

            } catch (error) {
                setMessageText("error");
                setErrorMessage("!!Sorry, Your Registration Could Not Be Processed");
                setButtonText("SIGN UP");
                console.log(error);
            }
        }
    };





    return (
        <div>

            <br></br>
            <Container style={{ marginTop:'200px' }}>
                <Row>
                    <Col md={12}>
                        <div>
                            <h4 className='text-left' id='bluecolor'>Sign UP</h4>
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

                                      <Container>
                                        <Row>
                                            <Col>
                                                <InputGroup className="mb-3" controlId="">
                                                    <Form.Control type="text" size="lg" placeholder="First Name" style={{ fontSize: '16px', padding: '15px' }}
                                                        value={storeusers_fname} onChange={(e) => setStoreUsersFName(e.target.value)} />
                                                </InputGroup>
                                            </Col>
                                            <Col>
                                                <InputGroup className="mb-3" controlId="">
                                                    <Form.Control type="text" size="lg" placeholder="Last Name" style={{ fontSize: '16px', padding: '15px' }}
                                                        value={storeusers_lname} onChange={(e) => setStoreUsersLName(e.target.value)} />
                                                </InputGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <InputGroup className="mb-3" controlId="">
                                                    <Form.Select type="text" size="lg" style={{ fontSize: '16px', padding: '15px' }}
                                                        value={storeusers_gender} onChange={(e) => setStoreUsersGender(e.target.value)} >
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
                                                    <Form.Control type="text" size="lg" placeholder="Phone Number" style={{ fontSize: '16px', padding: '15px' }}
                                                        value={storeusers_pnum} onChange={(e) => setStoreUsersPnum(e.target.value)} />
                                                </InputGroup>
                                            </Col>
                                            <Col>
                                                <InputGroup className="mb-3" controlId="">
                                                    <Form.Control type="text" size="lg" placeholder="Email Address" style={{ fontSize: '16px', padding: '15px' }}
                                                        value={storeusers_email} onChange={(e) => setStoreUsersEmail(e.target.value)} />
                                                </InputGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <InputGroup className="mb-3" controlId="">
                                                    <Form.Control type="password" size="lg" placeholder="Password" style={{ fontSize: '16px', padding: '15px' }}
                                                        value={storeusers_password} onChange={(e) => setStoreUsersPassword(e.target.value)} />
                                                </InputGroup>
                                            </Col>
                                            <Col>
                                                <InputGroup className="mb-3" controlId="">
                                                    <Form.Control type="password" size="lg" placeholder="Confirm Password" style={{ fontSize: '16px', padding: '15px' }}
                                                        value={storeusersconfirm_password} onChange={(e) => setStoreUsersCpassword(e.target.value)} />
                                                </InputGroup>
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
                                                buttontext === "SIGN UP" ?
                                                    <Button class="btn btn-danger" style={{ backgroundColor: 'red', color: '#fff', borderRadius: '0', border: 'none', fontWeight: 'bold' }} onClick={Save}>
                                                        {buttontext}
                                                    </Button> :
                                                    ''
                                            }
                                             &nbsp;&nbsp;
                                             <div style={{ marginTop:'8px' }}>
                                               <p style={{ fontWeight:'bold' }}>Already have an account?
                                             <Link to='/login' style={{ textDecoration:'none' }}> &nbsp; Sign In Here</Link> </p>
                                             </div>
                                            
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
