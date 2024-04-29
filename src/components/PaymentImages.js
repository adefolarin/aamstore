import React from 'react';
import { Card, Image, InputGroup } from 'react-bootstrap';
import { Container, Col, Row, Button, ButtonGroup, ButtonToolbar, Table, Form } from 'react-bootstrap';
import './PaymentImages.css';

export const PaymentImages = () => {
    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <div className="payimg">
                            <Image variant="top" src="images/visa_logo.png" thumbnail className="img" />
                        </div>
                    </Col>
                    <Col>
                        <div className="payimg">
                            <Image variant="top" src="images/mastercard.png" thumbnail className="img" />
                        </div>
                    </Col>
                    <Col>
                        <div className="payimg">
                            <Image variant="top" src="images/american_express.png" thumbnail className="img" />
                        </div>
                    </Col>
                    <Col>
                        <div className="payimg">
                            <Image variant="top" src="images/paypal.png" thumbnail className="img" />
                        </div>
                    </Col>
                    <Col>
                        <div>
                            <Image id="payimg" variant="top" src="images/zelle.png" thumbnail className="img" />
                        </div>
                    </Col>
                </Row>
                
                <div>
                <br></br><br></br><br></br>
                <h5 style={{ textDecoration:'underline' }}>Privacy Policy</h5>
                <p>
                  We keep your personal information private and secure. When you make a payment through our site, you provide your name, contact information, payment information, and additional information related to your transaction. We use this information to process your payment and to ensure your payment is correctly credited to your account.
                </p>
                </div>
            </Container>
        </div>
    )
}
