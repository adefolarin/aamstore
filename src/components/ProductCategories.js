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
import { ProductByCategory } from './ProductByCategories';
import { ProductAll } from './ProductAll';

export const ProductCategory = ({ productcategory, product, productcatid, productcatname }) => {
        

    return (
        <div>
            <br></br><br></br>
            <Container style={{ marginTop:'100px' }}>
                <Row>
                    <br></br><br></br><br></br>
                    <Col sm={12}>
                        <h4 className='text-center'>{productcatname}</h4>
                        <Tab.Container id="mytabs" defaultActiveKey={!productcatid==1? "all": productcatid} className="mytabs">
                            <Nav fill variant="tabs">
                            <Nav.Item className='tabitems'>
                                <Nav.Link eventKey={!productcatid? "all": ''} className='tablink' 
                                style={{ color: '#fff' }}
                                href='/categories'
                                reloadDocument
                                >ALL</Nav.Link>
                            </Nav.Item>
                            {
                            productcategory && productcategory.length > 0 && productcategory.map((productCategoryData,key) => {
                            return <>
                           
                            
                            <Nav.Item className='tabitems'>
                                <Nav.Link eventKey={productcatid? productcatid : null}  className='tablink' style={{ color: '#fff' }} 
                                href={"/categories?productcatid=" + productCategoryData.productcategories_id + "&productcatname=" + productCategoryData.productcategories_name} 
                                
                                 >
                                    {productCategoryData.productcategories_name }</Nav.Link>
                            </Nav.Item>
                            
                            </>
                             })

                             
                            }
                            </Nav>

                            <Tab.Content style={{ marginTop: '20px' }}>
                            <Tab.Pane eventKey={!productcatid? "all": null} >
                             <ProductAll />
                            </Tab.Pane>

                            <Tab.Pane eventKey={productcatid? productcatid : null}>
                             <ProductByCategory product={product} />
                            </Tab.Pane>

                           
                            </Tab.Content>
                        </Tab.Container>

                        <br></br><br></br>

                    </Col>

                    
                </Row>


                <br></br><br></br>
 
            </Container>

        </div>
    )
}

