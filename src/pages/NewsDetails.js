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

export const NewsDetails = () => {

    /********************************************
             GET THE QUERY PARAMS   
    *********************************************/
    const search = useLocation().search;
    const newsid = new URLSearchParams(search).get('newsid');

    /********************************************
              GET THE FILE URLS
    *********************************************/
    //const newsfileurls = serverurl + "/admin/img/news/";

    /**********************************************
       GET THE NEWS
     **********************************************/
    const [newsdetail, setNewsDetail] = useState([]);

    const [news, setNews] = useState([]);

    const fetchNewsDetailData = () => {
        return axios.get(serverurl + "/api/news/" + newsid)
            .then((response) => setNewsDetail(response.data['newsone']));
    };

    const fetchNewsData = () => {
        return axios.get(serverurl + "/api/news")
            .then((response) => setNews(response.data['news']));
    };

    useEffect(() => {
        fetchNewsDetailData();
        fetchNewsData();
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
                                <Link to="/" id="homelink">Home &nbsp; &#60; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Link>
                                <Link to="/news-details" className='text-white' id="currentlink">News Details</Link>
                            </p>
                            <h4>{ newsdetail.news_title }</h4>

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
                                <Card.Img id="eventimg" variant="top" src={newsdetail.news_file} thumbnail />
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
                                <h4 id="bluecolor">Content</h4>
                                <p>
                                    {newsdetail.news_content}
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
                    <Col md={4}><hr style={{ borderTop: '1px solid #848484' }}></hr></Col>
                    <Col md={4}>
                        <h4 id="bluecolor" class='text-center'>Explore Other Newss</h4>
                    </Col>
                    <Col md={4}><hr style={{ borderTop: '1px solid #848484' }}></hr></Col>
                    <br></br><br></br><br></br>
                </Row>
            </Container>

            {<Container>
                <Row>
                    <br></br><br></br><br></br>
                    {
                        news && news.length > 0 && news.map((newsData) => {
                            return <>
                                {newsData.news_title !== '' ?
                                    <Col md={4}>
                                        <Card id="deptcard">
                                            <Card.Img variant="top" src={newsData.news_file} />
                                            <Card.Body className='text-center'>
                                                <Card.Title>
                                                    <p className='homeminicalevents'>
                                                        <ButtonGroup vertical>
                                                            <Button style={{ backgroundColor: '#135592', color: '#fff', fontWeight: '800', border: 'none', borderRadius: '0', height: '' }}>{newsData.news_date}</Button>
                                                        </ButtonGroup>
                                                    </p>
                                                    <h6 id="bluecolor">{newsData.news_title}</h6>
                                                </Card.Title>
     
                                                <Link to={"/news-details?newsid=" + newsData.news_id}
                                                    variant="danger" className='btn btn-danger btn-sm'
                                                    style={{ textDecoration: 'none', color: '#135592', border: '1px solid red', borderRadius: '0', backgroundColor: 'transparent' }} reloadDocument>New Details</Link>
                                            </Card.Body>
                                        </Card>
                                    </Col> :
                                    <Col md={12}>
                                        <Card id="deptcard">
                                            <Card.Body className='text-center'>
                                                <Card.Title>
                                                    No News For Now
                                                </Card.Title>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                }
                            </>
                        })
                    }
                </Row>


                </Container>}

            </div>

            <br></br><br></br>

        </div >
    )
}
