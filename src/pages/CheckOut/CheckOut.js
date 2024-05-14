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

export const CheckOut = () => { 


    /**********************************************
       POST PROFILE FORM DATA TO THE API
     **********************************************/

       let user = JSON.parse(localStorage.getItem('user'));

       const [buttontext, setButtonText] = useState();
       const [message, setMessage] = useState();
       const [errormessage, setErrorMessage] = useState();
       const [successmessage, setSuccessMessage] = useState();

       const [storeusers_fname, setStoreUsersFName] = useState(user.storeuserone.storeusers_fname);
       const [storeusers_lname, setStoreUsersLName] = useState(user.storeuserone.storeusers_lname);
       const [storeusers_gender, setStoreUsersGender] = useState(user.storeuserone.storeusers_gender);
       const [storeusers_email, setStoreUsersEmail] = useState(user.storeuserone.storeusers_email);
       const [storeusers_pnum, setStoreUsersPnum] = useState(user.storeuserone.storeusers_pnum);
       const [storeusers_country, setStoreUsersCountry] = useState();
       const [storeusers_address, setStoreUsersAddress] = useState();
       const [storeusers_state, setStoreUsersState] = useState();
       const [storeusers_deliv, setStoreUsersDeliv] = useState();
    

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

    const Pay = async (cartid,productid,productprice) => {
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
                        <Tab.Container id="mytabs" defaultActiveKey="cart" className="mytabs">
                            <Nav fill variant="tabs">
                            <Nav.Item className='tabitems'>
                                <Nav.Link eventKey="cart" className='tablink' style={{ color: '#fff' }}>Billing Details</Nav.Link>
                            </Nav.Item>
                            </Nav>
                            <Tab.Pane eventKey="cart">
                            <div>
                            <br></br>
                            <Container>
                                <Row> 
                                <Col>
                                <Card id="deptcard" style={{ marginTop:'25px' }}>
                                <Card.Body>
                                    <Form>

                                      <Container>
                                        <Row style={{ display:'none' }}>
                                            <Col>
                                                <InputGroup className="mb-3" controlId="">
                                                    <Form.Control type="text" size="lg" placeholder="First Name" style={{ fontSize: '16px', padding: '15px' }}
                                                        value={storeusers_fname} onChange={(e) => setStoreUsersFName(e.target.value)} />
                                                </InputGroup>
                                            </Col>
                                          </Row>
                                          <Row style={{ display:'none' }}>
                                            <Col>
                                                <InputGroup className="mb-3" controlId="">
                                                    <Form.Control type="text" size="lg" placeholder="Last Name" style={{ fontSize: '16px', padding: '15px' }}
                                                        value={storeusers_lname} onChange={(e) => setStoreUsersLName(e.target.value)} />
                                                </InputGroup>
                                            </Col>
                                        </Row>
                                        <Row style={{ display:'none' }}>
                                            <Col>
                                                <InputGroup className="mb-3" controlId="">
                                                    <Form.Select type="text" size="lg" style={{ fontSize: '16px', padding: '15px' }}
                                                        value={storeusers_gender} onChange={(e) => setStoreUsersGender(e.target.value)} >
                                                        <option value=''>Gender</option>
                                                        <option value="Male">Male</option>
                                                        <option value="Female">Female</option>
                                                    </Form.Select>
                                                </InputGroup>
                                            </Col>
                                        </Row>
                                        <Row style={{ display:'none' }}>
                                            <Col>
                                                <InputGroup className="mb-3" controlId="">
                                                    <Form.Control type="text" size="lg" placeholder="Phone Number" style={{ fontSize: '16px', padding: '15px' }}
                                                        value={storeusers_pnum} onChange={(e) => setStoreUsersPnum(e.target.value)} />
                                                </InputGroup>
                                            </Col>
                                            <Col>
                                                <InputGroup className="mb-3" controlId="">
                                                    <Form.Control type="text" size="lg" placeholder="Email Address" style={{ fontSize: '16px', padding: '15px' }}
                                                        value={storeusers_email} onChange={(e) => setStoreUsersEmail(e.target.value)} />
                                                </InputGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <InputGroup className="mb-3" controlId="">
                                                    <Form.Control type="text" size="lg" placeholder="Country" style={{ fontSize: '16px', padding: '15px' }}
                                                        value={storeusers_country} onChange={(e) => setStoreUsersCountry(e.target.value)} />
                                                </InputGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <InputGroup className="mb-3" controlId="">
                                                    <Form.Control type="text" size="lg" placeholder="Address" style={{ fontSize: '16px', padding: '15px' }}
                                                        value={storeusers_address} onChange={(e) => setStoreUsersAddress(e.target.value)} />
                                                </InputGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <InputGroup className="mb-3" controlId="">
                                                    <Form.Control type="text" size="lg" placeholder="State" style={{ fontSize: '16px', padding: '15px' }}
                                                        value={storeusers_state} 
                                                        onChange={(e) => setStoreUsersState(e.target.value)} />
                                                </InputGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <InputGroup className="mb-3" controlId="">
                                                    <Form.Control type="text" size="lg" placeholder="Place of Delivery" style={{ fontSize: '16px', padding: '15px' }}
                                                        value={storeusers_deliv} 
                                                        onChange={(e) => setStoreUsersDeliv(e.target.value)} />
                                                </InputGroup>
                                            </Col>
                                        </Row>
                                    </Container>





                                    </Form>
                                    <br></br>
                                    
                                </Card.Body>
                            </Card>
                             </Col>
                                <Col>
                                    <br></br>
                              <Card id="deptcard">
                                <Card.Body>
                                    <Table Table striped bordered hover size="xs" id='tablecart'>
                                        <thead>
                                        <tr>
                                            <th>Book Name</th>
                                            <th>Qty</th>
                                            <th>Price($)</th>
                                            <th>Total($)</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                             
                                    {
                                        cart && cart.length > 0 && cart.map((cartData) => {
                                            return <>
                                             
                                                    <tr>
                                                        <td>{cartData.productsname}</td>
                                                        <td>
                                                            {cartData.storecarts_qty}
                                                        </td>
                                                        <td>{cartData.storeproductsprice}</td>
                                                        <td>
                                                            {

                                                               cartData.storecarts_totalprice
                                                            }
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
                                        
                                        <td>
                                          <Link to="/checkout" className='btn btn-danger' style={{ borderRadius: '5px', backgroundColor: 'red', fontWeight: '700', fontSize: '15px', color:'#fff' }}> PAY WITH PAYPAL</Link>
                                        </td>
                                       </tr>
                                        </tbody>
                                        </Table>
                                    </Card.Body>
                                  </Card>
                                 </Col>
                                                               
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
