import Container from 'react-bootstrap/Container';
import { useState, useEffect } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Row, Col, Image, ButtonGroup } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faFacebook, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { Carousel } from 'react-bootstrap';
import axios  from 'axios';
import { serverurl } from '../../providers/ServerUrl';

import './NavBar.css';

export function NavBar() {

  const [mynavbar, setMyNavBar] = useState(false);
  const [news, setNews] = useState([])


  const changeBackground = () => {
    if (window.scrollY >= 80) {
      setMyNavBar(true);
    } else {
      setMyNavBar(false);
    }
  }


  window.addEventListener('scroll', changeBackground);

  const fetchNewsData = () => {
    return axios.get(serverurl+"/api/news")
        .then((response) => setNews(response.data['news']));
  };

  useEffect(() => {
    fetchNewsData();

 },[]);

 
 //let user = JSON.parse(localStorage.getItem('user'));
 const navigate = useNavigate();
  return (

    <>
      <div className="sub-header" id="sub-header">
        <Container>
          <Row>
            <Col sm={8}>
               <p style={{ color: '#fff', margin: '0px', textAlign:'left' }} id="subheadernews">
                    <ButtonGroup className="me-2" aria-label="First group">
                        <Link to="#" className='btn btn-danger' id="socialbtnnav">
                            <FontAwesomeIcon icon={faFacebook} />
                        </Link>
                    </ButtonGroup>
                    <ButtonGroup className="me-2" aria-label="Second group">
                        <Link to="#" className='btn btn-danger' id="socialbtnnav">
                            <FontAwesomeIcon icon={faInstagram} />
                        </Link>

                    </ButtonGroup>
                    <ButtonGroup className="me-2" aria-label="Second group">
                        <Link to="#" className='btn btn-danger' id="socialbtnnav">
                            <FontAwesomeIcon icon={faTwitter} />
                        </Link>
                    </ButtonGroup>
                    <ButtonGroup className="me-2" aria-label="Second group">
                        <Link to="#" className='btn btn-danger' id="socialbtnnav">
                            <FontAwesomeIcon icon={faYoutube} />
                        </Link>
                    </ButtonGroup>

                </p>
            </Col>

            <Col sm={4}>
              <p style={{ margin: '0px' }} id="subheaderlink">
                {
                  localStorage.getItem('user') ?
                  <>
                  <ButtonGroup className="me-2" aria-label="First group">
                    <Link to="/dashboard" className='btn btn-danger' id="subheaderbtn" reloadDocument>
                      Dashboard</Link>
                  </ButtonGroup>
                  <ButtonGroup className="me-2" aria-label="First group">
                    <Link to="/logout" className='btn btn-danger' id="subheaderbtn" reloadDocument>Logout</Link>
                  </ButtonGroup>
                  </>:
                  <>
                   <ButtonGroup className="me-2" aria-label="First group">
                    <Link to="/signup" className='btn btn-danger' id="subheaderbtn" reloadDocument>Register</Link>
                  </ButtonGroup>
                  <ButtonGroup className="me-2" aria-label="First group">
                    <Link to="/login" className='btn btn-danger' id="subheaderbtn" reloadDocument>Login</Link>
                  </ButtonGroup>
                  </>
                }
              </p>
            </Col>
          </Row>
        </Container>
      </div>


      <div className="navbar-area">
        <Navbar collapseOnSelect expand="lg" style={{ padding: '20px' }}
          className={mynavbar ? 'mynavbar myactive' : 'mynavbar'} fixed='top'>
          <Container className='navbarContainer'>
            <Navbar.Brand href="/">
              <Image fluid src={mynavbar ? "images/logoaam.png" : "images/logoaam.png"}
                id="logo"
                alt="Logo" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" id='mynavbartoggle' />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto" id="me-auto">
                <Nav.Link href="/" className='navLink' id="navLink">HOME</Nav.Link>
                <Nav.Link href="/books" className='navLink' id="navLink">BOOKS</Nav.Link>
                <Nav.Link href="/categories" className='navLink' id="navLink">CATEGORIES</Nav.Link>
                <Nav.Link href="/contact" className='navLink' id="navLink">CONTACT</Nav.Link>
              </Nav>
              <Nav>       
              <Nav.Link href="/product" className='btn btn-primary' style={{ borderRadius: '5px', backgroundColor: 'red', fontWeight: '700', fontSize: '15px', color:'#fff' }} id="givenavlink">ORDER NOW</Nav.Link>
              <Nav.Link href="/cart" className='btn btn-danger' style={{ borderRadius: '50px', backgroundColor: '#135592', fontWeight: '700', fontSize: '15px', color:'#fff' }} id="givenavlink">
                 <FontAwesomeIcon icon={faShoppingCart} />
              </Nav.Link>
              <Nav.Link href="/search" className='btn btn-danger' style={{ borderRadius: '50px', backgroundColor: '#135592', fontWeight: '700', fontSize: '15px', color:'#fff' }} id="givenavlink">
                 <FontAwesomeIcon icon={faSearch} />
              </Nav.Link>
              </Nav>
              
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </>
  );
}

