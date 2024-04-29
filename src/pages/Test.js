import React from 'react';
import { useState } from 'react';
import { Form, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Container, Col, Row, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faBible } from '@fortawesome/free-solid-svg-icons';
import { Card } from 'react-bootstrap';
import DateTime from 'react-datetime';
import { CDBAnimation, CDBContainer } from 'cdbreact';


export const Test = () => {

  //const weekend = (datevalue) => new Date() <datevalue;

  //const myModal = new bootstrap.Modal(document.getElementById('myModal'));
  //myModal.show();

  return (
    <div>
      <div>
        <br></br><br></br>
        <div className="container mt-3">
  <h3>Modal Example</h3>
  <p className='text-center'>Click on the button to open the modal.</p>
  
  <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myModal">
    Open modal
  </button>
</div>

        
    <br></br><br></br><br></br><br></br>
    <div className="modal" id="myModal">
      <div className="modal-dialog">
        <div className="modal-content">

      
          <div className="modal-header">
            <h4 className="modal-title">Modal Heading</h4>
            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
          </div>

          <div className="modal-body">
            Modal body..
          </div>

      
          <div className="modal-footer">
            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
          </div>

        </div>
      </div>
    </div>


      </div>
 
    </div>
  );
}