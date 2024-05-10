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
import { ProductCategory } from '../../components/ProductCategories';

export const Category = () => {

    const [productcategories, setProductCategories] = useState([]);

    const [product, setProductsByCat] = useState([]);
    //const [productcatid, setProductCatID] = useState([]);
    const [productall, setProductsAll] = useState([]);

    const fetchProductCategoryData = () => {
        return axios.get(serverurl+"/api/productcategory")
            .then((response) => setProductCategories(response.data['productcategories']));
    };

       
    const search = useLocation().search;
    const productcatid = new URLSearchParams(search).get('productcatid');
    const productcatname = new URLSearchParams(search).get('productcatname');
    

    const fetchProductByCatData = () => {
        return axios.get(serverurl+"/api/productbycats/" + productcatid)
            .then((response) => setProductsByCat(response.data['products']));
            
    };

    /*const fetchProductAll = () => {
        return axios.get(serverurl+"/api/product")
            .then((response) => setProductsAll(response.data['products']));
            
    };*/

    useEffect(() => {
        fetchProductCategoryData();
        fetchProductByCatData();
        //fetchProductAll();


     },[]);



     
      




    return (
        <div>
            <br></br><br></br><br></br><br></br>
            <div>
                <ProductCategory 
                productcategory={productcategories} 
                product={product}
                productcatid={productcatid}
                productcatname={productcatname}/>
             </div>
            <br></br><br></br>
        </div> 
    )
}
