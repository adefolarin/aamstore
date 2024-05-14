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

export const Dashboard = () => {


    /**********************************************
       POST PROFILE FORM DATA TO THE API
     **********************************************/

       const [buttontext, setButtonText] = useState();
       const [message, setMessage] = useState();
       const [successmessage, setSuccessMessage] = useState();
       const [errormessage, setErrorMessage] = useState();
       const [successmessageremove, setSuccessMessageRemove] = useState();
       const [errormessageremove, setErrorMessageRemove] = useState();

       const [buttontextuser, setButtonTextUser] = useState('UPDATE PROFILE');
       const [messageuser, setMessageTextUser] = useState();
       const [successmessageuser, setSuccessMessageUser] = useState();
       const [errormessageuser, setErrorMessageUser] = useState();

       const [buttontextemail, setButtonTextEmail] = useState('UPDATE EMAIL');
       const [messageemail, setMessageTextEmail] = useState();
       const [successmessageemail, setSuccessMessageEmail] = useState();
       const [errormessageemail, setErrorMessageEmail] = useState();

       const [buttontextpnum, setButtonTextPnum] = useState('UPDATE PHONE NUMBER');
       const [messagepnum, setMessageTextPnum] = useState();
       const [successmessagepnum, setSuccessMessagePnum] = useState();
       const [errormessagepnum, setErrorMessagePnum] = useState();

       const [buttontextpass, setButtonTextPass] = useState('UPDATE PASSWORD');
       const [messagepass, setMessageTextPass] = useState();
       const [successmessagepass, setSuccessMessagePass] = useState();
       const [errormessagepass, setErrorMessagePass] = useState();

       
       let user = JSON.parse(localStorage.getItem('user'));

      let storeusers_id = user.storeuserone.storeusers_id;
      const navigate = useNavigate();

       //const [storeusers_id, setStoreUsersID] = useState(user.storeuserone.storeusers_id);   
       const [storeusers_fname, setStoreUsersFName] = useState(user.storeuserone.storeusers_fname);
       const [storeusers_lname, setStoreUsersLName] = useState(user.storeuserone.storeusers_lname);
       const [storeusers_gender, setStoreUsersGender] = useState(user.storeuserone.storeusers_gender);
       const [storeusers_email, setStoreUsersEmail] = useState(user.storeuserone.storeusers_email);
       const [storeusers_pnum, setStoreUsersPnum] = useState(user.storeuserone.storeusers_pnum);
       const [storeusers_password, setStoreUsersPassword] = useState();
       const [storeuserscurrent_password, setStoreUsersCurrentPassword] = useState();
       const [storeusersconfirm_password, setStoreUsersCpassword] = useState();


     
       

   
       const UpdateUser = async () => {
           setButtonTextUser("Processing");
           if (storeusers_fname === "" || storeusers_lname === "" || storeusers_gender === "") {
               setMessageTextUser("error");
               setErrorMessageUser("All Fields are Required");
               setButtonTextUser("UPDATE PROFILE");
           } 
           else {
               try {
   
                   const items = { storeusers_id, storeusers_fname, storeusers_lname, storeusers_gender };
                   //console.warn(items);
                   const res = await axios.post(serverurl + "/api/storeuserupdateuser", items);
                   if(res.data.status == true) {
                       //localStorage.setItem('user',JSON.stringify(result.data));
                       //console.log(JSON.parse(localStorage.getItem('user'))); 
                       let storeuser = {
                           'storeuserone' : {
                           'storeusers_id' : storeusers_id,
                           'storeusers_fname' : storeusers_fname,
                           'storeusers_lname' : storeusers_lname,
                           'storeusers_gender' : storeusers_gender,
                           'storeusers_email' : user.storeuserone.storeusers_email,
                           'storeusers_pnum' : user.storeuserone.storeusers_pnum,
                           }
                       }
                       localStorage.setItem('user',JSON.stringify(storeuser));
                       console.log(storeuser);                    
                       setMessageTextUser("success");
                       setSuccessMessageUser(res.data.message);
                       setButtonTextUser("UPDATE PROFILE");
                       
                       
                   } else if(res.data.status == false) {
                       setMessageTextUser("error");
                       setErrorMessageUser(res.data.message);
                       setButtonTextUser("UPDATE PROFILE"); 
                   }
                   /*
                   else if(result.data[0]['storeusers_gender'] == 'Gender is required') {
                       setMessageText("error");
                       setErrorMessage('Gender is required');
                       setButtonText("SIGN UP");
                   }
                   */
                   //console.warn(result.data);
   
               } catch (error) {
                   setMessageTextUser("error");
                   setErrorMessageUser("!!Sorry, An Error occured. Try again");
                   setButtonTextUser("UPDATE PROFILE");
                   console.log(error);
               }
           }
       };

       const UpdateEmail = async () => {
        let filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        setButtonTextEmail("Processing");
        if (storeusers_email === "") {
            setMessageTextEmail("error");
            setErrorMessageEmail("All Fields are Required");
            setButtonTextEmail("UPDATE EMAIL");
        } 
        else if(!filter.test(storeusers_email)) {
            setMessageTextEmail("error");
            setErrorMessageEmail("Email is not valid");
            setButtonTextEmail("UPDATE EMAIL");
        }
        else {
            try {

                const items = { storeusers_id, storeusers_email };
                //console.warn(items);
                const result = await axios.post(serverurl + "/api/storeuserupdateemail", items);
                if(result.data.status == true) {
                    let storeuser = {
                        'storeuserone' : {
                        'storeusers_id' : storeusers_id,
                        'storeusers_fname' : user.storeuserone.storeusers_fname,
                        'storeusers_lname' : user.storeuserone.storeusers_lname,
                        'storeusers_gender' : user.storeuserone.storeusers_gender,
                        'storeusers_email' : storeusers_email,
                        'storeusers_pnum' : user.storeuserone.storeusers_pnum,
                        }
                    }
                    localStorage.setItem('user',JSON.stringify(storeuser));
                    setMessageTextEmail("success");
                    setSuccessMessageEmail(result.data.message);
                    setButtonTextEmail("UPDATE EMAIL");
                } else if(result.data.status == false) {
                    setMessageTextEmail("error");
                    setErrorMessageEmail(result.data.message);
                    setButtonTextEmail("UPDATE EMAIL"); 
                }
                else if(result.data[0]['storeusers_email'] == 'Email is required') {
                    setMessageTextEmail("error");
                    setErrorMessageEmail('Email is required');
                    setButtonTextEmail("UPDATE EMAIL");
                }

                console.warn(result.data);

            } catch (error) {
                setMessageTextEmail("error");
                setErrorMessageEmail("!!Sorry, an error occured. Try again");
                setButtonTextEmail("UPDATE EMAIL");
                console.log(error);
            }
        }
    };

    const UpdatePnum = async () => {
        setButtonTextPnum("Processing");
        if (storeusers_pnum === "" ) {
            setMessageTextPnum("error");
            setErrorMessagePnum("All Fields are Required");
            setButtonTextPnum("UPDATE PHONE NUMBER");
        } 
        else {
            try {

                const items = { storeusers_id, storeusers_pnum };
                //console.warn(items);
                const result = await axios.post(serverurl + "/api/storeuserupdatepnum", items);
                if(result.data.status == true) {
                    let storeuser = {
                        'storeuserone' : {
                        'storeusers_id' : storeusers_id,
                        'storeusers_fname' : user.storeuserone.storeusers_fname,
                        'storeusers_lname' : user.storeuserone.storeusers_lname,
                        'storeusers_gender' : user.storeuserone.storeusers_gender,
                        'storeusers_email' : user.storeuserone.storeusers_email,
                        'storeusers_pnum' : storeusers_pnum,
                        }
                    }
                    localStorage.setItem('user',JSON.stringify(storeuser));
                    setMessageTextPnum("success");
                    setSuccessMessagePnum(result.data.message);
                    setButtonTextPnum("UPDATE PHONE NUMBER");
                } else if(result.data.status == false) {
                    setMessageTextPnum("error");
                    setErrorMessagePnum(result.data.message);
                    setButtonTextPnum("UPDATE PHONE NUMBER"); 
                } 
                else if(result.data[0]['storeusers_pnum'] == 'Valid Phone Number is required') {
                    setMessageTextPnum("error");
                    setErrorMessagePnum('Phone Number is required');
                    setButtonTextPnum("UPDATE PHONE NUMBER");
                }

                console.warn(result.data);

            } catch (error) {
                setMessageTextPnum("error");
                setErrorMessagePnum("!!Sorry, an error occured. Try again");
                setButtonTextPnum("UPDATE PHONE NUMBER");
                console.log(error);
            }
        }
    };

    const UpdatePassword = async () => {
        setButtonTextPass("Processing");
        if (storeuserscurrent_password === "" || storeusers_password === "" || storeusersconfirm_password === "") {
            setMessageTextPass("error");
            setErrorMessagePass("All Fields are Required");
            setButtonTextPass("UPDATE PASSWORD");
        } 
        else {
            try {

                const items = { storeusers_id, storeuserscurrent_password, storeusers_password, storeusersconfirm_password };
                //console.warn(items);
                const result = await axios.post(serverurl + "/api/storeuserupdatepassword", items);
                if(result.data.status == true) {
                    setMessageTextPass("success");
                    setSuccessMessagePass(result.data.message);
                    setButtonTextPass("UPDATE PASSWORD");
                } else if(result.data.status == false) {
                    setMessageTextPass("error");
                    setErrorMessagePass(result.data.message);
                    setButtonTextPass("UPDATE PASSWORD"); 
                } else if(result.data[0]['storeusers_password'] == 'Password Cannot Be Less Than 8 characters') {
                    setMessageTextPass("error");
                    setErrorMessagePass('Password Cannot Be Less Than 8 characters');
                    setButtonTextPass("UPDATE PASSWORD");
                }
                else if(result.data[0]['storeusersconfirm_password'] == 'Confirm Password Cannot Be Less Than 8 characters') {
                    setMessageTextPass("error");
                    setErrorMessagePass('Confirm Password Cannot Be Less Than 8 characters');
                    setButtonTextPass("UPDATE PASSWORD");
                }
               
                console.warn(result.data);

            } catch (error) {
                setMessageTextPass("error");
                setErrorMessagePass("!!Sorry, an error occured. Try again");
                setButtonTextPass("UPDATE PASSWORD");
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
                    <Col md={12}>
                        <div>
                            
                            <h4 className='text-center'>Welcome, {user.storeuserone.storeusers_fname + ' ' + user.storeuserone.storeusers_lname}</h4>
                            
                        </div>
                    </Col>
                </Row>
            </Container>

            <Container>
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
                        <Tab.Container id="mytabs" defaultActiveKey="profile" className="mytabs">
                            <Nav fill variant="tabs">
                            <Nav.Item className='tabitems'>
                                <Nav.Link eventKey="profile" className='tablink' style={{ color: '#fff' }}>Profile</Nav.Link>
                            </Nav.Item>
                            <Nav.Item className='tabitems'>
                                <Nav.Link eventKey="transact" className='tablink' style={{ color: '#fff' }}>Transaction History</Nav.Link>
                            </Nav.Item>
                            </Nav>

                            <Tab.Content style={{ marginTop: '20px' }}>
                            <Tab.Pane eventKey="profile">
                            <Card id="deptcard">
                                <Card.Body>
                                    <div>
                                        <Form>

                                        <Container>
                                            <Row>
                                                <Col>
                                                    <InputGroup className="mb-3" controlId="">
                                                        <Form.Control type="text" size="lg" style={{ fontSize: '16px', padding: '15px' }}
                                                            
                                                            value={storeusers_fname} onChange={(e) => setStoreUsersFName(e.target.value)} />
                                                    </InputGroup>
                                                </Col>
                                                <Col>
                                                    <InputGroup className="mb-3" controlId="">
                                                        <Form.Control type="text" size="lg"
                                                            style={{ fontSize: '16px', padding: '15px' }}
                                                           
                                                            value={storeusers_lname} onChange={(e) => setStoreUsersLName(e.target.value)} />
                                                    </InputGroup>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <InputGroup className="mb-3" controlId="">
                                                        <Form.Select type="text" size="lg" style={{ fontSize: '16px', padding: '15px' }}
                                                            value={storeusers_gender} onChange={(e) => setStoreUsersGender(e.target.value)} >
                                                           
                                                            <option value="Male">Male</option>
                                                            <option value="Female">Female</option>
                                                        </Form.Select>
                                                    </InputGroup>
                                                </Col>
                                            </Row>

                                        <div>
                                            {
                                                messageuser === 'success' ?
                                                    <div className='alert alert-success alert-sm'>
                                                        {successmessageuser}
                                                    </div> :
                                                    ''
                                            }

                                            {
                                                messageuser === 'error' ?
                                                    <div className='alert alert-danger alert-sm'>
                                                        {errormessageuser}
                                                    </div> :
                                                    ''
                                            }
                                        </div>
                                        <ButtonToolbar
                                            className="justify-content-between"
                                            aria-label="Toolbar with Button groups"
                                        >

                                            <ButtonGroup className="me-4" aria-label="First group">
                                                {
                                                    buttontextuser === "Processing" ?
                                                        <Button class="btn btn-danger" style={{ backgroundColor: '#135592', color: '#fff', borderRadius: '0', border: 'none', fontWeight: 'bold' }} onClick={UpdateUser}>
                                                            {buttontextuser}
                                                        </Button> :
                                                        ''
                                                }

                                                {
                                                    buttontextuser === "UPDATE PROFILE" ?
                                                        <Button class="btn btn-danger" style={{ backgroundColor: '#135592', color: '#fff', borderRadius: '0', border: 'none', fontWeight: 'bold' }} onClick={UpdateUser}>
                                                            {buttontextuser}
                                                        </Button> :
                                                        ''
                                                }
                                                
                                            </ButtonGroup>
                                                
                                        </ButtonToolbar>
                                        </Container>
                                        </Form>
                                        <br></br><br></br>
                                    </div>
                                    

                                    <div>
                                        <Form>

                                        <Container>
                                            <Row>
                                                <Col>
                                                    <InputGroup className="mb-3" controlId="">
                                                        <Form.Control type="text" size="lg" style={{ fontSize: '16px', padding: '15px' }}
                                                            value={storeusers_email} onChange={(e) => setStoreUsersEmail(e.target.value)} />
                                                    </InputGroup>
                                                </Col>
                                            </Row>

                                        <div>
                                            {
                                                messageemail === 'success' ?
                                                    <div className='alert alert-success alert-sm'>
                                                        {successmessageemail}
                                                    </div> :
                                                    ''
                                            }

                                            {
                                                messageemail === 'error' ?
                                                    <div className='alert alert-danger alert-sm'>
                                                        {errormessageemail}
                                                    </div> :
                                                    ''
                                            }
                                        </div>
                                        <ButtonToolbar
                                            className="justify-content-between"
                                            aria-label="Toolbar with Button groups"
                                        >

                                            <ButtonGroup className="me-4" aria-label="First group">
                                                {
                                                    buttontextemail === "Processing" ?
                                                        <Button class="btn btn-danger" style={{ backgroundColor: '#135592', color: '#fff', borderRadius: '0', border: 'none', fontWeight: 'bold' }} onClick={UpdateEmail}>
                                                            {buttontextemail}
                                                        </Button> :
                                                        ''
                                                }

                                                {
                                                    buttontextemail === "UPDATE EMAIL" ?
                                                        <Button class="btn btn-danger" style={{ backgroundColor: '#135592', color: '#fff', borderRadius: '0', border: 'none', fontWeight: 'bold' }} onClick={UpdateEmail}>
                                                            {buttontextemail}
                                                        </Button> :
                                                        ''
                                                }
                                                
                                            </ButtonGroup>
                                                
                                        </ButtonToolbar>
                                        
                                        </Container>

                                        </Form>
                                        <br></br><br></br>
                                    </div>


                                    <div>
                                        <Form>

                                        <Container>
                                            <Row>
                                                <Col>
                                                    <InputGroup className="mb-3" controlId="">
                                                        <Form.Control type="text" size="lg" style={{ fontSize: '16px', padding: '15px' }}
                                                            value={storeusers_pnum} onChange={(e) => setStoreUsersPnum(e.target.value)} />
                                                    </InputGroup>
                                                </Col>
                                            </Row>

                                        <div>
                                            {
                                                messagepnum === 'success' ?
                                                    <div className='alert alert-success alert-sm'>
                                                        {successmessagepnum}
                                                    </div> :
                                                    ''
                                            }

                                            {
                                                messagepnum === 'error' ?
                                                    <div className='alert alert-danger alert-sm'>
                                                        {errormessagepnum}
                                                    </div> :
                                                    ''
                                            }
                                        </div>
                                        <ButtonToolbar
                                            className="justify-content-between"
                                            aria-label="Toolbar with Button groups"
                                        >

                                            <ButtonGroup className="me-4" aria-label="First group">
                                                {
                                                    buttontextpnum === "Processing" ?
                                                        <Button class="btn btn-danger" style={{ backgroundColor: '#135592', color: '#fff', borderRadius: '0', border: 'none', fontWeight: 'bold' }} onClick={UpdatePnum}>
                                                            {buttontextpnum}
                                                        </Button> :
                                                        ''
                                                }

                                                {
                                                    buttontextpnum === "UPDATE PHONE NUMBER" ?
                                                        <Button class="btn btn-danger" style={{ backgroundColor: '#135592', color: '#fff', borderRadius: '0', border: 'none', fontWeight: 'bold' }} onClick={UpdatePnum}>
                                                            {buttontextpnum}
                                                        </Button> :
                                                        ''
                                                }
                                                
                                            </ButtonGroup>
                                                
                                        </ButtonToolbar>
                                        
                                        </Container>

                                        </Form>
                                        <br></br><br></br>
                                    </div>


                                    <div>
                                        <Form>

                                        <Container>
                                            <Row>
                                                <Col>
                                                    <InputGroup className="mb-3" controlId="">
                                                        <Form.Control type="text" size="lg" style={{ fontSize: '16px', padding: '15px' }}
                                                            placeholder='Current Password'
                                                            value={storeuserscurrent_password} onChange={(e) => setStoreUsersCurrentPassword(e.target.value)} />
                                                    </InputGroup>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <InputGroup className="mb-3" controlId="">
                                                        <Form.Control type="text" size="lg" style={{ fontSize: '16px', padding: '15px' }}
                                                            placeholder='New Password'
                                                            value={storeusers_password} onChange={(e) => setStoreUsersPassword(e.target.value)} />
                                                    </InputGroup>
                                                </Col>
                                                <Col>
                                                    <InputGroup className="mb-3" controlId="">
                                                        <Form.Control type="text" size="lg" style={{ fontSize: '16px', padding: '15px' }}
                                                            placeholder='Confirm Password'
                                                            value={storeusersconfirm_password} onChange={(e) => setStoreUsersCpassword(e.target.value)} />
                                                    </InputGroup>
                                                </Col>
                                            </Row>

                                        <div>
                                            {
                                                messagepass === 'success' ?
                                                    <div className='alert alert-success alert-sm'>
                                                        {successmessagepass}
                                                    </div> :
                                                    ''
                                            }

                                            {
                                                messagepass === 'error' ?
                                                    <div className='alert alert-danger alert-sm'>
                                                        {errormessagepass}
                                                    </div> :
                                                    ''
                                            }
                                        </div>
                                        <ButtonToolbar
                                            className="justify-content-between"
                                            aria-label="Toolbar with Button groups"
                                        >

                                            <ButtonGroup className="me-4" aria-label="First group">
                                                {
                                                    buttontextpass === "Processing" ?
                                                        <Button class="btn btn-danger" style={{ backgroundColor: '#135592', color: '#fff', borderRadius: '0', border: 'none', fontWeight: 'bold' }} onClick={UpdatePassword}>
                                                            {buttontextpass}
                                                        </Button> :
                                                        ''
                                                }

                                                {
                                                    buttontextpass === "UPDATE PASSWORD" ?
                                                        <Button class="btn btn-danger" style={{ backgroundColor: '#135592', color: '#fff', borderRadius: '0', border: 'none', fontWeight: 'bold' }} onClick={UpdatePassword}>
                                                            {buttontextpass}
                                                        </Button> :
                                                        ''
                                                }
                                                
                                            </ButtonGroup>
                                                
                                        </ButtonToolbar>
                                        
                                        </Container>

                                        </Form>
                                        <br></br><br></br>
                                    </div>
                                    
                                </Card.Body>
                            </Card>
                            </Tab.Pane>

                            <Tab.Pane eventKey="transact">
                                Transactions History Comes Here
                            </Tab.Pane>

                            </Tab.Content>
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
