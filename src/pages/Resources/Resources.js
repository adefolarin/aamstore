import { React, useEffect, useState } from 'react'
import { Card, Image } from 'react-bootstrap';
import { Link, useLocation, useSearchParams, useNavigate } from 'react-router-dom';
import { Container, Col, Row, Button, ButtonGroup, ButtonToolbar, Table, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideoCamera, faShareNodes, faDownload, faFileAudio, faUser, faLocation, faClock, faPerson, faArrowLeft, faAngleRight, faShare } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faFacebook, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons'
import axios from 'axios';
import { serverurl } from '../../providers/ServerUrl';
import '../EventDetail.css';
import './Resources.css';

export const Resources = () => {


    /********************************************
              GET THE FILE URLS
    *********************************************/
   //const resourcesfileurl = serverurl + "/storage/admin/docs/resources/";

    /**********************************************
       GET THE NEWS FROM THE API
     **********************************************/

    const [resources, setResources] = useState([]);


    const fetchResourcesData = () => {
        return axios.get(serverurl + "/api/resource")
            .then((response) => setResources(response.data['resources']));
    };

    useEffect(() => {
        fetchResourcesData();
    }, [])



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
                                <Link to="/resources" reloadDocument className='text-white' id="currentlink">Resources</Link>
                            </p>
                            <h4>Resources</h4>
                        </div>
                    </div>
                </div>
            </div>

            <br></br><br></br>
            <Container>
                <Row>
                    <br></br><br></br><br></br>
                    {
                        resources && resources.length > 0 && resources.map((resourcesData) => {
                            return <>
                                {resourcesData.resources_title !== '' ?
                                    <Row style={{ margin:'0px', marginTop:'40px', backgroundColor:'#A7C8DD' }}>
                                        <div
                                            style={{ borderRadius: '0px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)', padding: '10px' }}>
                                            <Row>
                                                <Col md={4}>
                                                    <div id="resimgdiv">
                                                    <Image className='' src={resourcesData.resources_file } id="resimg"/>
                                                    </div>
                                                    
                                                </Col>
                                                <Col md={4}>
                                                    <div className='resalign'>
                                                        <div>
                                                            <h6 style={{ color:'#000',fontWeight:'bold' }} className="text-center">
                                                                { resourcesData.resources_name }
                                                            </h6>
                                                        </div>
                                                    </div>
                                                </Col>
                                                <Col md={4}>
                                                    <div className='resalign'>
                                                        <p>
                                                            <ButtonGroup className="me-2" aria-label="Second group">
                                                                <Link to={resourcesData.resources_file} className='btn btn-danger' id="vidbtn" download={resourcesData.resources_name}  
                                                                target="_blank"
                                                                rel="noreferrer">
                                                                    <FontAwesomeIcon icon={faDownload} />
                                                                </Link>
                                                            </ButtonGroup>

                                                        </p>
                                                    </div>
                                                </Col>
                                            </Row>
                                            
                                        </div>
                                      
                                    </Row>:
                                    
                                    <Row>
                                    <Col md={12}>
                                        <Card id="deptcard">
                                            <Card.Body className='text-center'>
                                                <Card.Title>
                                                    No Resources For Now
                                                </Card.Title>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    </Row>
                                }
                            </>
                        })
                    }
                </Row>


            </Container>

            <br></br><br></br>



        </div >
    )
}
