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

export const ProductAll = () => {

    const [product, setProduct] = useState([]);
  

    const fetchProductByData = () => {
        return axios.get(serverurl+"/api/product")
            .then((response) => setProduct(response.data['products']));
            
    };
    
     
      useEffect(() => {
        fetchProductByData();
        //console.log(product);
     },[])
    

    return (
        <div>
            <br></br>
            <Container>
                <Row>
                    <br></br>                
                    {
                        product && product.length > 0 && product.map((productData) => {
                            return <>
                                    <Col md={3}>
                                    <Card id="deptcard" className='deptslide'>
                                    <Link to={"/product-details?productid=" + productData.products_id + "&productcatid=" + productData.productcategories_id + "&productcatname=" + productData.productcategories_name} reloadDocument>
                                        <Card.Img variant="top" src={productData.products_image} />
                                    </Link>
                                        <Card.Body className='text-center'>
                                        <Card.Title>
                                    <p className='homeminicalevent text-right'>
                                    <ButtonGroup vertical>
                                            <Button style={{ backgroundColor: '#d8d8d8', color: '#135592', fontWeight: '800', border: 'none', height: '50px' }}>{}</Button>
                                    <Button style={{ backgroundColor: '#135592', color: '#fff', fontWeight: '800', border: 'none', borderRadius: '3px', height: '' }}>{}</Button>
                                      </ButtonGroup>
                                      </p>
                                      <h6 id="bluecolor">{productData.products_name}</h6>
                                  </Card.Title>
                                     
                                      <Card.Text style={{ display: 'block' }}>
                                          <p><Button className="" style={{ backgroundColor: 'transparent', border: 'none', borderRadius: '0', fontWeight: '600', color:'red' }}>
                                             ${productData.products_price}
                                            </Button></p>
                                      </Card.Text>
                      
                                      
                                      <Button
                                          variant="danger" className='btn btn-danger btn-sm'
                                          style={{ textDecoration: 'none', color: '#fff', border: 'none', borderRadius: '0', backgroundColor: '#135592' }}>
                                            Add To Cart
                                      </Button>
                                  </Card.Body>
                              </Card>
                          </Col>
                         </>
                        })
                    }
    

                <br></br><br></br>
                 
                </Row>

            </Container>

        </div>
    )
}

