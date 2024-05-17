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
import './CheckOut.css';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

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
        parseInt(localStorage.setItem('storeusers_fname', storeusers_fname));
        localStorage.setItem('storeusers_lname', storeusers_lname);
        localStorage.setItem('storeusers_email', storeusers_email);
        localStorage.setItem('storeusers_pnum', storeusers_pnum);
        localStorage.setItem('storeusers_gender', storeusers_gender);
        localStorage.setItem('storeusers_state', storeusers_state);
        localStorage.setItem('storeusers_country', storeusers_country);
        localStorage.setItem('storeusers_address', storeusers_address);
        localStorage.setItem('storeusers_deliv', storeusers_deliv);
        localStorage.setItem('storeorders_total', totalcart);
    }, [storeusers_fname,storeusers_lname,storeusers_email,
        storeusers_pnum,storeusers_gender,storeusers_state,storeusers_country,
        storeusers_address,storeusers_deliv]);



    const OnCheckForEmptyValues = (data, actions) => {
        if(storeusers_state === null || storeusers_country === null || storeusers_address === null || storeusers_deliv === null) {
           setErrorMessage("All Field Are Required");

           return actions.reject();
        } else {
           return actions.resolve();
        }
    }

    const onCreateOrder = (data, actions) => {
     const storeorders_total = parseInt(localStorage.getItem('storeorders_total'));
     return actions.order.create({
         purchase_units: [{
           amount: {
             currency_code: 'USD',
             value: storeorders_total,
           },
         }],
         // application_context: {
           // shipping_preference: "NO_SHIPPING", // default is "GET_FROM_FILE"
          //},
       });

       
    }


    const onApproveOrder  = (data, actions) => {
        // Capture the funds from the transaction
        return actions.order.capture().then(function(details) {

         const storeorders_total = parseInt(localStorage.getItem('storeorders_total'));
         const storeusers_fname = localStorage.getItem('storeusers_fname');
         const storeusers_lname = localStorage.getItem('storeusers_lname');
         const storeusers_email = localStorage.getItem('storeusers_email');
         const storeusers_pnum = localStorage.getItem('storeusers_pnum');
         const storeusers_gender = localStorage.getItem('storeusers_gender');
         const storeusers_state = localStorage.getItem('storeusers_state');
         const storeusers_country = localStorage.getItem('storeusers_country');
         const storeusers_address = localStorage.getItem('storeusers_address');
         const storeusers_deliv = localStorage.getItem('storeusers_deliv');

         const { payer } = details; 
         // Show a success message to your buyer

         const storeorders_type = "Online";
         const storeorders_status = "Paid";
        
         const storeorders_refid = details.id;                
         const item = { storeorders_total, storeusers_fname, storeusers_lname, storeusers_email, storeusers_pnum, storeusers_gender, storeusers_state, storeusers_country,storeusers_address,storeusers_deliv, storeorders_refid,storeorders_type,storeorders_status, storeusersid };
         
         axios.post(serverurl + "/api/storeorder/" + storeusersid, item).then(res => {               
                 setSuccessMessage(true);
                 setErrorMessage(false);
                 navigate('/success');
         });
             

       });
    }

    const onError = (error) => {
        localStorage.removeItem('storeusers_state');
        localStorage.removeItem('storeusers_country');
        localStorage.removeItem('storeusers_address');
        localStorage.removeItem('storeusers_deliv');
       setErrorMessage("All Fields Are Required and Must Be Valid");
       setSuccessMessage(false);
    }

    const onCancel = () => {
       localStorage.removeItem('storeusers_state');
       localStorage.removeItem('storeusers_country');
       localStorage.removeItem('storeusers_address');
       localStorage.removeItem('storeusers_deliv');
     setErrorMessage("You cancelled the transaction");
     setSuccessMessage(false);
    }

    const [showpaypal, setShowPaypal] = useState(false);
    const [showcash, setShowCash] = useState(false);
    const [paymentplatform, setPaymentPlatform] = useState();
 
    const handleSelectChange = (e) => {
      setPaymentPlatform(e.target.value);
      if(e.target.value === "Paypal") {
          setShowPaypal(true);
          setShowCash(false);
      } else if(e.target.value === "Cash")  {
          setShowPaypal(false);
          setShowCash(true);
      } else {
          setShowPaypal(false);
          setShowCash(false);

      }
   }



 
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
                        successmessage ?
                        <div className='alert alert-success'>Order placed successfully</div>:''
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
                                        <td colSpan={3}>Total Amount To Pay</td>    
                                        <td>{totalcart}</td>
                                       </tr>
                                       <tr>
                                        <td></td>
                                        
                                        <td>
                                        </td>
                                       </tr>
                                        </tbody>
                                        </Table>
                                      <div>
                                      <InputGroup style={{display:'none'}}>
                                        <Form.Select type="text" size="lg" style={{ fontSize: '16px', padding: '15px' }}
                                                value={paymentplatform} onChange={handleSelectChange} required id=''>
                                                <option value=''>Select Payment Platform</option>
                                                <option value='Paypal'>PayPal</option>
                                                <option value='Cash'>Cash</option>
                                                
                                        </Form.Select>   
                                                                      
                                        </InputGroup>
                                              {
                                               errormessage ?
                                               <div className='alert alert-danger'>{errormessage}</div>:''
                                              } 

                                           <br></br><br></br>
          
                                            <PayPalScriptProvider 
                                            options={{ clientId: "AcsILzIwRTitCuyvWbiloGt4jh1Li8s7s24KF5EEoOylTMA83IGvs4pXA0B5AdOlUJJhuE1jVOJJk9zH" }}><PayPalButtons
                                           
                                            onClick={OnCheckForEmptyValues}
                                            createOrder={onCreateOrder}
                                            onApprove={onApproveOrder}
                                            onError={onError}
                                            onCancel={onCancel}

                                            style={{
                                                tagline: false,
                                                color: 'black',
                                                layout:'vertical',
                                                label: 'pay',
                                            }}
                                            
                                                
                                            /></PayPalScriptProvider>
                                            <br></br>
                                              
                                              {
                                                showcash ? 
                                                (
                                                <div className='alert alert-success' style={{ fontWeight:'bold' }}>
                                                    Pay With Cash
                                                </div>
                                                ) : ''
                                              }
                                      </div>
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
