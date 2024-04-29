import { React, useEffect, useState, useRef } from 'react'
import { Container, Col, Row, Card, ButtonToolbar, ButtonGroup, Image, Tab, Nav, InputGroup, Form, Button } from 'react-bootstrap';
import { Link, useLocation, useSearchParams, useNavigate } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideoCamera, faShareNodes, faDownload, faFileAudio, faUser, faLocation, faClock, faPerson, faArrowLeft, faAngleRight, faShare } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faFacebook, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons'
import axios from 'axios';
import { serverurl } from '../../providers/ServerUrl';
import { SearchFormGroup } from '../../components/Forms/SearchFormGroup';
import { apiKey } from '../../providers/ServerUrl';
import { servicechannelid } from '../../providers/ServerUrl';
import { LiveCountDownTimer } from '../../components/LiveCountDownTimer';
import Modal from 'react-bootstrap/Modal';
import { VideoModal } from '../../components/VideoModal';
import { RWebShare } from "react-web-share";
import './LiveStream.css';


export const LiveStream = () => {


    /********************************************
              GET THE FILE URLS
    *********************************************/
 
    /**********************************************
       GET THE SERMONS FROM THE API
     **********************************************/

    const [sermons, setSermons] = useState([]);
    const [networkerror, setNetWorkError] = useState();


    const fetchSermonData = async () => {
       try {
        return await axios.get('https://www.googleapis.com/youtube/v3/search?key=' 
        + apiKey + '&channelId=' + servicechannelid + '&part=snippet,id&maxResults=50&order=date')
            .then((response) => setSermons(response.data['items']));
       } catch(error) {
          setNetWorkError("Oops!!! Network Error");
       }

    };

    useEffect(() => {
        fetchSermonData();

        console.log(sermons);
    }, [])

    const OpenVideo = () =>  {

    }

    // LIVE COUNTDWNS
    const [nextlivestream, setNextLiveStream] = useState([]);

    const fetchNextLiveStreamData = async () => {
      try {
      return await axios.get(serverurl + "/api/livecountdown")
          .then((response) => setNextLiveStream(response.data['livecountdowns']));
      } catch(error) {
            setNetWorkError("Oops!!! Network Error");
      }
    };

    useEffect(() => {
      fetchNextLiveStreamData();
   },[])

   // MODAL
  
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
      
         <VideoModal show={show} videoid={videoid} handleClose={handleClose} />

            <div>
                <br></br><br></br>
                <div style={{ position: 'relative' }}>
                    <Image fluid src="images/img3.jpg" alt="Card image" id="bannerimg" />
                    <div id="banneroverlay">
                        <div id="bannerid" className='text-center'>
                            <p id="navhistory">
                                <Link to="/" id="homelink" reloadDocument>Home &nbsp; &#60; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Link>
                                <Link to="/livestream" reloadDocument className='text-white' id="currentlink">Live Service</Link>
                            </p>
                            <h4>Live Service</h4>
                        </div>
                    </div>
                </div>
            </div>
            <br></br><br></br>

                 {/* Year in Review and Event Clock */}
      <div>
        <Container style={{ position: 'relative' }}>
          <Row>
            <Col sm={12} md={12}>
              <Card style={{ width: '100%' }} className='text-center' id="homecard2">
                   <h4>{ networkerror }</h4>
              {
                nextlivestream && nextlivestream.map((nextLiveStreamData,index) => {
                return<>
                {
                nextLiveStreamData.livecountdowns_status === "true" ?
                <Card.Body>
                  <Card.Title>
                    <h5 id="bluecolor">COUNT DOWN TO THE LIVE VIDEO</h5>
                  </Card.Title>
                  <Card.Text>       
                    <div>
                      <Row>
                        <Col md={12}>
                         
                             <LiveCountDownTimer livecountdown = {nextLiveStreamData.livecountdowns_datetime} />
                          
                        </Col>
                      </Row>
                    </div>                  
                  </Card.Text>
                </Card.Body> :
                <Card.Body>
                <Card.Title>
                </Card.Title>
                  <div>
                  <Container>
                      <Row>
                          <Col md={12}>
                              <Card id="deptcard" className="eventdetailimg">
                              <iframe
                                      id="frameid"
                                      src="https://www.youtube.com/embed/live_stream?channel=UC_8_w-pM9yJXpqjMJguouLw"
                                      frameborder="0"
                                      allow="accelerometer; 
                                      autoplay; 
                                      clipboard-write; 
                                      encrypted-media; 
                                      gyroscope; 
                                      picture-in-picture; 
                                      web-share" allowfullscreen>
                              </iframe>
                              </Card>
                          </Col>
                      </Row>


                      <br></br><br></br>
                      <Row>

                      </Row>
                  </Container>
              </div>
                </Card.Body>
                }
                </>
                 })
                }
              </Card>
            </Col>
          </Row>
        </Container>
      </div>


            <br></br><br></br>
          <Container>
          <Row>
            <Col sm={4}><hr style={{ borderTop: '1px solid #848484' }}></hr></Col>
            <Col sm={4}>
              <h4 id="bluecolor" class='text-center'>Archived Messages</h4>
            </Col>
            <Col sm={4}><hr style={{ borderTop: '1px solid #848484' }}></hr></Col>
            <br></br><br></br><br></br>

            <Col sm={12}>
                    {/*<SearchFormGroup />*/}

                    <Container>

                    {
              
                       sermons && sermons.length > 0 && sermons.map((sermonData,index) => {
                      return <Row>
                        <div
                          style={{ borderRadius: '0px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)', padding: '20px' }}>
                          <Row>
                            <Col md={4}>
                              <div className=''>
                              <iframe style={{ width: '100%', height: '150px', margin: 'auto' }}
                                    src={"https://www.youtube.com/embed/" + sermonData.id.videoId}
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
                                  <h6 id="bluecolor" className="text-center">{sermonData.snippet.title }</h6>
                                  <p id="bluecolor" className="text-center" style={{ fontSize: '13px' }}>

                                    <FontAwesomeIcon icon={faClock} />
                                    &nbsp;<span style={{ color: '#000', fontWeight: '600' }}>{sermonData.snippet.publishedAt}</span> &nbsp;

                                  </p>
                                </div>
                              </div>
                            </Col>
                            <Col md={4}>
                              <div className='valign'>
                                <p>
                                  <ButtonGroup className="me-2" aria-label="First group">

                                    
                                    <Link to="#" className='btn btn-danger' id="vidbtn" onClick={() => {loadVideo(sermonData.snippet.title,sermonData.id.videoId,values)}}>
                                      <FontAwesomeIcon icon={faVideoCamera} />
                                    </Link>
                                   

                                    </ButtonGroup>
                                   {/* <ButtonGroup className="me-2" aria-label="First group">
                                  
                                      <Link to={"https://www.youtubepp.com/embed/" + sermonData.id.videoId} className='btn btn-danger' id="vidbtn">
                                        <FontAwesomeIcon icon={faDownload} />
                                      </Link>
                                   </ButtonGroup>
                                   */}
                                   <ButtonGroup className="me-2" aria-label="Second group">
                                      <RWebShare
                                            data={{
                                                text: "Web Share",
                                                url: "https://www.youtubepp.com/embed/" + sermonData.id.videoId,
                                                title: sermonData.snippet.title,
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
                    </Container>
                  


            </Col>
          </Row>
        </Container>

            <br></br><br></br>



        </div >
    )
}
