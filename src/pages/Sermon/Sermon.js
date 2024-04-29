import { React, useEffect, useState } from 'react'
import { Container, Col, Row, Card, ButtonToolbar, ButtonGroup, Image, Tab, Nav, InputGroup, Form, Button } from 'react-bootstrap';
import { Link, useLocation, useSearchParams, useNavigate } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideoCamera, faShareNodes, faDownload, faFileAudio, faUser, faLocation, faClock, faPerson, faArrowLeft, faAngleRight, faShare } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faFacebook, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons'
import axios from 'axios';
import { serverurl } from '../../providers/ServerUrl';
import { SearchFormGroup } from '../../components/Forms/SearchFormGroup';
import Modal from 'react-bootstrap/Modal';
import { VideoModal2 } from '../../components/VideoModal2';
import { RWebShare } from "react-web-share";




export const Sermon = () => {


  /********************************************
            GET THE FILE URLS
  *********************************************/


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

  /**********************************************
     GET THE SERMONS FROM THE API
   **********************************************/

  const [sermons, setSermons] = useState([]);


  const fetchSermonData = () => {
    return axios.get(serverurl + "/api/sermonall")
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
    fetchSermonData();
    fetchSermonTitleData();
    fetchSermonPreacherData();
  }, []);

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

      <div>
        <br></br><br></br>
        <div style={{ position: 'relative' }}>
          <Image fluid src="images/img3.jpg" alt="Card image" id="bannerimg" />
          <div id="banneroverlay">
            <div id="bannerid" className='text-center'>
              <p id="navhistory">
                <Link to="/" id="homelink" reloadDocument>Home &nbsp; &#60; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Link>
                <Link to="/sermons" reloadDocument className='text-white' id="currentlink">Sermons</Link>
              </p>
              <h4>Sermons</h4>
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
                <Card.Img id="" variant="top" src="images/sermonbanner.png" thumbnail />
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
            <h4 id="bluecolor" class='text-center'>Watch & Listen</h4>
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
                <Nav.Item className='tabitems' style={{ display: 'none' }}>
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
                                        <ButtonGroup className="me-2" aria-label="Second group">
                                          <Link to="#" className='btn btn-danger' id="vidbtn">
                                            <FontAwesomeIcon icon={faFileAudio} />
                                          </Link>
                                        </ButtonGroup>
                                        <ButtonGroup className="me-2" aria-label="Second group">
                                          <Link to="#" className='btn btn-danger' id="vidbtn">
                                            <FontAwesomeIcon icon={faDownload} />
                                          </Link>
                                        </ButtonGroup>
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
                                          <Link to="#" className='btn btn-danger' id="vidbtn" onClick={() => {loadVideo(sermonSearchDeepData.sermons_title,sermonSearchDeepData.sermons_file,values)}}>
                                            <FontAwesomeIcon icon={faVideoCamera} />
                                          </Link>
                                        </ButtonGroup>
                                       {/* <ButtonGroup className="me-2" aria-label="Second group">
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

          </Col>
        </Row>
      </Container>

      <br></br><br></br>



    </div >
  )
}
