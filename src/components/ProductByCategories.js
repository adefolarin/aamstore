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
import { ProductAll } from './ProductAll';

export const ProductByCategory = ({ product }) => {


    const [storeproductsid, setProductID] = useState();
 
    const [message, setMessageText] = useState();
    const [success, setSuccessMessage] = useState();
    const [error, setErrorMessage] = useState();

    let user = JSON.parse(localStorage.getItem('user'));


    const AddtoCart = async (productid,productprice) => {

        setProductID(productid);          
          if(localStorage.getItem('user')) { 
             
              try {
                  
                  const storeusersid = user.storeuserone.storeusers_id;
                  const storecartsqty = 1;
                  const storeproductsprice = productprice;
                  const storeproductsid = productid;
                  const items = { storeproductsid, storeproductsprice, storecartsqty, storeusersid };
                  const result = await axios.post(serverurl + "/api/storecart", items);
                  if(result.data.status == true) {
                  setMessageText("success");
                  setSuccessMessage("Product Added To Cart");
                  console.warn(result.data);
                  }
  
              } catch (error) {
                  setMessageText("error");
                  setErrorMessage("!!Oops, Something went wrong. Please try again");
                  console.log(error);
              }
          } else {
              setMessageText("false");
              
              setErrorMessage("You must be logged in first");
          } 

   }
        

    return (
        <div>

   
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
                        
                                        <p>
                                        {
                                           storeproductsid == productData.products_id ?
                                          <div>
                                          {
                                           message == 'error' ?
                                          <button className='btn btn-danger'>
                                            {error}
                                          </button>: ''
                                          }
                                          {
                                           message == 'false' ?
                                          <button className='btn btn-danger'>
                                            {error}
                                          </button>: ''
                                          }
                                          {
                                           message == 'success' ?
                                          <button className='btn btn-success'>
                                            {success}
                                          </button>: ''
                                          }
                                          </div>: ''
                                        }
                                      </p>
                                        <Button
                                            variant="danger" className='btn btn-danger btn-sm'
                                            style={{ textDecoration: 'none', color: '#fff', border: 'none', borderRadius: '0', backgroundColor: '#135592' }}
                                            onClick={() => AddtoCart(productData.products_id,productData.products_price)}>
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


        </div>
    )
}

