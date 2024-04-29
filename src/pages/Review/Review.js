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

    //const reviewfileurls = serverurl + "/storage/admin/videos/reviews/";

    /**********************************************
       GET THE REVIEWS FROM THE API
     **********************************************/

    const [buttontext, setButtonText] = useState('Search');
    const [message, setMessageText] = useState();
    const [successmessage, setSuccessMessage] = useState();
    const [errormessage, setErrorMessage] = useState();

    const [reviewyear, setReviewYear] = useState();

    const [getreview, setGetReview] = useState([]);

    const [getyear, setYear] = useState([]);

    const years = Array.from(Array(new Date().getFullYear() - 2019), (_, i) => (i + 2020).toString());


    const getReview = async () => {
        setButtonText("Processing");
        if (reviewyear === "") {
            setMessageText("error");
            setErrorMessage("All Fields are Required");
            setButtonText("Search");
        } else {
            try {

                const items = { reviewyear };
                //console.warn(items);
                const result = await axios.post(serverurl + "/api/reviewsearch", items);

                if (result.status === 200 && result.data.reviews['reviews_year'] === "Not Found") {
                    setGetReview(result.data.reviews);
                    setMessageText("error");
                    setErrorMessage("No Result Found");
                    
                } else {
                    setGetReview(result.data.reviews);
                    setMessageText("success");
                    setSuccessMessage("Result Found");
                    result.data.reviews = "";
                    console.log(result.data.reviews);
                   
                }
                
               
                setButtonText("Search");


            } catch (error) {
                setMessageText("error");
                setErrorMessage("You Must Select Year Of Review");
                setButtonText("Search");
                console.log(error);
            }
        }
    };





    function yearInReview(e) {
        const year = e.target.value;
        if(year !== "") {
           setReviewYear(year);
           setGetReview("");
           //setSuccessMessage("");
           //setErrorMessage("");
        } 
    }
   

  



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
                                <Link to="/review" reloadDocument className='text-white' id="currentlink">Year In Review</Link>
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
                                    <Form.Select aria-label="" value={reviewyear}
                                        onChange={yearInReview}>
                                        <option>Select Year</option>
                                        {
                                         years.length > 0 && years.map((getYearData, index) => {
                                        return<>
                                        <option value={getYearData}>{getYearData}</option>
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
                         <h4 className="text-center"> Year { reviewyear } </h4>
                         <Table striped bordered hover size="xs" className='text-center table-responsive' 
                      >
                        
                            <thead style={{ backgroundColor:'#135592' }}>
                                <tr>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                
                                {
                                    getreview.length > 0 && getreview.map((getData, index) => {
                                        return <>
                                           {
                                          
                                            <tr>
                                                <td>
                                                    <div className='' id="video">
                                                    <video controls style={{ width: '100%', height: '100%', margin: 'auto' }}>
                                                        <source src={getData.reviews_file} type="video/mp4" />
                                                    </video>
                                                    </div>
                                                </td>
                                            </tr>
                                            
                                           }
                                           </>
                                    
                                    })
                                }

                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
             </Container>

            <br></br><br></br>




        </div >
    )
}
