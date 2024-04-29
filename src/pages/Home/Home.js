// VideoBackground.js
import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Col, Row, Card, ButtonToolbar, ButtonGroup, Image, Tab, Nav, InputGroup, Form, Button, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideoCamera, faShareNodes, faDownload, faFileAudio, faUser, faLocation, faClock, faPerson, faArrowLeft, faAngleRight, faMousePointer } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faFacebook, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { Link } from 'react-router-dom';
import { SearchFormGroup } from '../../components/Forms/SearchFormGroup';
import { Departments } from '../../components/Departments';
import { Event } from '../../components/Event';
import { EventCountDownTimer } from '../../components/EventCountDownTimer';
import { SocialMedia } from '../../components/SocialMedia';
import { NavLink } from 'react-bootstrap';
import { TypeAnimation } from 'react-type-animation';
import axios  from 'axios';
import { serverurl } from '../../providers/ServerUrl';
import { CDBAnimation, CDBContainer } from 'cdbreact';
import { ReactTyped  } from "react-typed";
//import { Podcasts } from '../../components/Podcasts';
import Modal from 'react-bootstrap/Modal';
import { VideoModal2 } from '../../components/VideoModal2';
import { Fade, Bounce, Slide, Jump, Roll, Flip, Rotate, Flash, Jello,Pulse, RubberBand, Shake, Swing, Tada, Wobble, HeadShake, Pop, Spin, LightSpeed } from "react-swift-reveal";
import { RWebShare } from "react-web-share";


import './Home.css'

export const Home = () => {


    /*********************************************************
     POST THE FORM DATA TO THE API AND GET THE SEARHC RESULT
  **********************************************************/

     const [sermonsearch, setQuickSearch] = useState([]);
     const [sermondate, setSermonDate] = useState([]);
     const [sermontitle, setTopic] = useState([]);
     const [sermonpreacher, setPreacher] = useState([]);
   
     const [getsermontitle, getTopic] = useState([]);
     const [getsermonpreacher, getPreacher] = useState([]);
   
     const [sermon, getSermonSearch] = useState([]);
   
     const [sermonsearchres, getSermonSearchRes] = useState([]);
   
     const [sermon2, getSermonSearch2] = useState([]);
   
     const [sermonsearchres2, getSermonSearchRes2] = useState([]);
   
     const [buttontext, setButtonText] = useState('Search');
     const [message, setMessageText] = useState();
     const [successmessage, setSuccessMessage] = useState();
     const [errormessage, setErrorMessage] = useState();
   
     const [buttontext2, setButtonText2] = useState('Search');
     const [message2, setMessageText2] = useState();
     const [successmessage2, setSuccessMessage2] = useState();
     const [errormessage2, setErrorMessage2] = useState();
   
   
   
     const getQuickSearch = async () => {
       setButtonText2("Processing");
       if (sermonsearch === "") {
         setMessageText2("error");
         setErrorMessage2("All Fields are Required");
         setButtonText2("Search");
       } else {
         try {
   
           const items = { sermonsearch };
           //console.warn(items);
           const result = await axios.post(serverurl + "/api/sermonquicksearch", items);
   
           if (result.data.sermonsearchdata['sermonsearch_result'] === "Not Found") {
             setMessageText2("error");
             //setErrorMessage2("No Result Found");
             setErrorMessage("");
           } else {
             setMessageText2("success");
             setMessageText("");
             
             //setSuccessMessage2("Result Found");
             setSuccessMessage("");
             getSermonSearch2(result.data.sermonsearchdata);
   
             getSermonSearchRes2(result.data.sermonsearchdata['searchresult']);
             console.log(result.data);
             //setSuccessMessage("success");
           }
   
           setButtonText2("Search");
   
   
         } catch (error) {
           setMessageText2("error");
           setErrorMessage2("!!Sorry, Your Request Could Not Be Processed");
           setButtonText2("Search");
           console.log(error);
         }
       }
     };
   
     const getDeepSearch = async () => {
       setButtonText("Processing");
       if (sermondate === "" || sermontitle === "" || sermonpreacher === "") {
         setMessageText("error");
         setErrorMessage("All Fields are Required");
         setButtonText("Search");
       } else {
         try {
   
           const items = { sermondate, sermontitle, sermonpreacher };
           //console.warn(items);
           const result = await axios.post(serverurl + "/api/sermondeepsearch", items);
   
           if (result.status == 200 && result.data.sermonsearchdata['sermonsearch_result'] === "Not Found") {
             setMessageText("error");
             //setErrorMessage("No Result Found");
             setErrorMessage2("");
           } else if(result.status == 200 && result.data.sermonsearchdata['sermonsearch_result'] != "Not Found") {
             setMessageText("success");
             setMessageText2("");
             //setSuccessMessage("Result Found");
             setSuccessMessage2("");
   
             getSermonSearch(result.data.sermonsearchdata);
   
             getSermonSearchRes(result.data.sermonsearchdata['searchresult']);
             console.log(result);
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

  //const eventfileurls = serverurl + "/admin/img/events/";
  //const deptfileurls = serverurl + "/admin/img/departments/";
  //const bannervideofileurl = serverurl + "/storage/admin/videos/banners/";

  const [banner, setBanner] = useState([]);
  const [events, setEvents] = useState([]);
  const [depts, setDepts] = useState([]);
  const [nextevent, setNextEvent] = useState([]);
  const [sermons, setSermons] = useState([]);

  const fetchBannerData = () => {
    return axios.get(serverurl + "/api/banner")
    .then((response) => setBanner(response.data['banners']));
    
  };

  const fetchEventsData = () => {
    return axios.get(serverurl+"/api/event")
        .then((response) => setEvents(response.data['events']));
  };

  const fetchNextEventData = () => {
    return axios.get(serverurl + "/api/nextevent")
        .then((response) => setNextEvent(response.data['event']));
  };

  const fetchDeptsData = () => {
    return axios.get(serverurl+"/api/department")
        .then((response) => setDepts(response.data['departments']));
  };

  const fetchSermonsData = () => {
    return axios.get(serverurl+"/api/sermon")
        .then((response) => setSermons(response.data['sermons']));
  };

  const fetchSermonTitleData = () => {
    return axios.get(serverurl + "/api/sermontitle")
      .then((response) => getTopic(response.data['sermontitles']));
  };

  const fetchSermonPreacherData = () => {
    return axios.get(serverurl + "/api/sermonpreacher")
      .then((response) => getPreacher(response.data['sermonpreachers']));
  };


  useEffect(() => {
    fetchBannerData()
    fetchEventsData();
    fetchNextEventData();
    fetchDeptsData();
    fetchSermonsData();
    fetchSermonTitleData();
    fetchSermonPreacherData();
 },[])



  const navigate = useNavigate();
  const goToAbout = () => {
    navigate('/about');
  }

  /**********************************************
   GET THE PODCAST FROM THE API
  **********************************************/

    /*const [podcasts, setPodcast] = useState([]);


    const fetchPodcastData = () => {
        return axios.get(serverurl + "/api/podcast")
            .then((response) => setPodcast(response.data['podcasts']));
    };

    useEffect(() => {
        fetchPodcastData();
    }, [])*/


    // Loading the Video Modal
      
   const [show, setShow] = useState(false);

   const [videotitle, setVideoTitle] = useState();
   const [videoid, setVideoID] = useState();

   const handleClose = () => setShow(false);
   
   const values = [true, "sm-down", "md-down", "lg-down", "xl-down", "xxl-down"];
   const [fullscreen, setFullscreen] = useState(true);


   const loadVideo = (videotitle,videoid,breakpoint) => {
       //title = inputRef.current.value;
       setVideoTitle(videotitle);
       setVideoID(videoid);
       setFullscreen(breakpoint);
       setShow(true);
   }

  return (
    <div>
        <VideoModal2 show={show} videoid={videoid} handleClose={handleClose} />

      {/* Banner */}
      <div expand="lg">
        {/* ***** Main Banner Area Start ***** */}
        <section className="section main-banner" id="top" data-section="section1" expand="lg">
          {
            banner && banner.length > 0 && banner.map((bannerData) => {
              return <>
              {/*<video autoPlay muted loop id="bg-video">
                <source src={bannerData.banner_file} type="video/mp4" />
                </video>
              */}
              <div>
              <Image src="images/banner.jpg" thumbnail fluid id="bg-video" />
              </div>
              </>
            })
          }

          <div className="video-overlay header-text">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="caption">
                    <h2>
                      <ReactTyped strings={["WELCOME TO KCCC"]} typeSpeed={300} loop />
                    </h2>
                    <h6>KINGDOM CONNECTION CHRISTIAN CENTER</h6>
                    <p>The Wealthy Place Where Champions Are Raised! Kingdom Connection Christian Center is a Word Of Faith, non-denominational, full gospel church</p>
                    <div className="main-button-red">
                      <div className="scroll-to-section">
                        <p>

                          <ButtonGroup className="me-2" aria-label="First group">
                            <Link to="/about" reloadDocument className='btn btn-danger' id="bannerbtn">Welcome Message</Link>
                          </ButtonGroup>
                          <ButtonGroup className="me-2" aria-label="Second group">
                            <Link to="/livestream" reloadDocument className='btn btn-danger' id="bannerbtn">Join Us Live</Link>
                          </ButtonGroup>

                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* ***** Main Banner Area End ***** */}

      </div>



      {/*  About  */}
      <div id="sectionmargin" className='homeabout'>
      <Fade delay={300} duration={2000}>
        <Container>
          <Row>
            <Col md={5}>
            
              <Image src="images/about.png" thumbnail fluid id="homeaboutimg" />

            </Col>
            <Col md={7}>
              <Row>
              <div style={{ marginTop: '20px' }}></div>
                <Col sm={12}>
                  <h5 id="bluecolor" className='aboutkccc'>About KCCC</h5>
                  <h6>The Wealthy Place Where Champions Are Raised</h6>
                  <p>
                    Kingdom Connection Christian Center is a Word of Faith, non-denominational, full gospel church.
                  </p>
                </Col>
              </Row>
              <Row>
                <div style={{ marginTop: '20px' }}></div>
                <Col sm={6}>
                  <h5 id="bluecolor">Our Vision</h5>
                  <p>
                     We believe the Bible, the complete writings of both the Old and New Testaments is the literal Word of God, verbally inspired by the Holy Spirit, inerrant as originally given by God, and infallible as the standard of our faith and practice...
                  </p>
                </Col>
                <Col sm={6}>
                  <div id="homeourmission">
                  <h5 id="bluecolor">Our Mission</h5>
                  <p>
                  Our mission is reaching and harvesting lost souls for Christ and teaching the Body of Christ how to effectively apply God’s principles to have victory in every area of life. Kingdom Connection Christian Center is a church committed to raising champions in the body of Christ.
                  </p>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col sm={12}>
                  <Link to='/about' reloadDocument className='btn btn-danger' id='btn'>Read More</Link>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
        </Fade>
      </div>

      {/*  Watch and Listen */}
      <div id="sectionmargin">
      <Fade delay={300} duration={2000}>
        <Container>
          <Row>
            <Col sm={4}><hr style={{ borderTop: '1px solid #848484' }}></hr></Col>
            <Col sm={4}>
              <h4 id="bluecolor" className='text-center'>Watch & Listen</h4>
            </Col>
            <Col sm={4}><hr style={{ borderTop: '1px solid #848484' }}></hr></Col>
            <br></br><br></br><br></br>

            <Col sm={12}>
              <Tab.Container id="mytabs" defaultActiveKey="sermon" className="mytabs">
                <Nav fill variant="tabs">
                  <Nav.Item className='tabitems'>
                    <Nav.Link eventKey="sermon" className='tablink' style={{ color: '#fff' }}>SERMONS</Nav.Link>
                  </Nav.Item>
                  <Nav.Item className='tabitems'>
                    <Nav.Link eventKey="podcast" className='tablink' style={{ color: '#fff' }}>PODCASTS</Nav.Link>
                  </Nav.Item>
                  <Nav.Item className='tabitems' style={{ display:'none' }}>
                    <Nav.Link eventKey="archived" className='tablink' style={{ color: '#fff' }}>ARCHIVED MESSAGES</Nav.Link>
                  </Nav.Item>
                </Nav>
                <Tab.Content style={{ marginTop: '20px' }}>
                  <Tab.Pane eventKey="sermon">

                  <SearchFormGroup quicksearch={sermonsearch} sermondate={sermondate} topic={sermontitle} preacher={sermonpreacher} setQuickSearch={setQuickSearch} setSermonDate={setSermonDate} setTopic={setTopic} setPreacher={setPreacher} buttontext={buttontext} getDeepSearch={getDeepSearch} message={message} errormessage={errormessage} successmessage={successmessage} getsermontitle={getsermontitle} getsermonpreacher={getsermonpreacher} getQuickSearch={getQuickSearch} buttontext2={buttontext2} message2={message2} errormessage2={errormessage2} successmessage2={successmessage2} />

                                     {

                    message != "success" && message2 != "success" ?

                      <Container>

                        {

                          sermons && sermons.length > 0 && sermons.map((sermonData) => {
                            return <Row>
                              <div
                                style={{ borderRadius: '0px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)', padding: '20px' }}>
                                <Row>
                                  <Col md={4}>
                                    <div className=''>
                                      <iframe style={{ width: '100%', height: '150px', margin: 'auto' }}
                                        src={sermonData.sermons_file}
                                        frameborder="0"
                                        allow="accelerometer; 
                                autoplay; 
                                clipboard-write; 
                                encrypted-media; 
                                gyroscope; 
                                picture-in-picture; 
                                web-share" allowfullscreen>
                                      </iframe>
                                    </div>
                                  </Col>
                                  <Col md={4}>
                                    <div className='valign'>
                                      <div>
                                        <h6 id="bluecolor" className="text-center">{sermonData.sermons_title}</h6>
                                        <p id="bluecolor" className="text-center" style={{ fontSize: '13px' }}>
                                          <FontAwesomeIcon icon={faUser} />
                                          &nbsp;<span style={{ color: '#000', fontWeight: '600' }}>{sermonData.sermons_preacher}</span> &nbsp;


                                          <FontAwesomeIcon icon={faClock} />
                                          &nbsp;<span style={{ color: '#000', fontWeight: '600' }}>{sermonData.sermons_date}</span> &nbsp;

                                          <br></br>
                                          <FontAwesomeIcon icon={faLocation} />
                                          &nbsp;<span style={{ color: '#000', fontWeight: '600' }}>{sermonData.sermons_location}</span>

                                        </p>
                                      </div>
                                    </div>
                                  </Col>
                                  <Col md={4}>
                                    <div className='valign'>
                                      <p>
                                        <ButtonGroup className="me-2" aria-label="First group">
                                        <Link to="#" className='btn btn-danger' id="vidbtn" onClick={() => {loadVideo(sermonData.sermons_title,sermonData.sermons_file,values)}}>
                                             <FontAwesomeIcon icon={faVideoCamera} />
                                          </Link>
                                        </ButtonGroup>
                                        {/*<ButtonGroup className="me-2" aria-label="Second group">
                                          <Link to="#" className='btn btn-danger' id="vidbtn">
                                            <FontAwesomeIcon icon={faFileAudio} />
                                          </Link>
                                        </ButtonGroup>
                                        <ButtonGroup className="me-2" aria-label="Second group">
                                          <Link to="#" className='btn btn-danger' id="vidbtn">
                                            <FontAwesomeIcon icon={faDownload} />
                                          </Link>
                                          </ButtonGroup>*/}
                                        <ButtonGroup className="me-2" aria-label="Second group">
                                        <RWebShare
                                              data={{
                                                  text: "Web Share",
                                                  url: sermonData.sermons_file,
                                                  title: sermonData.sermons_title,
                                              }}
                                              onClick={() =>
                                                  console.log("shared successfully!")
                                              }
                                         >
                                          <Link to="#" className='btn btn-danger' id="vidbtn">
                                            <FontAwesomeIcon icon={faShareNodes} />
                                          </Link>
                                        </RWebShare>
                                        </ButtonGroup>

                                      </p>
                                    </div>
                                  </Col>
                                </Row>
                              </div>
                            </Row>
                          })
                        }
                      </Container> :

                      <Container>

                        {
                          message === "success" && message2 === "" ?
                          sermon && sermon.length > 0 && sermon.map((sermonSearchDeepData) => {
                            return <Row>
                              {
                              sermonSearchDeepData.sermonsearch_result != "Not Found" ?
                              <div
                                style={{ borderRadius: '0px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)', padding: '20px' }}>
                                <Row>
                                  <Col md={4}>
                                    <div className=''>
                                      <iframe style={{ width: '100%', height: '150px', margin: 'auto' }}
                                        src={sermonSearchDeepData.sermons_file}
                                        frameborder="0"
                                        allow="accelerometer; 
                              autoplay; 
                              clipboard-write; 
                              encrypted-media; 
                              gyroscope; 
                              picture-in-picture; 
                              web-share" allowfullscreen>
                                      </iframe>
                                    </div>
                                  </Col>
                                  <Col md={4}>
                                    <div className='valign'>
                                      <div>
                                        <h6 id="bluecolor" className="text-center">{sermonSearchDeepData.sermons_title}</h6>
                                        <p id="bluecolor" className="text-center" style={{ fontSize: '13px' }}>
                                          <FontAwesomeIcon icon={faUser} />
                                          &nbsp;<span style={{ color: '#000', fontWeight: '600' }}>{sermonSearchDeepData.sermons_preacher}</span> &nbsp;


                                          <FontAwesomeIcon icon={faClock} />
                                          &nbsp;<span style={{ color: '#000', fontWeight: '600' }}>{sermonSearchDeepData.sermons_date}</span> &nbsp;

                                          <br></br>
                                          <FontAwesomeIcon icon={faLocation} />
                                          &nbsp;<span style={{ color: '#000', fontWeight: '600' }}>{sermonSearchDeepData.sermons_location}</span>

                                        </p>
                                      </div>
                                    </div>
                                  </Col>
                                  <Col md={4}>
                                    <div className='valign'>
                                      <p>
                                        <ButtonGroup className="me-2" aria-label="First group">
                                          <Link to="#" className='btn btn-danger' id="vidbtn" onClick={() => {loadVideo(sermonSearchDeepData.sermons_title,sermonSearchDeepData.sermons_id,values)}}>
                                            <FontAwesomeIcon icon={faVideoCamera} />
                                          </Link>
                                        </ButtonGroup>
                                        {/*<ButtonGroup className="me-2" aria-label="Second group">
                                          <Link to="#" className='btn btn-danger' id="vidbtn">
                                            <FontAwesomeIcon icon={faFileAudio} />
                                          </Link>
                                        </ButtonGroup>
                                        <ButtonGroup className="me-2" aria-label="Second group">
                                          <Link to="#" className='btn btn-danger' id="vidbtn">
                                            <FontAwesomeIcon icon={faDownload} />
                                          </Link>
                                        </ButtonGroup>
                                        */}
                                        <ButtonGroup className="me-2" aria-label="Second group">
                                        <RWebShare
                                              data={{
                                                  text: "Web Share",
                                                  url: sermonSearchDeepData.sermons_file,
                                                  title: sermonSearchDeepData.sermons_title,
                                              }}
                                              onClick={() =>
                                                  console.log("shared successfully!")
                                              }
                                         >
                                          <Link to="#" className='btn btn-danger' id="vidbtn">
                                            <FontAwesomeIcon icon={faShareNodes} />
                                          </Link>
                                        </RWebShare>
                                        </ButtonGroup>

                                      </p>
                                    </div>
                                  </Col>
                                </Row>
                                
                              </div> : <p className='text-center'>NO RESULT FOUND</p>
                               }
                            </Row>
                          }) : ''
                        }


                        {
                          message2 === "success" && message === "" ?
                          sermon2 && sermon2.length > 0 && sermon2.map((sermonSearchQuickData) => {
                            return <Row>
                               {
                              sermonSearchQuickData.sermonsearch_result != "Not Found" ?
                              <div
                                style={{ borderRadius: '0px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)', padding: '20px' }}>
                                <Row>
                                  <Col md={4}>
                                    <div className=''>
                                      <iframe style={{ width: '100%', height: '150px', margin: 'auto' }}
                                        src={sermonSearchQuickData.sermons_file}
                                        frameborder="0"
                                        allow="accelerometer; 
                                        autoplay; 
                                        clipboard-write; 
                                        encrypted-media; 
                                        gyroscope; 
                                        picture-in-picture; 
                                        web-share" allowfullscreen>
                                      </iframe>
                                    </div>
                                  </Col>
                                  <Col md={4}>
                                    <div className='valign'>
                                      <div>
                                        <h6 id="bluecolor" className="text-center">{sermonSearchQuickData.sermons_title}</h6>
                                        <p id="bluecolor" className="text-center" style={{ fontSize: '13px' }}>
                                          <FontAwesomeIcon icon={faUser} />
                                          &nbsp;<span style={{ color: '#000', fontWeight: '600' }}>{sermonSearchQuickData.sermons_preacher}</span> &nbsp;


                                          <FontAwesomeIcon icon={faClock} />
                                          &nbsp;<span style={{ color: '#000', fontWeight: '600' }}>{sermonSearchQuickData.sermons_date}</span> &nbsp;

                                          <br></br>
                                          <FontAwesomeIcon icon={faLocation} />
                                          &nbsp;<span style={{ color: '#000', fontWeight: '600' }}>{sermonSearchQuickData.sermons_location}</span>

                                        </p>
                                      </div>
                                    </div>
                                  </Col>
                                  <Col md={4}>
                                    <div className='valign'>
                                      <p>
                                        <ButtonGroup className="me-2" aria-label="First group">
                                          <Link to="#" className='btn btn-danger' id="vidbtn" onClick={() => {loadVideo(sermonSearchQuickData.sermons_title,sermonSearchQuickData.sermons_id,values)}}>
                                             <FontAwesomeIcon icon={faVideoCamera} />
                                          </Link>
                                        </ButtonGroup>
                                        {/*<ButtonGroup className="me-2" aria-label="Second group">
                                          <Link to="#" className='btn btn-danger' id="vidbtn">
                                            <FontAwesomeIcon icon={faFileAudio} />
                                          </Link>
                                        </ButtonGroup>
                                        <ButtonGroup className="me-2" aria-label="Second group">
                                          <Link to="#" className='btn btn-danger' id="vidbtn">
                                            <FontAwesomeIcon icon={faDownload} />
                                          </Link>
                                        </ButtonGroup>
                                        */}
                                        <ButtonGroup className="me-2" aria-label="Second group">
                                        <RWebShare
                                              data={{
                                                  text: "Web Share",
                                                  url: sermonSearchQuickData.sermons_file,
                                                  title: sermonSearchQuickData.sermons_title,
                                              }}
                                              onClick={() =>
                                                  console.log("shared successfully!")
                                              }
                                         >
                                          <Link to="#" className='btn btn-danger' id="vidbtn">
                                            <FontAwesomeIcon icon={faShareNodes} />
                                          </Link>
                                        </RWebShare>
                                        </ButtonGroup>

                                      </p>
                                    </div>
                                  </Col>
                                </Row>
                              </div> : <p className='text-center'>No Result Found</p>
                              }
                            </Row>
                          }) : ''
                        }
                      </Container>
                  }



                  </Tab.Pane>

                  <Tab.Pane eventKey="podcast">
                    {/*<Podcasts podcasts={podcasts}/>*/}
                  </Tab.Pane>
                  <Tab.Pane eventKey="archived">ARCHIVED MESSAGES</Tab.Pane>
                </Tab.Content>
              </Tab.Container>

              <br></br><br></br>
              <Row style={{ display:'' }}>
                <Col sm={4}><hr style={{ borderTop: '1px solid #848484' }}></hr></Col>
                <Col sm={4}>
                  <p className="text-center">
                    <Link to="/sermons" className='text-center btn btn-danger' id='bannerbtn' 
                    reloadDocument>More Sermons</Link>
                  </p>
                </Col>
                <Col sm={4}><hr style={{ borderTop: '1px solid #848484' }}></hr></Col>
              </Row>

            </Col>
          </Row>
        </Container>
        </Fade>
      </div>


      {/* Social Media */}
      <div>
      <Fade delay={300} duration={2000}>
        <SocialMedia />
      </Fade>
      </div>


      {/* Sharing Our Faith */}

      <div>
        <br></br><br></br>
        <Fade delay={300} duration={2000}>
        <Container style={{ backgroundColor: '#E1EDF3', padding: '50px' }}>
          <Row>
            <Col md={8}>
              <Row>
                <Col md={4}>
                  <div style={{ width:'130px',margin:'auto'}}>
                    <Image fluid src="images/sharingfaith.jpeg" roundedCircle style={{ width:'100%' }} />
                  </div>
                </Col>
                <Col md={8}>
                  <div id="faithid">
                    <h5 id="bluecolor">Sharing Our Faith</h5>
                    <p>
                    Each of you should give what you have decided  in
                    your heart to give, not reluctantly or under compulsion,
                    for God loves a cheerful giver, 2 Corinthians 9:17
                    </p>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col md={4}>
              <p style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                <div id="homegivebtnid">
                  <Link to="/give" className='btn btn-danger' id="homegivebtn" reloadDocument>
                    Give Now
                  </Link>
                </div>
              </p>
            </Col>
          </Row>
        </Container>
        </Fade>
      </div>
 


      {/* Department */}
      <div>
      <Fade delay={300} duration={2000}>
        <Departments depts={depts} />
      </Fade>
      </div>



      {/* Support Our Mission */}
      <div>
        <br></br><br></br>
        <Fade delay={300} duration={2000}>
        <Container>
          <div style={{ position: 'relative' }}>
            <Image fluid src="images/img3.jpg" alt="Card image" style={{ width: '100%', height: '270px' }} />
            <div id="overlay" style={{ position: 'absolute', width: '100%', height: '100%', top: '0', bottom: '0', right: '0', left: '0', backgroundColor: 'rgba(0,0,0,0.5)' }}>
              <div id="missionid" className='text-center'>
                <h4>Support Our Mission</h4>
                <p>
                  Support our mission, donate to spread the gospel of Christ in all over the word.
                </p>
                <p><Link to="/donation" className='btn text-white' id="homegivebtn" reloadDocument>Donate Now</Link></p>
              </div>
            </div>
          </div>
        </Container>
        </Fade>
      </div>



      {/* Event */}
      <div>
      <Fade delay={300} duration={2000}>
        <Event event = {events} />
      </Fade>
      </div>



      {/*   E-STORE   */}
      <div>
        <br></br><br></br>
        <Fade delay={300} duration={2000}>
        <Container style={{ backgroundColor: '#A7C8DD' }} id="storecontainer">
          <Row>
            <Col md={7}>
              <div id="homestoreid">
                <h5 id="bluecolor">Visit Our E-Store</h5>
                <p>
                  Explore our e-store for a soulful collection of faith-filled 
                  books authored by Bishop Israel Ade Ajala.
                </p>
                <Link to="#" className='btn btn-danger' id="homegivebtn">
                  Explore Now
                </Link>
              </div>
            </Col>
            <Col md={5}>
              <div style={{ display: 'flex', justifyContent: 'end', justifyItems: 'end' }}>
                <Image className='float-end' fluid src="images/estore.png" style={{ width: '100%', objectFit: 'cover',height:'250px' }} />
              </div>
            </Col>
          </Row>
        </Container>
        </Fade>
      </div>

      {/*  FOOD BANK  */}
      <div>
        <br></br><br></br>
        <Fade delay={300} duration={2000}>
        <Container style={{ backgroundColor: '#E1EDF3' }} id="storecontainer">
          <Row>
            <Col md={5}>
              <div style={{ display: 'flex', justifyContent: 'start', justifyItems: 'start' }}>
                <Image className='float-start' fluid src="images/foodbank.jpeg" style={{ width: '100%', objectFit: 'cover', height:'250px'}} />
              </div>
            </Col>
            <Col md={7}>
              <div id="foodbankid">
                <h5 id="bluecolor">KCCC FOOD BANK</h5>
                <p>
                 Our food bank welcomes everyone to partake in God's gracious gift to humanity. Join us every Thursday to experience the blessings.

                </p>
                <p className='text-right'>
                  <Link to="/foodbank" reloadDocument className='btn btn-danger' id="homegivebtn">
                    Learn More
                  </Link>
                </p>
              </div>
            </Col>
          </Row>
        </Container>
        </Fade>
      </div>


      {/*  APP DOWNLOAD    */}
      <div>
        <br></br><br></br>
        <Fade delay={300} duration={2000}>
        <Container style={{ backgroundColor: '#E1EDF3', padding: '50px' }}>
          <Row>
            <Col md={6}>
                <Jump delay={600} duration={2300}>
                <div id="appimg">
                  <Image fluid src="images/app.png" thumbnail style={{ width:'90%',backgroundColor:'transparent',border:'none' }} />
                </div>
                </Jump>
            </Col>
            <Col md={6}>
              <div id="downloaddiv">
              <h4 id="bluecolor" className='text-center'>DOWNLOAD THE <br></br> ADE AJALA MINISTRIES<br></br> MOBILE APP</h4>
            
                <div className='text-center'>
                  <ButtonGroup className="me-2" aria-label="First group">
                    <Link to="#" className='btn' id="downloadbtn">
                      <Image src="images/appstore.png" fluid width="286" height="130" />
                    </Link>
                    <Link to="#" className='btn' id="downloadbtn">
                      <Image src="images/playstore.png" fluid  width="286" height="130"/>
                    </Link>
                  </ButtonGroup>

                </div>
              </div>
              
            </Col>
          </Row>
        </Container>
        </Fade>
      </div>


    </div>
  );
};
