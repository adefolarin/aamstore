import React from 'react'
import { Container, Col, Row, Card, ButtonToolbar, ButtonGroup, Image, Tab, Nav, InputGroup, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideoCamera, faShareNodes, faDownload, faFileAudio, faUser, faLocation, faClock, faPerson, faArrowLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faFacebook, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { Link } from 'react-router-dom';

export const SocialMedia = () => {
    return (
        <div>
            <div>
                <br></br>
                <Container>
                    <Row>
                        <Col sm={4}><hr style={{ borderTop: '1px solid #848484' }}></hr></Col>
                        <Col sm={4}>
                            <h4 id="bluecolor" class='text-center socialheader'>JOIN US ON SOCIAL MEDIA</h4>
                        </Col>
                        <Col sm={4}><hr style={{ borderTop: '1px solid #848484' }}></hr></Col>

                        <Col sm={12}>
                            <div>
                                <br></br><br></br>
                                <p className='text-center'>
                                    <ButtonGroup className="me-2" aria-label="First group">
                                        <Link to="#" className='btn btn-danger' id="socialbtn">
                                            <FontAwesomeIcon icon={faFacebook} />
                                        </Link>
                                    </ButtonGroup>
                                    <ButtonGroup className="me-2" aria-label="Second group">
                                        <Link to="#" className='btn btn-danger' id="socialbtn">
                                            <FontAwesomeIcon icon={faInstagram} />
                                        </Link>

                                    </ButtonGroup>
                                    <ButtonGroup className="me-2" aria-label="Second group">
                                        <Link to="#" className='btn btn-danger' id="socialbtn">
                                            <FontAwesomeIcon icon={faTwitter} />
                                        </Link>
                                    </ButtonGroup>
                                    <ButtonGroup className="me-2" aria-label="Second group">
                                        <Link to="#" className='btn btn-danger' id="socialbtn">
                                            <FontAwesomeIcon icon={faYoutube} />
                                        </Link>
                                    </ButtonGroup>

                                </p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    )
}


