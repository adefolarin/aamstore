import React from 'react'
import { Container, Col, Row, Card, ButtonToolbar, ButtonGroup, Image, Tab, Nav, InputGroup, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideoCamera, faShareNodes, faDownload, faFileAudio, faUser, faLocation, faClock, faPerson, faArrowLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faFacebook, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { Link } from 'react-router-dom';
import { serverurl } from '../providers/ServerUrl';

import Slider from 'react-slick';

export const Event = ({ event }) => {

        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
    
       };
    
        // Create a MediaQuery object
    const y = window.matchMedia("(max-width: 767px)");
    
    const changeSize = (x) => {
        if(x.matches) { 
        settings.slidesToShow = 1
        } else {
        settings.slidesToShow = 3
        }
    }
    
    changeSize(y)
    
    // Attach listener function on state changes
    y.addEventListener("change", function() {
        changeSize(y);
    });
    return (
        <div>
            <br></br><br></br>
            <Container>
                <Row>
                    <Col md={4}><hr style={{ borderTop: '1px solid #848484' }}></hr></Col>
                    <Col md={4}>
                        <h4 id="bluecolor" class='text-center'>Events</h4>
                    </Col>
                    <Col md={4}><hr style={{ borderTop: '1px solid #848484' }}></hr></Col>
                    <br></br><br></br><br></br>
                    <Slider {...settings}>
                    {
                        event && event.length > 0 && event.map((eventData) => {
                            return <>
                                {eventData.events_title !== '' || eventData.events_enddate > eventData.datenow ?
                                    <Col md={12}>
                                        <Card id="deptcard" className='deptslide'>
                                            <Card.Img variant="top" src={eventData.events_file} />
                                            <Card.Body className='text-center'>
                                                <Card.Title>
                                                    <p className='homeminicalevent'>
                                                        <ButtonGroup vertical>
                                                            <Button style={{ backgroundColor: '#d8d8d8', color: '#135592', fontWeight: '800', border: 'none', height: '50px' }}>{eventData.events_startdatemonth}</Button>
                                                            <Button style={{ backgroundColor: '#135592', color: '#fff', fontWeight: '800', border: 'none', borderRadius: '3px', height: '' }}>{eventData.events_starttime}</Button>
                                                        </ButtonGroup>
                                                    </p>
                                                    <h6 id="bluecolor">{eventData.events_title}</h6>
                                                </Card.Title>
                                                {
                                                eventData.events_status ?
                                                <Card.Text style={{ display: 'block' }}>
                                                    <p><Button className="" style={{ backgroundColor: 'red', border: 'none', borderRadius: '0', fontWeight: '600' }}>Ongoing</Button></p>
                                                </Card.Text> :
                                                ''
                                                }
                                                <Link to={"/event-details?eventid=" + eventData.events_id}
                                                    variant="danger" className='btn btn-danger btn-sm'
                                                    style={{ textDecoration: 'none', color: '#135592', border: '1px solid red', borderRadius: '0', backgroundColor: 'transparent' }} reloadDocument>Event Details</Link>
                                            </Card.Body>
                                        </Card>
                                    </Col> :
                                    <Col md={12}>
                                        <Card id="deptcard">
                                            <Card.Body className='text-center'>
                                                <Card.Title>
                                                    No Events For Now
                                                </Card.Title>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                }
                            </>
                        })
                    }
                    </Slider>
                </Row>


                <br></br><br></br>
                <Row>
                    <Col md={4}><hr style={{ borderTop: '1px solid #848484' }}></hr></Col>
                    <Col md={4}>
                        <p class="text-center">
                            <Link to="/events" reloadDocument class='text-center' id='bannerbtn' className='btn btn-danger'>More Events</Link>
                        </p>
                    </Col>
                    <Col md={4}><hr style={{ borderTop: '1px solid #848484' }}></hr></Col>
                </Row>
            </Container>
        </div>
    )
}

