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

    //const search = useLocation().search;
    //const productcatid = new URLSearchParams(search).get('productcatid');

    //const productcategoriesid = useRef<HTMLInputElement>(null);

   // const handleInput = (e) => {
     //   setProductCategoriesID(e.target.value);
    //}

    /*const loadProduct = () => {
        return axios.get(serverurl+"/api/productbycat/" + productcategoriesid)
        .then((response) => setProductsByCat(response.data['products']));
    }*/

    const loadProduct = async (productcategoriesid) => {
          try {
             
              const items = { productcategoriesid };
              const result = await axios.post(serverurl + "/api/productbycat", items);
 
              if (result.status == 200) {
              setProductsByCat(result.data.products);
              alert("True");
              console.log(result.data);
              }
    
          } catch (error) { 
            console.log(error);
          }
    };


    

    //const fetchProductByCatData = () => {
      //  return axios.get(serverurl+"/api/productbycat/" + productcatid)
        //    .then((response) => setProductsByCat(response.data['products']));
            
    //};
    
     
      useEffect(() => {
        //fetchProductByCatData();
        //console.log(product);
     },[])
    

    return (
        <div>
            <br></br><br></br>
            <Container>
                <Row>
                    <br></br><br></br><br></br>
                    <Col sm={12}>
                    <div>
                  <p>
                  {
                    productcategory && productcategory.length > 0 && productcategory.map((productCategoryData,key) => {
                    return <>
                   <Form>
                      <Form.Control type="text" size="lg" style={{ fontSize: '16px', padding: '15px' }}
                       value={productcategoriesid} 
                       onChange={(e) => setProductCategoriesID(e.target.value)} />
                  </Form>

                    <ButtonGroup className="me-2" aria-label="First group">
                      <Button class="btn btn-danger" style={{ backgroundColor: '#249D59', color: '#fff', borderRadius: '0', border: 'none', fontWeight: 'bold' }} 
                      onClick = {() =>loadProduct(productCategoryData.productcategories_id) }>
                      {productCategoryData.productcategories_name }
                      </Button>
                    </ButtonGroup>
                    </>
                  })
                }
                  </p>
                </div>

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

