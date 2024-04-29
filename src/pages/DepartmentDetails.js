import { React, useEffect, useState } from 'react'
import { Card, Image } from 'react-bootstrap';
import { Link, useLocation, useSearchParams, useNavigate } from 'react-router-dom';
import { Container, Col, Row, Button, ButtonGroup, ButtonToolbar, Table, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideoCamera, faShareNodes, faDownload, faFileAudio, faUser, faLocation, faClock, faPerson, faArrowLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faFacebook, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons'
import axios from 'axios';
import { serverurl } from '../providers/ServerUrl';
import './EventDetail.css';

export const DepartmentDetails = () => {

    /********************************************
             GET THE QUERY PARAMS   
    *********************************************/
    const search = useLocation().search;
    const deptid = new URLSearchParams(search).get('deptid');

    /********************************************
              GET THE FILE URLS
    *********************************************/
    //const deptfileurls = serverurl + "/admin/img/departments/";
    //const deptgalleryfileurls = serverurl + "/admin/img/departmentgalleries/";

    /**********************************************
       GET THE EVENT AND EVENT GALLERY FROM THE API
     **********************************************/
    const [deptdetail, setDeptDetail] = useState([]);

    const [depts, setDepts] = useState([]);

    const [deptgallery, setDeptGallery] = useState([]);

    const fetchDeptDetailData = () => {
        return axios.get(serverurl + "/api/department/" + deptid)
            .then((response) => setDeptDetail(response.data['departmentone']));
    };

    const fetchDeptGalleryData = () => {
        return axios.get(serverurl + "/api/department/" + deptid)
            .then((response) => setDeptGallery(response.data['departmentgallery']));
    };

    const fetchDeptsData = () => {
        return axios.get(serverurl+"/api/departmentall")
            .then((response) => setDepts(response.data['departments']));
    };

    useEffect(() => {
        fetchDeptDetailData();
        fetchDeptGalleryData();
        fetchDeptsData();
    }, [])


    /**********************************************
       POST EVENT REG FORM DATA TO THE API
     **********************************************/

    const [buttontext, setButtonText] = useState('Register');
    const [message, setMessageText] = useState();
    const [successmessage, setSuccessMessage] = useState();
    const [errormessage, setErrorMessage] = useState();

    const deptmembregs_dept = deptdetail.deptcategories_id;
    const [deptmembregs_name, setDeptMembRegsName] = useState();
    const [deptmembregs_email, setDeptMembRegsEmail] = useState();
    const [deptmembregs_pnum, setDeptMembRegsPnum] = useState();

    const navigate = useNavigate();

    const Save = async () => {
        setButtonText("Processing");
        if(deptmembregs_name === "" || deptmembregs_email === "" || deptmembregs_pnum === "") {
            setMessageText("error");
            setErrorMessage("All Fields are Required");
            setButtonText("Register");
        } else {
        try {
                      
            const items = { deptmembregs_dept, deptmembregs_name, deptmembregs_email, deptmembregs_pnum };
            //console.warn(items);
            const result = await axios.post(serverurl + "/api/deptmembreg", items);
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
                                <Link to="/dept-details" reloadDocument className='text-white' id="currentlink">Department Details</Link>
                            </p>
                            <h4>{ deptdetail.deptcategories_name }</h4>

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
                                <Card.Img id="eventimg" variant="top" src={deptdetail.departments_file} thumbnail />
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
                                <h4 id="bluecolor">Description</h4>
                                <p>
                                    {deptdetail.departments_content}
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
                                <h4 id="bluecolor" className='eventgallerycaption'>Our Gallery</h4>
                                <Row>
                                    {

                                        deptgallery.length > 0 && deptgallery.map((deptGalleryData, index) => {
                                            return <>
                                                {deptGalleryData.deptgalleries_file !== '' ?
                                                    <Col md={6}>

                                                        <Card id="deptcard" className="eventgallerylimg">

                                                            <Card.Img id="eventgalleryimg" variant="top" src={deptGalleryData.deptgalleries_file} thumbnail />

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
                                        Member Registration
                                    </Card.Header>
                                    <Card.Body>
                                        <Form>

                                            <Form.Group className="mb-3" controlId="">
                                                <Form.Control type="text" size="lg" placeholder="Full Name" style={{ fontSize: '16px', padding: '15px' }}
                                                    value={deptmembregs_name} onChange={(e) => setDeptMembRegsName(e.target.value)} />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="">
                                                <Form.Control type="text" size="lg" placeholder="Email" style={{ fontSize: '16px', padding: '15px' }}
                                                    value={deptmembregs_email} onChange={(e) => setDeptMembRegsEmail(e.target.value)} />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="">
                                                <Form.Control type="text" size="lg" placeholder="Pnone Number" style={{ fontSize: '16px', padding: '15px' }}
                                                    value={deptmembregs_pnum} onChange={(e) => setDeptMembRegsPnum(e.target.value)} />
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

                                        </ButtonToolbar>
                                    </Card.Body>
                                </Card>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>

            <br></br><br></br>

            <div>
            <Container>
                <Row>
                    <Col md={4}><hr style={{ borderTop: '1px solid #848484' }}></hr></Col>
                    <Col md={4}>
                        <h4 id="bluecolor" class='text-center'>Explore Other Departments</h4>
                    </Col>
                    <Col md={4}><hr style={{ borderTop: '1px solid #848484' }}></hr></Col>
                    <br></br><br></br><br></br>
                </Row>
            </Container>

            <Container>
                    <Row>
                        <Col md={12}>
                            <div>
                                <br></br>
                                <Row>
                                {
                                depts && depts.length > 0 && depts.map((deptData) => {
                                    return <>
                                    {deptData.deptcategories_name !== '' ?
                                    <Col md={4}>
                                        <Card id="deptcard">
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
   
                                </Row>
                            </div>
                        </Col>
                    </Row>
            </Container>

            </div>

            <br></br><br></br>

        </div >
    )
}
