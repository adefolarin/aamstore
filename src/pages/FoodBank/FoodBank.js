import { React, useEffect, useState } from 'react'
import { Card, Image } from 'react-bootstrap';
import { Link, useLocation, useSearchParams, useNavigate } from 'react-router-dom';
import { Container, Col, Row, Button, ButtonGroup, ButtonToolbar, Table, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideoCamera, faShareNodes, faDownload, faFileAudio, faUser, faLocation, faClock, faPerson, faArrowLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faFacebook, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons'
import axios from 'axios';
import { serverurl } from '../../providers/ServerUrl';
import '../EventDetail.css';
import './FoodBank.css';

export const FoodBank = () => {

    /********************************************
             GET THE QUERY PARAMS   
    *********************************************/
    const search = useLocation().search;
    const deptid = new URLSearchParams(search).get('deptid');

    /********************************************
              GET THE FILE URLS
    *********************************************/
    //const foodbankvideofileurls = serverurl + "/storage/admin/videos/foodbanks/";
    //const foodbankimgfileurls = serverurl + "/admin/img/foodbanks/";

    const foodbankgalleryfileurls = serverurl + "/admin/img/foodbankgalleries/";

    /**********************************************
       GET THE FOODBANK AND FOODBANK GALLERY FROM THE API
     **********************************************/
    const [foodbanks, setFoodBank] = useState([]);

    const [foodbanks2, setFoodBank2] = useState([]);

    const [foodbankgallery, setFoodBankGallery] = useState([]);

    const [volforms, setVolForm] = useState([]);

    const fetchFoodBankData = () => {
        return axios.get(serverurl + "/api/foodbank")
            .then((response) => setFoodBank(response.data['foodbanks']));
    };

    const fetchFoodBankData2 = () => {
        return axios.get(serverurl + "/api/foodbank")
            .then((response) => setFoodBank2(response.data['foodbanks']));
    };

    const fetchFoodBankGalleryData = () => {
       return axios.get(serverurl + "/api/foodbank")
            .then((response) => setFoodBankGallery(response.data['foodbankgallery']));
    };

    const fetchVolFormData = () => {
        return axios.get(serverurl + "/api/volform")
            .then((response) => setVolForm(response.data['volforms']));
    };


    useEffect(() => {

        fetchFoodBankData2();
        fetchFoodBankData();
        fetchFoodBankGalleryData();
        fetchVolFormData();

        //alert(foodbanks2.foodbanks_videofile);
    }, [])


    /**********************************************
       POST FOOD BANK REG FORM DATA TO THE API
     **********************************************/

    const [buttontext, setButtonText] = useState('Send');
    const [message, setMessageText] = useState();
    const [successmessage, setSuccessMessage] = useState();
    const [errormessage, setErrorMessage] = useState();


    //const [volunteers_type, setVolType] = useState();
    const [volunteers_name, setVolName] = useState();
    const [volunteers_email, setVolEmail] = useState();
    const [volunteers_pnum, setVolPnum] = useState();
    const [checkedvalue, setCheckedValue] = useState("false");

    const [selecteditem, setSelectedItem] = useState([]);

   function checkboxHandler(e) {
      const isSelected = e.target.checked;
      const value = e.target.value;
    
        if(isSelected) {
            selecteditem.push(value);
            if(selecteditem.length > 0) {
               setCheckedValue("true");
            }
        } else {
            selecteditem.splice(value, 1);
            if(selecteditem.length <= 0) {
                setCheckedValue("false");
            }
        } 

   } 

   





    const volunteers_type = "Food Bank";

    const navigate = useNavigate();

    const Save = async () => {
        setButtonText("Processing");
        if(volunteers_type === "" || volunteers_name === "" || volunteers_email === "" || volunteers_pnum === "" || checkedvalue === "false" ) {
            setMessageText("error");
            setErrorMessage("All Fields are Required");
            setButtonText("Send");
        } else {
        try {
                      
            const items = { volunteers_type, volunteers_name, volunteers_email, volunteers_pnum, selecteditem };
            //console.warn(items);
            const result = await axios.post(serverurl + "/api/volunteer", items);
            setMessageText("success");
            setSuccessMessage(result.data.message);
            setButtonText("Send");
            console.warn(result);
        
        } catch (error) {
            setMessageText("error");
            setErrorMessage("!!Sorry, The Volunteer Form Could Not Be Processed");
            setButtonText("Send");
            console.log(error);
        }
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
                                <Link to="/" id="homelink" reloadDocument>Home &nbsp; &#60; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Link>
                                <Link to="/foodbank" reloadDocument className='text-white' id="currentlink">Food Bank</Link>
                            </p>
                            <h4> Food Bank</h4>

                        </div>
                    </div>
                </div>
            </div>

            <div>
                <Container>
                    <Row>
                        <Col md={12}>
                            <Card id="deptcard" className="eventdetailimg">
                                {
                                foodbanks && foodbanks.map((foodBankData,index) => {
                                return <>
                                <Card.Img id="foodbankimg" variant="top" src={foodBankData.foodbanks_imagefile} thumbnail />
                                 </>
                              
                                })
                                }
                            </Card>
                        </Col>
                    </Row>
                    <br></br><br></br>
                </Container>
            </div>

        <div>
        <Container>
          <Row>
            <div
              style={{ borderRadius: '0px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)', padding: '20px' }}>
              <Row>
                <Col md={12} id="aboutvidcol">
                  <div className='' id="video">
                    {
                    foodbanks && foodbanks.map((foodBankData,index) => {
                    return <>
                     <video controls style={{ width: '100%', height: '100%', margin: 'auto' }}>
                        <source src={ foodBankData.foodbanks_videofile } type="video/mp4" />
                      </video>
                      </>
                      })
                     }
                    
                  </div>
                </Col>
              </Row>
            </div>
          </Row>
        </Container>
      </div>


            <br></br><br></br><br></br>
            <div>
                <Container>
                    <Row>
                        <Col md={6}>
                            <div id="eventgallery">
                                <h4 id="bluecolor" className='eventgallerycaption'>Explore The Various Items Available For Distribution</h4>
                                <Row>
                                    {

                                        foodbankgallery.length > 0 && foodbankgallery.map((foodBankGalleryData, index) => {
                                            return <>
                                                {foodBankGalleryData.foodbankgalleries_file !== '' ?
                                                    <Col md={6}>

                                                        <Card id="deptcard" className="eventgallerylimg">

                                                            <Card.Img id="eventgalleryimg" variant="top" src={foodBankGalleryData.foodbankgalleries_file} thumbnail />

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
                                        Volunteer Registration
                                    </Card.Header>
                                    <Card.Body>
                                        <Form>

                                            <Form.Group className="mb-3" controlId="">
                                                <Form.Control type="text" size="lg" placeholder="Full Name" style={{ fontSize: '16px', padding: '15px' }}
                                                    value={volunteers_name} onChange={(e) => setVolName(e.target.value)} />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="">
                                                <Form.Control type="email" size="lg" placeholder="Email" style={{ fontSize: '16px', padding: '15px' }}
                                                    value={volunteers_email} onChange={(e) => setVolEmail(e.target.value)} />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="">
                                                <Form.Control type="text" size="lg" placeholder="Pnone Number" style={{ fontSize: '16px', padding: '15px' }}
                                                    value={volunteers_pnum} onChange={(e) => setVolPnum(e.target.value)} />
                                            </Form.Group>
                                           
                                            <Form.Group className="mb-3" controlId="" style={{ border:'1px solid #eee', borderRadius:'5px',padding:'20px' }}>
                                            <label>Time you will be available(tick all that apply)</label>
                                            <br></br><br></br>
                                            {
                                            volforms.length > 0 && volforms.map((volFormData,index) => {
                                            return <Form.Check
                                                    
                                                    inline
                                                    label={volFormData.volforms_time}
                                                    type='checkbox'
                                                    
                                                    value={volFormData.volforms_time}
                                                    name="volunteers_time"
                                                    
                                                    onChange={checkboxHandler}
                                                  
                                                />
                                                
                                             })
                                            }

                                            <Form.Control
                                              value={checkedvalue} style={{ display:'none' }}
                                            />
                                          
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
                                                buttontext === "Send" ?
                                                <Button class="btn btn-danger" style={{ backgroundColor: 'red', color: '#fff', borderRadius: '0', border: 'none', fontWeight: 'bold' }} onClick={Save}>
                                                    {buttontext}
                                                </Button>:
                                                ''
                                                }
                                            </ButtonGroup>

                                        </ButtonToolbar>
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
