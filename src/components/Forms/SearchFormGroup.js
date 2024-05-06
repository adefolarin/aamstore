import React from 'react'

import { InputGroup, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export const SearchFormGroup = ({ setProductSearch, getSearch, productsearch, buttontext, message, errormessage, successmessage}) => {
    return (
        <div>
            <div>
                {
                    message === 'success' ?
                        <div className=''>
                            {successmessage}
                        </div> :
                        ''
                }

                {
                    message === 'error' ?
                        <div className='alert alert-danger alert-sm'>
                            {errormessage}
                        </div> :
                        ''
                }

            </div>
            <p>
                <InputGroup size='lg'>
                    <Form.Control
                        placeholder=""
                        aria-label=""
                        style={{ borderRadius: '0', fontSize: '14px', backgroundColor: '#d8d8d8' }} 
                        value={productsearch} onChange={(event) => setProductSearch(event.target.value)}/>
                     {
                        buttontext === "Processing" ?
                            <Button class="btn btn-danger" style={{ backgroundColor: '#135592', color: '#fff', borderRadius: '0', border: 'none' }} onClick={getSearch}>
                                {buttontext}
                            </Button> : ''
                    }

                    {
                        buttontext === "Search" ?
                            <Button class="btn btn-danger" style={{ backgroundColor: '#135592', color: '#fff', borderRadius: '0', border: 'none' }} onClick={getSearch}>
                                {buttontext}
                            </Button> : ''
                    }
                </InputGroup>
            </p>

        </div>
    )
}

