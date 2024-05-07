// VideoBackground.js
import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Col, Row, Card, ButtonToolbar, ButtonGroup, Image, Tab, Nav, InputGroup, Form, Button, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideoCamera, faShareNodes, faDownload, faFileAudio, faUser, faLocation, faClock, faPerson, faArrowLeft, faAngleRight, faMousePointer, faPlane, faPlaneUp, faPlaneSlash, faPlaneDeparture, faPhoneVolume } from '@fortawesome/free-solid-svg-icons';
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
import { faEnvelope, faPhone, faMapLocation, faAddressCard, faAddressBook } from '@fortawesome/free-solid-svg-icons';
import { RWebShare } from "react-web-share";
import { ProductCategory } from '../../components/ProductCategory';
import { Product } from '../../components/Product';


import './Home.css'

export const Home = () => {


    /*********************************************************
     POST THE FORM DATA TO THE API AND GET THE SEARHC RESULT
  **********************************************************/

     const [productsearch, setProductSearch] = useState([]);
     const [getproductsearch, getProductSearch] = useState([]);

   
     const [buttontext, setButtonText] = useState('Search');
     const [message, setMessageText] = useState();
     const [successmessage, setSuccessMessage] = useState();
     const [errormessage, setErrorMessage] = useState();
   
   
   
   
     const getSearch = async () => {
       setButtonText("Processing");
       if (productsearch === "") {
         setMessageText("error");
         setErrorMessage("All Fields are Required");
         setButtonText("Search");
       } else {
         try {
   
           const items = { productsearch };
           //console.warn(items);
           const result = await axios.post(serverurl + "/api/productsearch", items);
   
           if (result.data.productsearchdata['productsearch_result'] === "Not Found") {
             setMessageText("error");
             //setErrorMessage2("No Result Found");
             setErrorMessage("");
           } else {
             setMessageText("success");
             setMessageText("");
             
             //setSuccessMessage2("Result Found");
             setSuccessMessage("");
             getProductSearch(result.data.productsearchdata);
   
             console.log(result.data);
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
   

  const [banner, setBanner] = useState([]);
  const [events, setEvents] = useState([]);
  const [productcategories, setProductCategories] = useState([]);
  const [productsbycat, setProductsByCat] = useState([]);
  const [productcategoriesid, setProductCategoriesID] = useState([]);


  const fetchBannerData = () => {
    return axios.get(serverurl + "/api/banner")
    .then((response) => setBanner(response.data['banners']));
    
  };

  const fetchEventsData = () => {
    return axios.get(serverurl+"/api/event")
        .then((response) => setEvents(response.data['events']));
  };

  const fetchProductCategoryData = () => {
    return axios.get(serverurl+"/api/productcategory")
        .then((response) => setProductCategories(response.data['productcategories']));
  };

  /*const fetchProductByCatData = () => {
    return axios.get(serverurl+"/api/productbycat/1")
        .then((response) => setProductsByCat(response.data['products']));
  };*/



  useEffect(() => {
    fetchBannerData()
    fetchEventsData();
    fetchProductCategoryData();
    //fetchProductByCatData();
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
                  <div className="caption text-center">
                    <h2 className="text-center">
                      WELCOME
                    </h2>
                    <h2>TO OUR</h2>
                    <h2>E-STORE</h2>
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


      {/*  Seach   */}

      <div id="sectionmargin" style={{ backgroundColor:'#204782', padding:'20px' }}>
      <Container>
         <SearchFormGroup productsearch={productsearch} setProductSearch={setProductSearch} buttontext={buttontext} message={message} errormessage={errormessage} successmessage={successmessage} getSearch={getSearch} />
      </Container>

      </div>


      {/*   Products   */}
      <Container>
                <Row>
                    <Col md={12}>
                        <br></br><br></br>
                        <h4 id="bluecolor" class='text-center'>Browse Products</h4>
                        <hr style={{ borderTop: '2px solid red',width:'10%',margin:'auto' }}></hr>
                        <br></br>
                        <p id="bluecolor" class='text-center'>Elevate your spiritual journey with the transformative <br></br>power of Christian Books</p>
                    </Col>
                    <br></br><br></br><br></br>
               </Row>

               <div>
              <Fade delay={300} duration={2000}>
                <Product />
              </Fade>
              </div>
      </Container>



      {/* Product Order Procedure  */}
      <Container>
        <Row>
            <Col md={12}>
                <div>
                    <br></br>
                    <Row>

                    <Col md={4}>
                            <Card id="deptcard" style={{ backgroundColor: '#135592', color: '#fff', padding: '50px' }}>
                                <Card.Title>
                                    <div className='text-center' id="bluecolor">
                                        <button className='btn' style={{ backgroundColor: '#fff', color: '#135592', borderRadius: '50%', marginTop: '10px', marginBottom: '10px', fontSize: '20px' }}><FontAwesomeIcon icon={faPhone} /></button>
                                        <br></br><br></br>
                                        <h5 style={{ color: '#fff', fontSize: '18px' }}>24/7 ONLINE <br></br>cALL SERVICE</h5>
                                    </div>
                                </Card.Title> 
                            </Card>
                        </Col>


                        <Col md={4}>
                            <Card id="deptcard" style={{ backgroundColor: '#135592', color: '#fff', padding: '50px' }}>
                                <Card.Title>
                                    <div className='text-center' id="bluecolor">
                                        <button className='btn' style={{ backgroundColor: '#fff', color: '#135592', borderRadius: '50%', marginTop: '10px', marginBottom: '10px', fontSize: '20px' }}><FontAwesomeIcon icon={faPlaneUp} /></button>
                                        <br></br><br></br>
                                        <h5 style={{ color: '#fff', fontSize: '18px' }}>SAFE SHIPPING <br></br>GURANTEE</h5>
                                    </div>
                                </Card.Title> 
                            </Card>
                        </Col>

                        <Col md={4}>
                            <Card id="deptcard" style={{ backgroundColor: '#135592', color: '#fff', padding: '50px' }}>
                                <Card.Title>
                                    <div className='text-center' id="bluecolor">
                                        <button className='btn' style={{ backgroundColor: '#fff', color: '#135592', borderRadius: '50%', marginTop: '10px', marginBottom: '10px', fontSize: '20px' }}><FontAwesomeIcon icon={faPhoneVolume} /></button>
                                        <br></br><br></br>
                                        <h5 style={{ color: '#fff', fontSize: '18px' }}>SPECIAL DISCOUNT <br></br> OFFER</h5>
                                    </div>
                                </Card.Title>
                            </Card>
                        </Col>


                    </Row>
                </div>
            </Col>
        </Row>
      </Container>




      {/*  About  */}
      <div id="sectionmargin" className='homeabout'>
      <Container>
      <Row>
          <Col md={12}>
                        
                        <h4 id="bluecolor" class='text-center'>About The Author</h4>
                        <hr style={{ borderTop: '2px solid red',width:'10%',margin:'auto' }}></hr>
           </Col>
                    <br></br><br></br><br></br>
      </Row>
      </Container>
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
                  <p>
                    Kingdom Connection Christian Center is a Word of Faith, non-denominational, full gospel church.
                  </p>
                  <p>
                     We believe the Bible, the complete writings of both the Old and New Testaments is the literal Word of God, verbally inspired by the Holy Spirit, inerrant as originally given by God, and infallible as the standard of our faith and practice...
                  </p>
                  <p>
                  Our mission is reaching and harvesting lost souls for Christ and teaching the Body of Christ how to effectively apply God’s principles to have victory in every area of life. Kingdom Connection Christian Center is a church committed to raising champions in the body of Christ.
                  </p>
                  <p>
                  Our mission is reaching and harvesting lost souls for Christ and teaching the Body of Christ how to effectively apply God’s principles to have victory in every area of life. Kingdom Connection Christian Center is a church committed to raising champions in the body of Christ.
                  </p>
                  <p>
                  Our mission is reaching and harvesting lost souls for Christ and teaching the Body of Christ how to effectively apply God’s principles to have victory in every area of life. Kingdom Connection Christian Center is a church committed to raising champions in the body of Christ.
                  </p>
                  <p>
                  Our mission is reaching and harvesting lost souls for Christ and teaching the Body of Christ how to effectively apply God’s principles to have victory in every area of life. Kingdom Connection Christian Center is a church committed to raising champions in the body of Christ.
                  </p>

                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
        </Fade>
      </div>
      <br></br>
     




    </div>
  );
};
