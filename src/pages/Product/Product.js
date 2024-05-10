import { React, useEffect, useState } from 'react'
import { Card, Image, InputGroup } from 'react-bootstrap';
import { Link, useLocation, useSearchParams, useNavigate } from 'react-router-dom';
import { Container, Col, Row, Button, ButtonGroup, ButtonToolbar, Table, Tab, Form, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideoCamera, faShareNodes, faDownload, faFileAudio, faUser, faLocation, faClock, faPerson, faArrowLeft, faAngleRight, faBook, faMessage } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faFacebook, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faPhone, faMapLocationDot, faMapLocation, faAddressCard, faAddressBook } from '@fortawesome/free-solid-svg-icons';
import { Fade, Bounce, Slide, Jump, Roll, Flip, Rotate, Flash, Jello,Pulse, RubberBand, Shake, Swing, Tada, Wobble, HeadShake, Pop, Spin, LightSpeed } from "react-swift-reveal";
import axios from 'axios';
import { serverurl } from '../../providers/ServerUrl';
import '../EventDetail.css';
import { ProductAll } from '../../components/ProductAll';

export const Product = () => {


    return (
        <div>
            <br></br><br></br><br></br><br></br>
            <Container style={{ marginTop:'100px' }}>
                <Row>
                    <Col md={12}>
                        <br></br><br></br>
                        <h4 id="bluecolor" class='text-center'>Browse Products</h4>
                        <hr style={{ borderTop: '2px solid red',width:'10%',margin:'auto' }}></hr>
                        <br></br>
                        <p id="bluecolor" class='text-center'>Elevate your spiritual journey with the transformative <br></br>power of Christian Books</p>
                    </Col>
                    <br></br>
               </Row>
               <div>
                <ProductAll/>
             </div>
            </Container>
            
            <br></br><br></br>
        </div> 
    )
}
