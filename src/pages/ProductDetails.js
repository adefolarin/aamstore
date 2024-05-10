import { React, useEffect, useState } from 'react'
import { Card, Image } from 'react-bootstrap';
import { Link, useLocation, useSearchParams, useNavigate } from 'react-router-dom';
import { Container, Col, Row, Button, ButtonGroup, ButtonToolbar, Table, Form } from 'react-bootstrap';
import axios from 'axios';
import copy from "copy-to-clipboard";
import { serverurl } from '../providers/ServerUrl';
import './EventDetail.css';
import { ProductByCategory } from '../components/ProductByCategories';
export const ProductDetails = () => {

    /********************************************
             GET THE QUERY PARAMS   
    *********************************************/
    const search = useLocation().search;
    const search2 = useLocation().search;
    const search3 = useLocation().search;
    const productid = new URLSearchParams(search).get('productid');
    const productcatid = new URLSearchParams(search2).get('productcatid');
    const productcatname = new URLSearchParams(search3).get('productcatname');

    const [product, setProductsByCat] = useState([]);

    /********************************************
              GET THE FILE URLS
    *********************************************/
    //const eventfileurls = serverurl + "/admin/img/events/";
    //const eventgalleryfileurls = serverurl + "/admin/img/eventgalleries/";

    /**********************************************
       GET THE EVENT AND EVENT GALLERY FROM THE API
     **********************************************/
    const [productdetail, setProductDetail] = useState([]);


    const fetchProductByCatData = () => {
        return axios.get(serverurl+"/api/productbycats/" + productcatid)
            .then((response) => setProductsByCat(response.data['products']));
            
    };


    const fetchProductDetailData = () => {
        return axios.get(serverurl + "/api/product/" + productid)
            .then((response) => setProductDetail(response.data['productone']));
    };


    useEffect(() => {
        fetchProductByCatData();
        fetchProductDetailData();
    }, [])


    /**********************************************
       POST EVENT REG FORM DATA TO THE API
     **********************************************/

    const [buttontext, setButtonText] = useState('ADD TO CART');
    const [message, setMessageText] = useState();
    const [successmessage, setSuccessMessage] = useState();
    const [errormessage, setErrorMessage] = useState();

  
    const [products_qty, setProductQty] = useState(1);


    

    const navigate = useNavigate();
    
    const Save = async () => {
        setButtonText("Processing");
        if(products_qty === "") {
            setMessageText("error");
            setErrorMessage("All Fields are Required");
            setButtonText("ADD TO CART");
        } else {
        try {
                      
            const items = { products_qty };
            //console.warn(items);
            const result = await axios.post(serverurl + "/api/eventreg", items);
            setMessageText("success");
            setSuccessMessage(result.data.message);
            setButtonText("ADD TO CART");
            console.warn(result);
        
        } catch (error) {
            setMessageText("error");
            setErrorMessage("!!Sorry, Could Not Add to Cart");
            setButtonText("ADD TO CART");
            console.log(error);
        }
      }
    };


  

    return (
        <div>

            <br></br><br></br>
            <div style={{ marginTop:'200px' }}>
                <Container>
                <br></br>
                    <Row>
                        <Col md={5}>
                            <Card id="deptcard" className="eventdetailimg">
                                <Card.Img id="eventimg" variant="top" src={productdetail.products_image} thumbnail />
                            </Card>
                        </Col>
                        <Col md={7}>
                            <div id="eventdesc">
                                <h4>{ productdetail.products_name }</h4>
                                <h6>By Bishop Isreal Ade-Ajala</h6>
                                <h5 style={{ color:'red',fontWeight:'bold' }}>${ productdetail.products_price }</h5>
                                <p>
                                    {productdetail.products_description}
                                
                                </p>
                                {
                                 localStorage.getItem('user') ?
                                <Form>

                                <Form.Group className="mb-3" controlId="">
                                    <label>Quantity</label>
                                    <Form.Control type="text" size="lg"  style={{ fontSize: '16px', padding: '15px' }}
                                        value={products_qty} onChange={(e) => setProductQty(e.target.value)} />
                                </Form.Group>
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
                                                <Button class="btn btn-danger" style={{ backgroundColor: '#135592', color: '#fff', borderRadius: '0', border: 'none', fontWeight: 'bold' }} onClick={Save}>
                                                    {buttontext}
                                                </Button>:
                                                ''
                                                }

                                                {
                                                buttontext === "ADD TO CART" ?
                                                <Button class="btn btn-danger" style={{ backgroundColor: '#135592', color: '#fff', borderRadius: '0', border: 'none', fontWeight: 'bold' }} onClick={Save}>
                                                    {buttontext}
                                                </Button>:
                                                ''
                                                }
                                            </ButtonGroup>

                                        </ButtonToolbar>
                                </Form>
                                :
                                ''
                                }
                            </div>
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
                        
                    </Row>
                </Container>
            </div>


            <br></br>

            <Container>
                <Row>
                    <Col md={12}>
                        <br></br><br></br>
                        <h4 id="bluecolor" class='text-center'>YOU MAY ALSO LIKE</h4>
                        <hr style={{ borderTop: '2px solid red',width:'10%',margin:'auto' }}></hr>
                    </Col>
                    <br></br><br></br><br></br>
               </Row>

               <div>
                <ProductByCategory product={product}/>
                <br></br><br></br>
              </div>
           </Container>

        </div >
    )
}
