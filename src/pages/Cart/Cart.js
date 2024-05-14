import { React, useEffect, useState } from 'react'
import { Card, Image, InputGroup } from 'react-bootstrap';
import { Link, useLocation, useSearchParams, useNavigate } from 'react-router-dom';
import { Container, Col, Row, Button, ButtonGroup, ButtonToolbar, Table, Tab, Form, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideoCamera, faShareNodes, faDownload, faFileAudio, faUser, faLocation, faClock, faPerson, faArrowLeft, faAngleRight, faBook, faMessage } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faFacebook, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faPhone, faMapLocationDot, faMapLocation, faAddressCard, faAddressBook } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { serverurl } from '../../providers/ServerUrl';
import '../EventDetail.css';

export const Cart = () => {


    /**********************************************
       POST PROFILE FORM DATA TO THE API
     **********************************************/

       const [buttontext, setButtonText] = useState();
       const [message, setMessage] = useState();
       const [successmessage, setSuccessMessage] = useState();
       const [errormessage, setErrorMessage] = useState();
       const [successmessageremove, setSuccessMessageRemove] = useState();
       const [errormessageremove, setErrorMessageRemove] = useState();

       
       let user = JSON.parse(localStorage.getItem('user'));

       const navigate = useNavigate();


    const [cart, setCart] = useState([]);
    const [totalcart, setCartTotal] = useState(); 

    let storeusersid = user.storeuserone.storeusers_id;


    const fetchCartData = () => {
        return axios.get(serverurl+"/api/storecart/" + storeusersid)
            .then((response) => setCart(response.data['carts']))
            
    };

    const fetchCartTotalData = () => {
        return axios.get(serverurl+"/api/storecart/" + storeusersid)
            .then((response) => setCartTotal(response.data['totalcarts']));
            
    };

    useEffect(() => {
        fetchCartData();
        fetchCartTotalData();
    }, []);


    const [storecartsqty, setCartQty] = useState();

   // const [cartprice, setCartPrice] = useState();

    const handleChange = (e) => {
        setCartQty(e.target.value);
        setSuccessMessage("");
    }

    const UpdateCart = async (cartid,productid,productprice) => {
        if (storecartsqty === "" || storecartsqty <=0) {
            setErrorMessage("Quantity must be a valid number");
            
        } 
        else {
            try {
                const storecarts_id = cartid;
                const storeproductsid = productid;
                const storeproductsprice = productprice;

                
                
                const items = { storeusersid, storeproductsid, storecartsqty, storeproductsprice}; 
                //console.warn(items);
                const result = await axios.post(serverurl + "/api/storecartupdateone", items);
                if(result.data.status == true) {
                    
                    setErrorMessage("");
                    setSuccessMessage("Cart Updated Successfully");
                    fetchCartData();
                    fetchCartTotalData();
                } 

                console.warn(result.data);

            } catch (error) {
                setErrorMessage("No update was effected");
                console.log(error);
            }
        }
    };


    const RemoveCart = async (cartsid) => {
            try {
                const storecartsid = cartsid;                
                
                const items = { storecartsid }; 
                //console.warn(items);
                const result = await axios.post(serverurl + "/api/storecartdeleteone", items);
                if(result.data.status == true) {
                    
                    setErrorMessage("");
                    setSuccessMessageRemove("Cart Removed Successfully");
                    setErrorMessage("");
                    fetchCartData();
                    fetchCartTotalData();
                } 

                console.warn(result.data);

            } catch (error) {
                setErrorMessageRemove("!!Sorry, an error occured. Try again " + error.message);
                setSuccessMessageRemove("");
                setSuccessMessage("");
                console.log(error);
            }
    };
   


    return (
        <div>

           <br></br><br></br><br></br>
           {
            localStorage.getItem('user') ?
            <>
            <Container style={{ marginTop:'150px' }}>
                <Row>
                    <br></br><br></br><br></br>
                    <Col sm={12}>
                        {
                        errormessage ?
                        <div className='alert alert-danger'>{errormessage}</div>:''
                        }
                        {
                        successmessage ?
                        <div className='alert alert-success'>{successmessage}</div>:''
                        }
                        {
                        errormessageremove ?
                        <div className='alert alert-danger'>{errormessageremove}</div>:''
                        }
                        {
                        successmessageremove ?
                        <div className='alert alert-success'>{successmessageremove}</div>:''
                        }
                        <Tab.Container id="mytabs" defaultActiveKey="cart" className="mytabs">
                            <Nav fill variant="tabs">
                            <Nav.Item className='tabitems'>
                                <Nav.Link eventKey="cart" className='tablink' style={{ color: '#fff' }}>Cart</Nav.Link>
                            </Nav.Item>
                            </Nav>
                            <Tab.Pane eventKey="cart">
                            <div>
                            <br></br>
                            <Container>
                                <Row> 
                                    <br></br>
                                    <Table Table striped bordered hover size="xs" id='tablecart'>
                                        <thead>
                                        <tr>
                                            <th>Product Name</th>
                                            <th>Qty</th>
                                            <th>Price($)</th>
                                            <th>Total($)</th>
                                            <th>Actions</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                             
                                    {
                                        cart && cart.length > 0 && cart.map((cartData) => {
                                            return <>
                                             
                                                    <tr>
                                                        <td>{cartData.productsname}</td>
                                                        <td>
                                                            <Form.Control 
                                                              type='text'
                                                              defaultValue={cartData.storecarts_qty}
                                                              onChange={handleChange}
                                                            />
                                                            
                                                            
                                                        </td>
                                                        <td>{cartData.storeproductsprice}</td>
                                                        <td>
                                                            {

                                                               cartData.storecarts_totalprice
                                                            }
                                                        </td>
                                                        <td>
                                                           <Button className='btn btn-primary btn-sm'
                                                            onClick={
                                                            () => {UpdateCart(cartData.storecarts_id,cartData.storeproductsid,cartData.storeproductsprice)}
                                                            }>
                                                             Update
                                                           </Button>
                                                           &nbsp;&nbsp;&nbsp;
                                                           <Button className='btn btn-danger btn-sm'
                                                           onClick={
                                                            () => {RemoveCart(cartData.storecarts_id)}
                                                            }
                                                           >Remove
                                                           </Button>
                                                        </td>
                                                    </tr>
                                                
                                            </>
                                        })
                                      }
                                       <tr>
                                        <td colSpan={3}>Total Amount</td>    
                                        <td>{totalcart}</td>
                                       </tr>
                                       <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>
                                          <Link to="/product" className='btn btn-danger' style={{ borderRadius: '5px', backgroundColor: 'red', fontWeight: '700', fontSize: '15px', color:'#fff' }}>Continue Shopping</Link>
                                        </td>
                                        <td>
                                          <Link to="/checkout" className='btn btn-danger' style={{ borderRadius: '5px', backgroundColor: 'red', fontWeight: '700', fontSize: '15px', color:'#fff' }}>Check Out</Link>
                                        </td>
                                       </tr>
                                        </tbody>
                                        </Table>
                                                               
                                </Row>
                            </Container>
                            </div>
                            </Tab.Pane>

                        </Tab.Container>

                        <br></br><br></br>

                    </Col>

                    
                </Row>

            </Container>
            </>: null
           }

            <br></br><br></br>
        </div> 
    )
}
