import { React, useEffect, useState } from 'react'
import { Card, Image } from 'react-bootstrap';
import { Link, useLocation, useSearchParams, useNavigate } from 'react-router-dom';
import { Container, Col, Row, Button, ButtonGroup, ButtonToolbar, Table, Form } from 'react-bootstrap';
import axios from 'axios';
import { serverurl } from '../../providers/ServerUrl';
import '../EventDetail.css';
import Slider from 'react-slick';

export const Event = () => {

  
    /********************************************
              GET THE FILE URLS
    *********************************************/
    //const eventfileurl = serverurl + "/admin/img/events/";

    /**********************************************
       GET THE EVENT AND EVENT GALLERY FROM THE API
     **********************************************/

       const [events, setEvents] = useState([]);
     
   
       const fetchEventsData = () => {
         return axios.get(serverurl+"/api/eventall")
             .then((response) => setEvents(response.data['events']));
       };
     
       useEffect(() => {
          fetchEventsData();
       },[]);

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
                <div style={{ position: 'relative' }}>
                    <Image fluid src="images/img3.jpg" alt="Card image" id="bannerimg" />
                    <div id="banneroverlay">
                        <div id="bannerid" className='text-center'>
                            <p id="navhistory">
                                <Link to="/" id="homelink" reloadDocument>Home &nbsp; &#60; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Link>
                                <Link to="events" reloadDocument className='text-white' id="currentlink">Events</Link>
                            </p>
                            <h4>Events</h4>
                        </div>
                    </div>
                </div>
            </div>

            <br></br><br></br>
            <Container>
                <Row>
                    <br></br><br></br><br></br>
                    <Slider {...settings}>
                    {
                        events && events.length > 0 && events.map((eventData) => {
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
                                    <Col md={12} style={{display:'none'}}>
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


            </Container>

            <br></br><br></br>



        </div >
    )
}
