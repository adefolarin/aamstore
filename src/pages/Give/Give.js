import { React, useEffect, useState } from 'react'
import { Card, Image, InputGroup } from 'react-bootstrap';
import { Link, useLocation, useSearchParams, useNavigate } from 'react-router-dom';
import { Container, Col, Row, Button, ButtonGroup, ButtonToolbar, Table, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideoCamera, faShareNodes, faDownload, faFileAudio, faUser, faLocation, faClock, faPerson, faArrowLeft, faAngleRight, faBook, faMessage } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faFacebook, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faPhone, faMapLocationDot, faMapLocation, faAddressCard, faAddressBook } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { serverurl } from '../../providers/ServerUrl';
//import ReactDOM from "react-dom";
import './Give.css';

import { useSignal } from '@preact/signals-react';

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { PaymentImages } from '../../components/PaymentImages';


export const Give = () => {


     /**********************************************
       GET GIVING CATEGORY DATA FROM THE API
     **********************************************/

     const [givingcategory, setGivingCategory] = useState();


    const fetchGivingCategoryData = () => {
        return axios.get(serverurl + "/api/givingcategory")
            .then((response) => setGivingCategory(response.data['givingcategories']));

    };

    useEffect(() => {
        fetchGivingCategoryData();
    }, [])


    /**********************************************
       POST CONTACT FORM DATA TO THE API
     **********************************************/
       const [show, setShow] = useState(false);
       const [success, setSuccess] = useState(false);
       const [errormessages, setErrorMessages] = useState('');
       const [orderid, setOrderId] = useState(false);
   
       const [givings_name, setGiveName] = useState();
       const [givings_email, setGiveEmail] = useState();
       const [givings_pnum, setGivePnum] = useState();
       const [givings_type, setGiveCategory] = useState();
       const [givings_amount, setGiveAmount] = useState();

       const givingsstatus = "Paid";

       //const givings_amount  = useSignal();

       const handleInputChange = (e) => {
          setGiveAmount(e.target.value);
       }

      useEffect(() => {
        parseInt(localStorage.setItem('givings_amount', givings_amount));
        localStorage.setItem('givings_name', givings_name);
        localStorage.setItem('givings_email', givings_email);
        localStorage.setItem('givings_pnum', givings_pnum);
        localStorage.setItem('givings_type', givings_type);
      }, [givings_amount,givings_name,givings_email,givings_pnum,givings_type]);
      
        

       //const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });
   
       const navigate = useNavigate();

       const OnCheckForEmptyValues = (data, actions) => {
           if(givings_name === null || givings_email === null || givings_pnum === null || givings_type === null  || givings_amount === null ) {
              setErrorMessages("All Field Are Required");

              return actions.reject();
           } else {
              return actions.resolve();
           }
       }

       const onCreateOrder = (data, actions) => {
        const givings_amount = parseInt(localStorage.getItem('givings_amount'));
        return actions.order.create({
            purchase_units: [{
              amount: {
                currency_code: 'USD',
                value: givings_amount,
              },
            }],
            // application_context: {
              // shipping_preference: "NO_SHIPPING", // default is "GET_FROM_FILE"
             //},
          });

          
       }

       /*const givings_name = "Sam Tomi";
       const givings_email = "sam@gmail.com";
       const givings_pnum = "0903030303";
       const givings_type = "Offering";
       const givings_amount = 350;
       const givings_reference = "34556";
       const givings_status =  "Paid";*/

       const onApproveOrder  = (data, actions) => {
           // Capture the funds from the transaction
           return actions.order.capture().then(function(details) {

            const givingsamount = parseInt(localStorage.getItem('givings_amount'));
            const givingsname = localStorage.getItem('givings_name');
            const givingsemail = localStorage.getItem('givings_email');
            const givingspnum = localStorage.getItem('givings_pnum');
            const givingstype = localStorage.getItem('givings_type');

            const { payer } = details; 
            // Show a success message to your buyer
           
            const givingsreference = details.id;                
            const item = { givingsname, givingsemail, givingspnum, givingstype, givingsamount, givingsreference, givingsstatus };
            
            axios.post(serverurl + "/api/giving", item).then(res => {               
                    setSuccess(true);
            });
                

            // OPTIONAL: Call your server to save the transaction
            /*return fetch(serverurl + "/api/giving", {
                method: "post",
                body: JSON.stringify({
                    givings_name: "Sam Tomi",
                    givings_email: "sam@gmail.com",
                    givings_pnum: "0903030303",
                    givings_type: "Offering",
                    givings_amount: 350,
                    givings_reference: "34556",
                    givings_status: "Paid",
                })
            });*/

          });
       }

       const onError = (error) => {
          setErrorMessages("All Fields Are Required and Must Be Valid");
       }

       const onCancel = () => {
        setErrorMessages("You cancelled the transaction");
      }

      const [showpaypal, setShowPaypal] = useState(false);
      const [showzelle, setShowZelle] = useState(false);
      const [paymentplatform, setPaymentPlatform] = useState();

      const handleSelectChange = (e) => {
        setPaymentPlatform(e.target.value);
        if(e.target.value === "paypal") {
            setShowPaypal(true);
            setShowZelle(false);
        } else if(e.target.value === "zelle")  {
            setShowPaypal(false);
            setShowZelle(true);
        } else {
            setShowPaypal(false);
            setShowZelle(false);

        }
     }

   

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
                                <Link to="/give" reloadDocument className='text-white' id="currentlink">Give</Link>
                            </p>
                            <h4>Give</h4>
                        </div>
                    </div>
                </div>
            </div>

            <br></br>

            <div>
                <Container>
                    <Row>
                        <Col md={12}>
                            <Card id="deptcard" className="eventdetailimg">
                                <Card.Img id="foodbankimg" variant="top" src="images/givebanner.png" thumbnail />
                            </Card>
                        </Col>
                    </Row>
                    <br></br><br></br>
                </Container>
            </div>
            <br></br><br></br>
            <div>
                <Container>
                    <Row>
                        <Col md={3}></Col>
                        <Col md={6}>
                            <Card id="deptcard" className='givecard'>
                                <Card.Body>
                                    <Form>

                                    <InputGroup className="mb-3" controlId="">
                                            <Form.Control type="text" size="lg" placeholder="Enter Amount" name="givings_amount" id='giveformid'
                                                value={givings_amount} 
                                                onChange={handleInputChange} required />
                                    </InputGroup>
                                  <br></br>
                                   <div className='text-center'>
                                    <ButtonGroup className="me-2" aria-label="First group">
                                        <Link to="#" className='btn btn-danger' id="givebtn">
                                            $50
                                        </Link>
                                    </ButtonGroup>
                                    <ButtonGroup className="me-2" aria-label="Second group">
                                        <Link to="#" className='btn btn-danger' id="givebtn">
                                            $100
                                        </Link>

                                    </ButtonGroup>
                                    <ButtonGroup className="me-2" aria-label="Second group">
                                        <Link to="#" className='btn btn-danger' id="givebtn">
                                            $1000
                                        </Link>
                                    </ButtonGroup>
                                   </div>
                            
                                <br></br><br></br>
                                <div className='text-center'>
                                    <ButtonGroup className="me-2" aria-label="Second group">
                                        <Link to="#" className='btn btn-danger' id="givebtn">
                                            $200
                                        </Link>
                                    </ButtonGroup>
                                    <ButtonGroup className="me-2" aria-label="Second group">
                                        <Link to="#" className='btn btn-danger' id="givebtn">
                                            $500
                                        </Link>
                                    </ButtonGroup>
                                    <ButtonGroup className="me-2" aria-label="Second group">
                                        <Link to="#" className='btn btn-danger' id="givebtn">
                                            $10000
                                        </Link>
                                    </ButtonGroup>
                                </div>
                                <br></br>
                                      {
                                       showzelle === false ?
                                       <div>
                                       <InputGroup className="mb-3" controlId="">
                                            <Form.Control type="text" size="lg" placeholder="Full Name" style={{ fontSize: '16px', padding: '15px' }}
                                                value={givings_name} onChange={(e) => setGiveName(e.target.value)} required id='giveformid'/>
                                        </InputGroup>

                                        <InputGroup className="mb-3" controlId="">      
                                            <Form.Control type="email" size="lg" placeholder="Email" style={{ fontSize: '16px', padding: '15px' }}
                                                value={givings_email} onChange={(e) => setGiveEmail(e.target.value)} required id='giveformid'/>
                                      
                                        </InputGroup>

                                        <InputGroup className="mb-3" controlId="">
                                            <Form.Control type="text" size="lg" placeholder="Pnone Number" style={{ fontSize: '16px', padding: '15px' }}
                                                value={givings_pnum} onChange={(e) => setGivePnum(e.target.value)} required id='giveformid'/>
                                        </InputGroup>

                                        
                                        <InputGroup>
                                        <Form.Select type="text" size="lg" style={{ fontSize: '16px', padding: '15px' }}
                                                value={givings_type} onChange={(e) => setGiveCategory(e.target.value)} required id='giveformid'>
                                                <option value=''>Select Giving Category</option>
                                                {
                                                givingcategory && givingcategory.length > 0 && givingcategory.map((givingCatData, index) => {
                                                   return <>
                                                      <option value={givingCatData.givingcategories_name}>
                                                        {givingCatData.givingcategories_name}
                                                      </option>
                                                   </>
                                                })
                                               
                                                }
                                        </Form.Select>
                                        </InputGroup>
                                        </div> : ''
                                        }
                                        

                                         <br></br>
                                        <InputGroup>
                                        <Form.Select type="text" size="lg" style={{ fontSize: '16px', padding: '15px' }}
                                                value={paymentplatform} onChange={handleSelectChange} required id='giveformid'>
                                                <option value=''>Select Payment Platform</option>
                                                <option value='paypal'>PayPal</option>
                                                <option value='zelle'>Zelle</option>
                                                
                                        </Form.Select>
                                        </InputGroup>
                                        <br></br>

                                     

                                    </Form>

                          

                                    <div>

                                    {
                                    success ? 
                                    (
                                      <div className='alert alert-success'>Payment made successfully</div>
                                    ) :
                                    errormessages === '' ?
                                    (
                                         ''
                                    ) :   <div className='alert alert-danger'>{errormessages}</div>
                                    }

                                    </div>


                                    <div>

                                    {
                                    showzelle ? 
                                    (
                                    <div className='alert alert-success' style={{ fontWeight:'bold' }}>
                                        Make the payment of ${givings_amount} to following Zelle account: donation@kccconline.org
                                    </div>
                                    ) : ''
                                    }

                                    </div>

            
                                    {/*<PayPalButton
                                        createOrder={(data,actions) => createOrder(data, actions)}
                                        onApprove={(data,actions) => onApprove(data, actions)}
                                     />*/}

                                <PayPalScriptProvider 
                                options={{ clientId: "AcsILzIwRTitCuyvWbiloGt4jh1Li8s7s24KF5EEoOylTMA83IGvs4pXA0B5AdOlUJJhuE1jVOJJk9zH" }}><PayPalButtons
                                       className={showpaypal ? 'paypalbuttonshow' : 'paypalbuttonhide'} 
                                       onClick={OnCheckForEmptyValues}
                                       createOrder={onCreateOrder}
                                       onApprove={onApproveOrder}
                                       onError={onError}
                                       onCancel={onCancel}

                                       style={{
                                        tagline: false,
                                        color: 'blue',
                                        layout:'vertical',
                                        label: 'pay',
                                     }}
                                      
                                        
                                    /></PayPalScriptProvider>
                                    
                                       
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={3}></Col>
                    </Row>
                </Container>
            </div>

 
            <br></br><br></br><br></br>


            <div>
              <PaymentImages />
            </div>

            <br></br><br></br>



        </div >
    )
}
