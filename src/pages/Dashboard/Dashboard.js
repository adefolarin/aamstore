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
import '../EventDetail.css';

export const Dashboard = () => {


    /**********************************************
       POST CONTACT FORM DATA TO THE API
     **********************************************/

       const [buttontext, setButtonText] = useState('Send');
       const [message, setMessageText] = useState();
       const [successmessage, setSuccessMessage] = useState();
       const [errormessage, setErrorMessage] = useState();
   
       const [contact_name, setContactName] = useState();
       const [contact_email, setContactEmail] = useState();
       const [contact_pnum, setContactPnum] = useState();
       const [contact_subject, setContactSubject] = useState();
       const [contact_message, setContactMessage] = useState();
   
       const navigate = useNavigate();
   
       const Save = async () => {
           setButtonText("Processing");
           if(contact_name === "" || contact_email === "" || contact_pnum === "" || contact_subject === "" || contact_message === "") {
               setMessageText("error");
               setErrorMessage("All Fields are Required");
               setButtonText("Send");
           } else {
           try {
                         
               const items = { contact_name, contact_email, contact_pnum, contact_subject, contact_message };
               //console.warn(items);
               const result = await axios.post(serverurl + "/api/contact", items);
               setMessageText("success");
               setSuccessMessage(result.data.message);
               setButtonText("Send");
               console.warn(result);
           
           } catch (error) {
               setMessageText("error");
               setErrorMessage("!!Sorry, Your Message Could Not Be Processed");
               setButtonText("Send");
               console.log(error);
           }
         }
       };




    let user = JSON.parse(localStorage.getItem('user'));
    return (
        <div>

           <br></br><br></br>
            <Container style={{ marginTop:'150px' }}>
                <Row>
                    <Col md={12}>
                        <div>
                            {
                            localStorage.getItem('user') ?
                            <>
                            <h1>{user.storeuserone.storeusers_fname}</h1>
                            </>: null
                            }
                        </div>
                    </Col>
                </Row>
            </Container>

            <br></br><br></br>
        </div> 
    )
}
