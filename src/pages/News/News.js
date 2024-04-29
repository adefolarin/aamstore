import { React, useEffect, useState } from 'react'
import { Card, Image } from 'react-bootstrap';
import { Link, useLocation, useSearchParams, useNavigate } from 'react-router-dom';
import { Container, Col, Row, Button, ButtonGroup, ButtonToolbar, Table, Form } from 'react-bootstrap';
import axios from 'axios';
import { serverurl } from '../../providers/ServerUrl';
import '../EventDetail.css';

export const News = () => {

  
    /********************************************
              GET THE FILE URLS
    *********************************************/
    //const newsfileurl = serverurl + "/admin/img/news/";

    /**********************************************
       GET THE NEWS FROM THE API
     **********************************************/

       const [news, setNews] = useState([]);
     
   
       const fetchNewsData = () => {
         return axios.get(serverurl+"/api/news")
             .then((response) => setNews(response.data['news']));
       };
     
       useEffect(() => {
          fetchNewsData();
       },[])



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
                                <Link to="/news" reloadDocument className='text-white' id="currentlink">News</Link>
                            </p>
                            <h4>News</h4>
                        </div>
                    </div>
                </div>
            </div>

            <br></br><br></br>
            <Container>
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


            </Container>

            <br></br><br></br>



        </div >
    )
}
