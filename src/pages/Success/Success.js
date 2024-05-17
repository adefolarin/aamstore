import { React, useEffect, useState } from 'react'
import { Card, Image, InputGroup } from 'react-bootstrap';
import { Link, useLocation, useSearchParams, useNavigate } from 'react-router-dom';
import { Container, Col, Row, Button, ButtonGroup, ButtonToolbar, Table, Tab, Form, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideoCamera, faShareNodes, faDownload, faFileAudio, faUser, faLocation, faClock, faPerson, faArrowLeft, faAngleRight, faBook, faMessage } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faFacebook, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faPhone, faMapLocationDot, faMapLocation, faAddressCard, faAddressBook } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { serverurl } from '../../providers/ServerUrl';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export const Success = () => { 


    /**********************************************
       POST PROFILE FORM DATA TO THE API
     **********************************************/

       let user = JSON.parse(localStorage.getItem('user'));    

    let storeusersid = user.storeuserone.storeusers_id;

    useEffect(() => {
        localStorage.removeItem('storeusers_state');
        localStorage.removeItem('storeusers_country');
        localStorage.removeItem('storeusers_address');
        localStorage.removeItem('storeusers_deliv');
    }, []);

 
    return (
        <div>

           <br></br><br></br><br></br>
           {
            localStorage.getItem('user') ?
            <>
            <Container style={{ marginTop:'250px' }}>
                <Row>
                    <br></br><br></br><br></br>
                    <Col sm={12}>
                        <Card>
                        <Card.Body>
                        <div className='alert alert-success'>
                            Order placed successfully
                        </div>
                        </Card.Body>
                        </Card>
                        <br></br><br></br>

                    </Col>

                    
                </Row>

            </Container>
            </>: null
           }

            <br></br><br></br>
        </div> 
    )
}
