import { React, useEffect, useState } from 'react'
import { Card, Image } from 'react-bootstrap';
import { Link, useLocation, useSearchParams, useNavigate } from 'react-router-dom';
import { Container, Col, Row, Button, ButtonGroup, ButtonToolbar, Table, Form } from 'react-bootstrap';
import axios from 'axios';
import copy from "copy-to-clipboard";
import { serverurl, clienturl } from '../providers/ServerUrl';
import './EventDetail.css';

export const EventDetails = () => {

    /********************************************
             GET THE QUERY PARAMS   
    *********************************************/
    const search = useLocation().search;
    const eventid = new URLSearchParams(search).get('eventid');

    /********************************************
              GET THE FILE URLS
    *********************************************/
    //const eventfileurls = serverurl + "/admin/img/events/";
    //const eventgalleryfileurls = serverurl + "/admin/img/eventgalleries/";

    /**********************************************
       GET THE EVENT AND EVENT GALLERY FROM THE API
     **********************************************/
    const [eventdetail, setEventDetail] = useState([]);

    const [eventgallery, setEventGallery] = useState([]);

    const fetchEventDetailData = () => {
        return axios.get(serverurl + "/api/event/" + eventid)
            .then((response) => setEventDetail(response.data['eventone']));
    };

    const fetchEventGalleryData = () => {
        return axios.get(serverurl + "/api/event/" + eventid)
            .then((response) => setEventGallery(response.data['eventgallery']));
    };

    useEffect(() => {
        fetchEventDetailData();
        fetchEventGalleryData();
    }, [])


    /**********************************************
       POST EVENT REG FORM DATA TO THE API
     **********************************************/

    const [buttontext, setButtonText] = useState('Register');
    const [message, setMessageText] = useState();
    const [successmessage, setSuccessMessage] = useState();
    const [errormessage, setErrorMessage] = useState();

    const eventregs_event = eventdetail.events_id;
    const [eventregs_name, setEventRegsName] = useState();
    const [eventregs_email, setEventRegsEmail] = useState();
    const [eventregs_pnum, setEventRegsPnum] = useState();

    const navigate = useNavigate();

    const Save = async () => {
        setButtonText("Processing");
        if(eventregs_name === "" || eventregs_email === "") {
            setMessageText("error");
            setErrorMessage("All Fields are Required");
            setButtonText("Register");
        } else {
        try {
                      
            const items = { eventregs_event, eventregs_name, eventregs_email, eventregs_pnum };
            //console.warn(items);
            const result = await axios.post(serverurl + "/api/eventreg", items);
            setMessageText("success");
            setSuccessMessage(result.data.message);
            setButtonText("Register");
            console.warn(result);
        
        } catch (error) {
            setMessageText("error");
            setErrorMessage("!!Sorry, Your Registration Could Not Be Processed");
            setButtonText("Register");
            console.log(error);
        }
      }
    };


    // COPY LINK TO CLIPBOARD
    const [copyText, setCopyText] = useState("");
    const [buttoncopytext, setButtonCopyText] = useState("");

    /*const Clipboard = () => {
     
        setCopyText(clienturl + "/event-details/" + eventid);
     
         copy(copyText);
         setButtonCopyText("Copied")
   }*/

   const Clipboard = async () => {
    try {
        await navigator.clipboard.writeText(clienturl + "/event-details/" + eventid);
        setButtonCopyText("Link copied to clipboard!");
    } catch (err) {
        setButtonCopyText("Unable to copy link to clipboard");
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
                                <Link to="/" reloadDocument id="homelink">Home &nbsp; &#60; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Link>
                                <Link to="/event-details" reloadDocument className='text-white' id="currentlink">Event Details</Link>
                            </p>
                            <h4>Event Details</h4>

                        </div>
                    </div>
                </div>
            </div>

            <br></br><br></br>
            <div>
                <Container>
                    <Row>
                        <Col md={12}>
                            <Card id="deptcard" className="eventdetailimg">
                                <Card.Img id="eventimg" variant="top" src={eventdetail.events_file} thumbnail />
                            </Card>
                        </Col>
                    </Row>


                    <br></br><br></br>
                    <Row>

                    </Row>
                </Container>
            </div>

            <br></br>
            <div>
                <Container>
                    <Row>
                        <Col md={12}>
                            <div id="eventdesc">
                                <h4 id="bluecolor">Event Description</h4>
                                <p>
                                    {eventdetail.events_desc}
                                </p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>

            <br></br>
            <div>
                <Container>
                    <Row>
                        <Col md={6}>
                            <div id="eventgallery">
                                <h4 id="bluecolor" className='eventgallerycaption'>Event Gallery</h4>
                                <p id="eventgallerytext">
                                    Explore the gallery from previous events
                                </p>
                                <Row>
                                    {

                                        eventgallery.length > 0 && eventgallery.map((eventGalleryData, index) => {
                                            return <>
                                                {eventGalleryData.eventgalleries_file !== '' ?
                                                    <Col md={6}>

                                                        <Card id="deptcard" className="eventgallerylimg">

                                                            <Card.Img id="eventgalleryimg" variant="top" src={eventGalleryData.eventgalleries_file} thumbnail />

                                                        </Card>
                                                    </Col> :

                                                    <Col md={12}>
                                                        <p id="eventgallerytext">{'No Gallery To Show'}</p>
                                                    </Col>
                                                }
                                            </>
                                        })

                                    }
                                </Row>

                            </div>
                        </Col>

                        <Col md={6}>
                            <div>
                                <Card id="deptcard">
                                    <Card.Header style={{ backgroundColor: '#135592', color: '#fff', fontSize: '20px', textAlign: 'center' }}>
                                        Event Details
                                    </Card.Header>
                                    <Card.Body>
                                        <Table striped bordered hover size="xs">
                                            <tbody>
                                                <tr>
                                                    <th>Start Date</th><td>{eventdetail.events_startfulldate}</td>
                                                </tr>
                                                <tr>
                                                    <th>End Date</th><td>{eventdetail.events_endfulldate}</td>
                                                </tr>
                                                <tr>
                                                    <th>Time</th><td>{eventdetail.events_starttime}</td>
                                                </tr>
                                                <tr>
                                                    <th>Organizer</th><td>{eventdetail.events_organizer}</td>
                                                </tr>
                                                <tr>
                                                    <th>Venue</th><td>{eventdetail.events_venue}</td>
                                                </tr>
                                                <tr>
                                                    <th>Address</th><td>{eventdetail.events_address}</td>
                                                </tr>
                                                <tr>
                                                    <th>Contact</th><td>+019450000</td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </Card.Body>
                                </Card>

                                <Card id="deptcard">
                                    <Card.Header style={{ backgroundColor: '#135592', color: '#fff', fontSize: '20px', textAlign: 'center' }}>
                                        Event Registration
                                    </Card.Header>
                                    <Card.Body>
                                        <Form>

                                            <Form.Group className="mb-3" controlId="">
                                                <Form.Control type="text" size="lg" placeholder="Full Name" style={{ fontSize: '16px', padding: '15px' }}
                                                    value={eventregs_name} onChange={(e) => setEventRegsName(e.target.value)} />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="">
                                                <Form.Control type="text" size="lg" placeholder="Email" style={{ fontSize: '16px', padding: '15px' }}
                                                    value={eventregs_email} onChange={(e) => setEventRegsEmail(e.target.value)} />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="">
                                                <Form.Control type="text" size="lg" placeholder="Pnone Number" style={{ fontSize: '16px', padding: '15px' }}
                                                    value={eventregs_pnum} onChange={(e) => setEventRegsPnum(e.target.value)} />
                                            </Form.Group>
                                        </Form>
                                        <div>
                                            {
                                            message === 'success' ?
                                            <div className='alert alert-success alert-sm'>
                                                {successmessage}
                                            </div>:
                                            ''
                                            }

                                           {
                                            message === 'error' ?
                                            <div className='alert alert-danger alert-sm'>
                                                {errormessage}
                                            </div>:
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
                                                </Button>:
                                                ''
                                                }

                                                {
                                                buttontext === "Register" ?
                                                <Button class="btn btn-danger" style={{ backgroundColor: 'red', color: '#fff', borderRadius: '0', border: 'none', fontWeight: 'bold' }} onClick={Save}>
                                                    {buttontext}
                                                </Button>:
                                                ''
                                                }
                                            </ButtonGroup>
                                            <ButtonGroup className="me-2" aria-label="First group">
                                                <Button class="btn btn-danger" style={{ backgroundColor: '#135592', color: '#fff', borderRadius: '0', border: 'none', fontWeight: 'bold' }}onClick={Clipboard}>
                                                    Copy Link
                                                </Button>
                                            </ButtonGroup>
                                    
                                        </ButtonToolbar>
                                        <p className='text-center'>
                                          {buttoncopytext}
                                        </p>
                                    </Card.Body>
                                </Card>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>

            <br></br><br></br>

        </div >
    )
}
