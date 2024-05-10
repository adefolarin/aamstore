import React from 'react'
import { useState, useEffect, useRef } from 'react';
import { Container, Col, Row, Card, ButtonToolbar, ButtonGroup, Image, Tab, Nav, InputGroup, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideoCamera, faShareNodes, faDownload, faFileAudio, faUser, faLocation, faClock, faPerson, faArrowLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faFacebook, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { Link, useLocation, useSearchParams, useNavigate } from 'react-router-dom';
import { serverurl } from '../providers/ServerUrl';
import axios  from 'axios';

import Slider from 'react-slick';

export const ProductCategory = ({ productcategory }) => {

    const [product, setProductsByCat] = useState([]);
    const [ productcategoriesid, setProductCategoriesID] = useState();

    const search = useLocation().search;
    const productcatid = new URLSearchParams(search).get('productcatid');

    //const productcategoriesid = useRef<HTMLInputElement>(null);

   // const handleInput = (e) => {
     //   setProductCategoriesID(e.target.value);
    //}

    

    const fetchProductByCatData = () => {
        return axios.get(serverurl+"/api/productbycat/" + productcatid)
            .then((response) => setProductsByCat(response.data['products']));
            
    };
    
     
      useEffect(() => {
        fetchProductByCatData();
        console.log(product);
     },[])
    

    return (
        <div>
            <br></br><br></br>
            <Container>
                <Row>
                    <br></br><br></br><br></br>
                    <Col sm={12}>
                        <Tab.Container id="mytabs" defaultActiveKey="all" className="mytabs">
                            <Nav fill variant="tabs">
                            <Nav.Item className='tabitems'>
                                <Nav.Link eventKey="all" className='tablink' style={{ color: '#fff' }}>ALL</Nav.Link>
                            </Nav.Item>
                            {
                            productcategory && productcategory.length > 0 && productcategory.map((productCategoryData,key) => {
                            return <>
                           
                            
                            <Nav.Item className='tabitems'>
                                <Link eventKey={ productCategoryData.productcategories_id } className='tablink' style={{ color: '#fff' }} 
                                to={"/?productcatid=" + productCategoryData.productcategories_id} 
                                 >
                                    {productCategoryData.productcategories_name }</Link>
                            </Nav.Item>
                            
                            </>
                             })

                             
                            }
                            </Nav>

                            <Tab.Content style={{ marginTop: '20px' }}>
                            <Tab.Pane eventKey="all">
                                This is for all
                            </Tab.Pane>

                            {
                                product && product.length > 0 && product.map((productData,key) => {
                                return <>
                                <Tab.Pane eventKey={productcategoriesid}>
                                    
                                    { productData.products_name  }
                                  
                                </Tab.Pane>
                                </>
                                })
                            }

                            </Tab.Content>
                        </Tab.Container>

                        <br></br><br></br>

                    </Col>

                    
                </Row>


                <br></br><br></br>
                <Row>
                    <Col md={4}><hr style={{ borderTop: '1px solid #848484' }}></hr></Col>
                    <Col md={4}>
                        <p class="text-center">
                            <Link to="/productcategory" reloadDocument class='text-center' id='bannerbtn' className='btn btn-danger'>View More { productcategoriesid  }</Link>
                        </p>
                    </Col>
                    <Col md={4}><hr style={{ borderTop: '1px solid #848484' }}></hr></Col>

                    {
                                product && product.length > 0 && product.map((productData,key) => {
                                return <>
                                    
                                    { productData.products_name  }
                                  
                                </>
                                })
                    }
                </Row>
            </Container>

        </div>
    )
}

