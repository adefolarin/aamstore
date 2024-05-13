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

export const AddCart = async (productid,productprice) => {

    const [storeproductsprice, setProductPrice] = useState();
    const [storeproductsid, setProductID] = useState();
 
    const [message, setMessageText] = useState();
    const [success, setSuccessMessage] = useState();
    const [error, setErrorMessage] = useState();

    let user = JSON.parse(localStorage.getItem('user'));
 


          setProductID(productid); 
          setProductPrice(productprice);
         
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

