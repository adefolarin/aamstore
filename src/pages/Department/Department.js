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
import './Department.css';
import Slider from 'react-slick';


export const Department = () => {

  
    /**********************************************
       GET THE DEPARTMENT FROM THE API
     **********************************************/

       const [depts, setDepts] = useState([]);
     
   
       const fetchDeptsData = () => {
         return axios.get(serverurl+"/api/departmentall")
             .then((response) => setDepts(response.data['departments']));
       };
     
       useEffect(() => {
          fetchDeptsData();
       },[])


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
                                <Link to="/departments" reloadDocument className='text-white' id="currentlink">Departments</Link>
                            </p>
                            <h4>Departments</h4>
                        </div>
                    </div>
                </div>
            </div>

            <br></br><br></br>
            <Container>
                    <Row>
                        <Col md={12}>
                            <div>
                                <br></br>
                                <Row>
                                <Slider {...settings}>
                                {
                                depts && depts.length > 0 && depts.map((deptData) => {
                                    return <>
                                    {deptData.deptcategories_name !== '' ?
                                    <Col md={12}>
                                        <Card id="deptcard" className='deptslide'>
                                            <Card.Title>
                                                <div className='text-center' id="bluecolor">
                                                    <button className='btn' style={{ backgroundColor: '#135592', color: '#fff', borderRadius: '50%', marginTop: '10px', marginBottom: '10px' }}><FontAwesomeIcon icon={faPerson} /></button>
                                                    <h5>{ deptData.deptcategories_name }</h5>
                                                </div>
                                            </Card.Title>
                                            <Card.Body>
                                                <div className='text-center' style={{ marginTop: '-20px' }}>
                                                    <p>
                                                       { deptData.departments_content }
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

            <br></br><br></br>



        </div >
    )
}
