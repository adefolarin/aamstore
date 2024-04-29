import { React, useEffect, useState } from 'react'
import { Container, Col, Row, Card, ButtonToolbar, ButtonGroup, Image, Tab, Nav, InputGroup, Form, Button } from 'react-bootstrap';
import { Link, useLocation, useSearchParams, useNavigate } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideoCamera, faShareNodes, faDownload, faFileAudio, faUser, faLocation, faClock, faPerson, faArrowLeft, faAngleRight, faShare, faSearch } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faFacebook, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons'
import axios from 'axios';
import { serverurl } from '../../providers/ServerUrl';
import { SearchFormGroup } from '../../components/Forms/SearchFormGroup';



export const Review = () => {


    /********************************************
              GET THE FILE URLS
    *********************************************/

    const eventgalleryfileurls = serverurl + "/admin/img/eventgalleries/";

    /**********************************************
       GET THE SERMONS FROM THE API
     **********************************************/

    const [buttontext, setButtonText] = useState('Search');
    const [message, setMessageText] = useState();
    const [successmessage, setSuccessMessage] = useState();
    const [errormessage, setErrorMessage] = useState();

    const [eventdate, setEventDate] = useState();
    const [eventcategoryname, setEventCategoryName] = useState();
    const [eventlocation, setEventLocation] = useState();
    const [eventpreacher, setEventPreacher] = useState();

    const [getevent, setGetEvent] = useState([]);
    const [getsermon, setGetSermon] = useState([]);
    const [getgallery, setGetGallery] = useState([]);

    const [getsearchresult, setGetSearchResult] = useState([]);


    const [geteventcat, setEventCat] = useState([]);

    const [geteventloc, setEventLoc] = useState([]);

    const [geteventpreacher, setEventPreach] = useState([]);




    const fetchEventCatData = () => {
        return axios.get(serverurl + "/api/eventcat")
            .then((response) => setEventCat(response.data['eventcategories']));
    };

    const fetchEventLocData = () => {
        return axios.get(serverurl + "/api/eventlocation")
            .then((response) => setEventLoc(response.data['eventvenues']));
    };

    const fetchEventPreacherData = () => {
        return axios.get(serverurl + "/api/eventpreacher")
            .then((response) => setEventPreach(response.data['eventpreachers']));
    };

    useEffect(() => {
        fetchEventCatData();
        fetchEventLocData();
        fetchEventPreacherData();
    }, [])


    const getReview = async () => {
        setButtonText("Processing");
        if (eventdate === "" || eventcategoryname === "" || eventlocation === "" || eventpreacher === "") {
            setMessageText("error");
            setErrorMessage("All Fields are Required");
            setButtonText("Search");
        } else {
            try {

                const items = { eventdate, eventcategoryname, eventlocation, eventpreacher };
                //console.warn(items);
                const result = await axios.post(serverurl + "/api/reviewsearch", items);

                if (result.data.eventsearch['eventsearch_result'] === "Not Found" && result.data.sermonsearch['sermonsearch_result'] === "Not Found" && result.data.eventgallerysearch['gallerysearch_result'] === "Not Found") {
                    setMessageText("error");
                    setErrorMessage("No Result Found");
                } else {
                    setMessageText("success");
                    setSuccessMessage("Result Found");
                    setGetEvent(result.data.eventsearch);
                    setGetSermon(result.data.sermonsearch);
                    setGetGallery(result.data.eventgallerysearch);

                    setGetSearchResult(result.data.eventsearch['searchresult']);
                    //console.log(result.data);
                    //setSuccessMessage("success");
                }

                setButtonText("Search");


            } catch (error) {
                setMessageText("error");
                setErrorMessage("!!Sorry, Your Request Could Not Be Processed");
                setButtonText("Search");
                console.log(error);
            }
        }
    };

    //const getSearchReview = () => {
    // setGetReview();
    //}



    return (
        <div>

            <div>
                <br></br><br></br>
                <div style={{ position: 'relative' }}>
                    <Image fluid src="images/img3.jpg" alt="Card image" id="bannerimg" />
                    <div id="banneroverlay">
                        <div id="bannerid" className='text-center'>
                            <p id="navhistory">
                                <Link to="#" id="homelink">Home &nbsp; &#60; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Link>
                                <Link to="#" className='text-white' id="currentlink">Year In Review</Link>
                            </p>
                            <h4>Year In Review</h4>
                        </div>
                    </div>
                </div>
            </div>
            <br></br><br></br>
            <div style={{ display: 'none' }}>
                <Container>
                    <Row>
                        <Col md={12}>
                            <Card id="deptcard" className="eventdetailimg">
                                <Card.Img id="" variant="top" src="images/reviewbanner.png" thumbnail />
                            </Card>
                        </Col>
                    </Row>


                    <br></br><br></br>
                    <Row>

                    </Row>
                </Container>
            </div>

            <br></br><br></br>
            <Container>
                <Row>
                    <Col sm={4}><hr style={{ borderTop: '1px solid #848484' }}></hr></Col>
                    <Col sm={4}>
                        <h4 id="bluecolor" class='text-center'>Year In Review</h4>
                    </Col>
                    <Col sm={4}><hr style={{ borderTop: '1px solid #848484' }}></hr></Col>
                    <br></br><br></br><br></br>

                    <Col sm={12}>

                        <div>
                            <p>
                                <InputGroup size='lg' style={{ display: 'none' }}>
                                    <Form.Control
                                        placeholder=""
                                        aria-label=""
                                        style={{ borderRadius: '0', fontSize: '14px', backgroundColor: '#d8d8d8' }} />
                                    <Button class="btn btn-danger" style={{ backgroundColor: '#135592', color: '#fff', borderRadius: '0', border: 'none' }}>
                                        <FontAwesomeIcon icon={faSearch} />
                                    </Button>
                                </InputGroup>
                            </p>

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

                            <p style={{ backgroundColor: '#d8d8d8', padding: '10px' }}>
                                <InputGroup size="md">
                                    <Form.Control type="date" placeholder="Date" value={eventdate}
                                        onChange={(e) => setEventDate(e.target.value)} />
                                    <Form.Select aria-label="" value={eventcategoryname} onChange={(e) => setEventCategoryName(e.target.value)}>
                                        <option>Activity</option>
                                        {
                                         geteventcat.length > 0 && geteventcat.map((getCatData, index) => {
                                        return<>
                                       <option value={getCatData.eventcategories_name}>{getCatData.eventcategories_name}</option>
                                        </>
                                         })
                                        }
                                    </Form.Select>
                                    <Form.Select aria-label="" value={eventlocation}
                                        onChange={(e) => setEventLocation(e.target.value)}>
                                        <option>Location</option>
                                        {
                                         geteventloc.length > 0 && geteventloc.map((getLocData, index) => {
                                        return<>
                                       <option value={getLocData.events_venue}>{getLocData.events_venue}</option>
                                        </>
                                         })
                                        }
                                    </Form.Select>
                                    <Form.Select aria-label="" value={eventpreacher}
                                        onChange={(e) => setEventPreacher(e.target.value)}>
                                        <option>Preacher</option>
                                        {
                                         geteventpreacher.length > 0 && geteventpreacher.map((getPreachData, index) => {
                                        return<>
                                       <option value={getPreachData.events_preacher}>{getPreachData.events_preacher}</option>
                                        </>
                                         })
                                        }
                                    </Form.Select>

                                    {
                                        buttontext === "Processing" ?
                                            <Button class="btn btn-danger" style={{ backgroundColor: '#135592', color: '#fff', borderRadius: '0', border: 'none' }} onClick={getReview}>
                                                {buttontext}
                                            </Button> : ''
                                    }

                                    {
                                        buttontext === "Search" ?
                                            <Button class="btn btn-danger" style={{ backgroundColor: '#135592', color: '#fff', borderRadius: '0', border: 'none' }} onClick={getReview}>
                                                {buttontext}
                                            </Button> : ''
                                    }



                                </InputGroup>
                            </p>
                        </div>

                    </Col>
                </Row>
            </Container>

            <br></br><br></br>
            <Container>
                <Card id="deptcard">
                    <Card.Header style={{ backgroundColor: '#135592', color: '#fff', fontSize: '20px', textAlign: 'center', display: 'none' }}>
                    </Card.Header>
                    <Card.Body>
                        <Table striped bordered hover size="xs" className='text-center table-responsive' 
                      >
                            <thead style={{ backgroundColor:'#135592' }}>
                                <tr>
                                    <th>Date</th>
                                    <th>Activities</th>
                                    <th>Location</th>
                                    <th>Preacher</th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    getevent.length > 0 && getevent.map((getData, index) => {
                                        return <>
                                            <tr>
                                                <td>{getData.events_date}</td>
                                                <td>{getData.events_title}</td>
                                                <td>{getData.events_venue}</td>
                                                <td>{getData.events_preacher}</td>
                                            </tr>
                                        </>
                                    })
                                }

                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </Container>

            <br></br><br></br>
            <Container>

                {

                    getsermon && getsermon.length > 0 && getsermon.map((sermonData) => {
                        return <>
                             <div
                                style={{ borderRadius: '20px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)', padding: '20px', backgroundColor:'#135592',color:'#fff',padding:'50px' }}>
                                <Row>
                                    <Col md={6}>
                                        <div className=''>
                                            <div>
                                                <p style={{ textDecoration:'underline' }}>SERMON TITLE</p>
                                                <h4 className="" style={{ textTransform:'uppercase' }}>
                                                    {sermonData.sermons_title}
                                                </h4>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col md={6}>
                                        <div className=''>
                                            <p>
                                                <ButtonGroup className="me-2" aria-label="First group">
                                                    <Link to={sermonData.sermons_file} className='btn btn-danger' id="vidbtn" reloadDocument target='_blank'>
                                                        <FontAwesomeIcon icon={faVideoCamera} />
                                                    </Link>
                                                </ButtonGroup>
                                                <br></br><br></br>
                                                <p>Watch On Youtube</p>
                                            </p>
                                        </div>
                                    </Col>
                                </Row>
                               
                            </div> 
                            <br></br>
                            </>          
                    })

                
                }
            </Container>


            <br></br><br></br>
            <Container>
                <Row>
                    <Col sm={4}><hr style={{ borderTop: '1px solid #848484' }}></hr></Col>
                    <Col sm={4}>
                        <h4 id="bluecolor" class='text-center'>Gallery</h4>
                    </Col>
                    <Col sm={4}><hr style={{ borderTop: '1px solid #848484' }}></hr></Col>
                    <br></br><br></br><br></br>
                    <Col md={12}>
                        <div id="eventgallery">
                            <Row>
                                {

                                    getgallery.length > 0 && getgallery.map((getGalleryData, index) => {
                                        return <>
                                            {eventdate !== null ?
                                                <Col md={3}>

                                                    <Card id="deptcard" className="eventgallerylimg">

                                                        <Card.Img id="eventgalleryimg" variant="top" src={eventgalleryfileurls + getGalleryData.eventgalleries_file} thumbnail />

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
                </Row>
            </Container>

            <br></br><br></br>



        </div >
    )
}
