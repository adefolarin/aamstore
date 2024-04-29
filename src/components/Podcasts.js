import React from 'react'
import { Container, Col, Row, Button, ButtonGroup, ButtonToolbar, Table, Form } from 'react-bootstrap';
import { Card, Image } from 'react-bootstrap';
import { Link, useLocation, useSearchParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideoCamera, faShareNodes, faDownload, faFileAudio, faUser, faLocation, faClock, faPerson, faArrowLeft, faAngleRight, faShare } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faFacebook, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import '../pages/Podcast/Podcast.css';
import { RWebShare } from "react-web-share";

export const Podcasts = ({ podcasts }) => {
    return (
        <div>
            <Container>
                <Row>
                    <br></br><br></br><br></br>
                    {
                        podcasts && podcasts.length > 0 && podcasts.map((podcastsData) => {
                            return <>
                                {podcastsData.podcasts_title !== '' ?
                                    <Row style={{ margin: '0px', marginTop: '40px', backgroundColor: '#fff' }}>
                                        <div
                                            style={{ borderRadius: '0px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)', padding: '30px' }}>
                                            <Row>
                                                <Col md={2}>
                                                    <div id="podcastimgdiv">
                                                        <Image className='' src={podcastsData.podcasts_img} id="podcastimg" />
                                                    </div>

                                                </Col>
                                                <Col md={10}>
                                                    <div className='podcastalign'>
                                                        <div className='text-center'>
                                                            <h6 style={{ fontWeight: 'bold' }} className="text-center bluecolor">
                                                                {podcastsData.podcasts_title}
                                                            </h6>
                                                        </div>
                                                        <div className='text-center'>
                                                            <audio controls style={{ width: '100%', backgroundColor: '#135592', borderRadius: '20px' }}>
                                                                <source src={podcastsData.podcasts_file}
                                                                    type="audio/mpeg">
                                                                </source>

                                                            </audio>
                                                        </div>
                                                        <div>
                                                            <p className='text-center'>
                                                                <ButtonGroup className="me-2" aria-label="Second group" style={{ color: 'red' }}>
                                                                    <Link to={podcastsData.podcasts_file} className='' id="podcastbtn" download={podcastsData.podcasts_name}
                                                                        target="_blank"
                                                                        rel="noreferrer">
                                                                        <FontAwesomeIcon icon={faDownload} />

                                                                    </Link>
                                                                    &nbsp;
                                                                    Download
                                                                    &nbsp;&nbsp;&nbsp;
                                                                    &nbsp;&nbsp;&nbsp;
                                                                    &nbsp;&nbsp;&nbsp;
                                                                </ButtonGroup>
                                                                <ButtonGroup className="me-2" aria-label="Second group" style={{ color: 'red' }}>

                                                                    <RWebShare
                                                                        data={{
                                                                            text: "Web Share",
                                                                            url: podcastsData.podcasts_file,
                                                                            title: podcastsData.podcasts_name,
                                                                        }}
                                                                        onClick={() =>
                                                                            console.log("shared successfully!")
                                                                        }
                                                                    >
                                                                        <Link to="#" className=''>
                                                                            <FontAwesomeIcon icon={faShare} id="podcastbtn" />
                                                                        </Link>
                                                                        &nbsp;
                                                                        Share
                                                                    </RWebShare>

                                                                </ButtonGroup>

                                                            </p>
                                                        </div>
                                                    </div>
                                                </Col>

                                            </Row>

                                        </div>

                                    </Row> :

                                    <Row>
                                        <Col md={12}>
                                            <Card id="deptcard">
                                                <Card.Body className='text-center'>
                                                    <Card.Title>
                                                        No Podcast For Now
                                                    </Card.Title>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    </Row>
                                }
                            </>
                        })
                    }
                </Row>


            </Container>
        </div>
    )
}
