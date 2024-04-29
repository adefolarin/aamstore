import React from 'react';
import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Container, Col, Row, Button } from 'react-bootstrap';
import './About.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faBible } from '@fortawesome/free-solid-svg-icons';
import { SocialMedia } from '../../components/SocialMedia';
import { Card } from 'react-bootstrap';


export const About = () => {
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
                <Link to="/about" reloadDocument className='text-white' id="currentlink">About Us</Link>
              </p>
              <h4>About Us</h4>

            </div>
          </div>
        </div>
      </div>
      <br></br><br></br>
      <div>
        <Container>
          <Row>
            <div
              style={{ borderRadius: '0px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)', padding: '20px' }}>
              <Row>
                <Col md={12} id="aboutvidcol">
                  <div className='' id="video">
                    <video controls style={{ width: '100%', height: '100%', margin: 'auto' }}>
                      <source src="videos/aam.mp4" type="video/mp4" />
                    </video>
                  </div>
                </Col>
              </Row>
            </div>
          </Row>
        </Container>
      </div>

      <br></br><br></br>
      <div>
        <Container>
          <Row>
            <Col md={12}>
              <div id="welcome" style={{ borderRadius: '0px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)', padding: '50px' }}>
                <h4 id="bluecolor">WELCOME MESSAGE</h4>
                <p>
                We are a multi-racial church planted by Hands-On World Missions, reaching out to the international communities of Denver metro area of Colorado State. People from at least 18 countries gather together every week to worship the living God in various languages and styles.We are a multi-racial church planted by Hands-On World Missions, reaching out to the international communities of Denver metro area of Colorado State. People from at least 18 countries gather together every week to worship the living God in various languages and styles
                What kind of Church is this?
                </p>

                <p>
                Our belief in God
                We believe there is one living and true God, the self-existent, sovereign, transcendent, perfect, infinite and eternal creator of the universe. He is revealed in the unity of the Godhead as God the Father, God the Son, and God the Holy Spirit, each having a distinct ministry in relation to His creation and His people..
                </p>
                
                <p>
                Our belief in the Word of God
                We believe the Bible, the complete writings of both the Old and New Testaments is the literal Word of God, verbally inspired by the Holy Spirit, inerrant as originally given by God, and infallible as the standard of our faith and practice.
                </p>

                <p>
                Our belief in the nature of man
                Man was originally created in the image and likeness of God but became a sinful creature by personal rebellion against God and perpetuated a sinful nature to all his descendants. Man is universally sinful by nature and by choice. He is void of spiritual life and incapable of saving himself. He stands under the righteous judgment and wrath of God, condemned to a literal, eternal, and fiery hell
                </p>
 
                <p>               
                Our belief in salvation
                Salvation is the free gift of God by grace through faith; it is totally the act of God apart from any work or merit of man.
                </p>

              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/*  About  */}
      <div id="sectionmargin" className='homeabout'>
        <Container>
          <Row>
            <Col md={5}>
              <Image src="images/about.png" thumbnail fluid id="homeaboutimg" />
            </Col>
            <Col md={7}>
              <Row>
                <div style={{ marginTop: '20px' }}></div>
                <Col sm={12}>
                  <h5 id="bluecolor" className='aboutkccc'>About KCCC</h5>
                  <h6>The Wealthy Place Where Champions Are Raised</h6>
                  <p>
                  Kingdom Connection Christian Center is a Word of Faith, non-denominational, full gospel church.

                  </p>
                </Col>
              </Row>
              <Row>
                <div style={{ marginTop: '20px' }}></div>
                <Col sm={12}>
                  <h5 id="bluecolor">
                    <Button style={{ borderRadius: '50px', backgroundColor: 'red', border: 'none' }}>
                      <FontAwesomeIcon icon={faHeart} style={{ color: '#fff', fontSize: '14px' }} />

                    </Button> &nbsp; &nbsp; Our Vision
                  </h5>
                  <p>
                     We believe the Bible, the complete writings of both the Old and New Testaments is the literal Word of God, verbally inspired by the Holy Spirit, inerrant as originally given by God, and infallible as the standard of our faith and practice.
                  </p>
                </Col>
                <Col sm={12}>
                  <br></br>
                  <div id="homeourmission">
                    <h5 id="bluecolor">
                      <Button style={{ borderRadius: '50px', backgroundColor: 'red', border: 'none' }}>
                        <FontAwesomeIcon icon={faBible} style={{ color: '#fff', fontSize: '14px' }} />

                      </Button> &nbsp; &nbsp; Our Mission
                    </h5>
                    <p>
                    Our mission is reaching and harvesting lost souls for Christ and teaching the Body of Christ how to effectively apply God’s principles to have victory in every area of life. Kingdom Connection Christian Center is a church committed to raising champions in the body of Christ. 
                    <br></br><br></br>We are here to serve you and to partner with you in any way that the Lord might be leading us. Get in touch with us and let us take the gospel to the ends of the earth together. As we always say, it’s time for you to “GET CONNECTED"
                    </p>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>

      <br></br>
      <div>
        <SocialMedia />
      </div>

      <br></br>
      <div>
        <Container>
          <Row>
            <Col md={4}><hr style={{ borderTop: '1px solid #848484' }}></hr></Col>
            <Col md={4}>
              <h4 id="bluecolor" class='text-center'>
                <span style={{ color: 'red' }}>MEET THE</span> <br></br>CHURCH PASTORS
              </h4>
            </Col>
            <Col md={4}><hr style={{ borderTop: '1px solid #848484' }}></hr></Col>
            <br></br><br></br><br></br><br></br>
            <Col md={4} id="pastorcol">
              <Card id="pastorcard">
                <Card.Img variant="top" src="images/pastor1.jpeg" id="pastorimg" />
                <Card.Body className='text-center'>

                  <Card.Text>
                    <p>Pastor</p>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} id="pastorcol">
              <Card id="pastorcard">
                <Card.Img variant="top" src="images/pastor2.jpeg" id="pastorimg" />
                <Card.Body className='text-center'>

                  <Card.Text>
                    <p>Pastor</p>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} id="pastorcol">
              <Card id="pastorcard">
                <Card.Img variant="top" src="images/pastor1.jpeg" id="pastorimg" />
                <Card.Body className='text-center'>

                  <Card.Text>
                    <p>Pastor</p>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>

        </Container>
      </div>
      <br></br><br></br>

    </div>
  )
}
