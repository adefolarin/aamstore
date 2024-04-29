import React from 'react'
import { Container, Col, Row, Card, ButtonToolbar, ButtonGroup, Image, Tab, Nav, InputGroup, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideoCamera, faShareNodes, faDownload, faFileAudio, faUser, faLocation, faClock, faPerson, faArrowLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faFacebook, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { Link } from 'react-router-dom';
import Slider from 'react-slick';

export const Departments = ({ depts }) => {
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
            <div>
                <br></br><br></br>
                <Container>
                    <Row>
                        <Col sm={4}><hr style={{ borderTop: '1px solid #848484' }}></hr></Col>
                        <Col sm={4}>
                            <h4 id="bluecolor" class='text-center'>Our Departments</h4>
                        </Col>
                        <Col sm={4}><hr style={{ borderTop: '1px solid #848484' }}></hr></Col>

                        <Col md={12}>
                            <div>
                                <br></br>
                                <Row>
                                <Slider {...settings}>
                                {
                                depts && depts.length > 0 && depts.map((deptData) => {
                                    return <>
                                    {deptData.departments_id !== '' ?
                                    <Col sm={12} md={12}>
                                        <Card id="deptcard" className="deptslide">
                                            <Card.Title>
                                                <div className='text-center' id="bluecolor">
                                                    <button className='btn' style={{ backgroundColor: '#135592', color: '#fff', borderRadius: '50%', marginTop: '10px', marginBottom: '10px' }}><FontAwesomeIcon icon={faPerson} /></button>
                                                    <h5>{ deptData.deptcategories_name }</h5>
                                                </div>
                                            </Card.Title>
                                            <Card.Body>
                                                <div className='text-center' style={{ marginTop: '-20px' }}>
                                                    <p>
                                                       { deptData.departments_content.substring(0,150) }
                                                    </p>
                                                    <Link to={"/dept-details?deptid=" + deptData.departments_id} style={{ textDecoration: 'none', color: 'red' }} reloadDocument>
                                                        Learn More <FontAwesomeIcon icon={faAngleRight} />
                                                    </Link>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </Col> :
                                    <Col md={12}>
                                    <Card id="deptcard">
                                        <Card.Body className='text-center'>
                                            <Card.Title>
                                                No Record Found
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
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    )
}
