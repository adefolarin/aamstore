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

export const Login = () => {


    /********************************************
             GET THE QUERY PARAMS   
    *********************************************/
    const search = useLocation().search;
    const success = new URLSearchParams(search).get('success');

    /**********************************************
       POST CONTACT FORM DATA TO THE API
     **********************************************/

    const [buttontext, setButtonText] = useState('SIGN IN');
    const [message, setMessageText] = useState();
    const [successmessage, setSuccessMessage] = useState();
    const [errormessage, setErrorMessage] = useState();

    const [storeusers_email, setStoreUsersEmail] = useState();
    const [storeusers_password, setStoreUsersPassword] = useState();


    /*useEffect(() => {
        setMembRegsDob("1985-02-23");
    },[])*/
    
   

    const navigate = useNavigate();

    const Save = async () => {
        setButtonText("Processing");
        if (storeusers_email === "" || storeusers_password === "" ) {
            setMessageText("error");
            setErrorMessage("All Fields are Required");
            setButtonText("SIGN IN");
        } else {
            try {

                const items = { storeusers_email, storeusers_password };
                //console.warn(items);
                const result = await axios.post(serverurl + "/api/storelogin", items);
                if(result.data.status == true) {
                 localStorage.setItem('user',JSON.stringify(result.data));
                 navigate('/dashboard');
                //
                //setButtonText("SIGN IN");
                } else if(result.data.status == false) {
                    setMessageText("error");
                    setErrorMessage(result.data.message);
                    setButtonText("SIGN IN"); 
                }
                else if(result.data[0]['storeusers_email'] == 'Email is required') {
                    setMessageText("error");
                    setErrorMessage('Email is required');
                    setButtonText("SIGN IN");
                }
                else if(result.data[0]['storeusers_password'] == 'Password is required') {
                    setMessageText("error");
                    setErrorMessage('Password is required');
                    setButtonText("SIGN IN");
                }
                console.warn(result.data);

            } catch (error) {
                setMessageText("error");
                setErrorMessage("Incorrect Login Details");
                setButtonText("SIGN IN");
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
                            <h4 className='text-center' id='bluecolor'>LOGIN</h4>
                            {
                               success == 'success'?
                               <div className='alert alert-success'>
                                  Registration Successfull. You can now login
                               </div>: ''
                            }
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
                                            <p>
                                            {
                                                buttontext === "Processing" ?
                                                    <Button class="btn btn-danger" style={{ backgroundColor: '#249D59', color: '#fff', borderRadius: '0', border: 'none', fontWeight: 'bold' }} onClick={Save}>
                                                        {buttontext}
                                                    </Button> :
                                                    ''
                                            }

                                            {
                                               
                                                buttontext === "SIGN IN" ?
                                                    <Button class="btn btn-danger" style={{ backgroundColor: 'red', color: '#fff', borderRadius: '0', border: 'none', fontWeight: 'bold' }} onClick={Save}>
                                                        {buttontext}
                                                    </Button>:
                                                    ''
                                            }
                                            </p>
                                            
                                             &nbsp;&nbsp;
                                             <div style={{ marginTop:'2px' }}>
                                               <p style={{ fontWeight:'bold' }}>
                                               <Link to='/passwordreset' style={{ textDecoration:'none',color:'#135592' }}
                                             reloadDocument> &nbsp; Forgot Your Password?</Link>
                                             &nbsp;&nbsp;
                                             <Link to='/signup' class="btn btn-danger" style={{ backgroundColor: '#135592', color: '#fff', borderRadius: '0', border: 'none', fontWeight: 'bold' }}
                                             reloadDocument> &nbsp; Create Account</Link> </p>
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
