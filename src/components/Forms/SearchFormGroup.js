import React from 'react'

import { InputGroup, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export const SearchFormGroup = ({ quicksearch, sermondate, topic, preacher, setQuickSearch, setSermonDate, setTopic, setPreacher, buttontext, getDeepSearch, message, errormessage, successmessage, getsermontitle, getsermonpreacher, getQuickSearch, buttontext2, message2, errormessage2, successmessage2}) => {
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

                {
                    message2 === 'success' ?
                        <div className=''>
                            {successmessage2}
                        </div> :
                        ''
                }

                {
                    message2 === 'error' ?
                        <div className='alert alert-danger alert-sm'>
                            {errormessage2}
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
                        value={quicksearch} onChange={(event) => setQuickSearch(event.target.value)}/>
                     {
                        buttontext2 === "Processing" ?
                            <Button class="btn btn-danger" style={{ backgroundColor: '#135592', color: '#fff', borderRadius: '0', border: 'none' }} onClick={getQuickSearch}>
                                {buttontext2}
                            </Button> : ''
                    }

                    {
                        buttontext2 === "Search" ?
                            <Button class="btn btn-danger" style={{ backgroundColor: '#135592', color: '#fff', borderRadius: '0', border: 'none' }} onClick={getQuickSearch}>
                                {buttontext2}
                            </Button> : ''
                    }
                </InputGroup>
            </p>

            <p style={{ backgroundColor: '#d8d8d8', padding: '10px' }}>
                <InputGroup size="md">
                    <Form.Control type="date" placeholder="Date" value={sermondate} onChange={(event) => setSermonDate(event.target.value)} />
                    <Form.Select aria-label="" value={topic} onChange={(event) => setTopic(event.target.value)}>
                        <option>Topic</option>
                        {
                            getsermontitle.length > 0 && getsermontitle.map((getSermonTitleData, index) => {
                        return<>
                        <option value={getSermonTitleData.sermons_title}>{getSermonTitleData.sermons_title}</option>
                        </>
                            })
                        }
                    </Form.Select>
                    <Form.Select aria-label="" value={preacher} onChange={(event) => setPreacher(event.target.value)}>
                        <option>Preacher</option>
                        {
                            getsermonpreacher.length > 0 && getsermonpreacher.map((getSermonPreacherData, index) => {
                        return<>
                        <option value={getSermonPreacherData.sermons_title}>{getSermonPreacherData.sermons_preacher}</option>
                        </>
                            })
                        }
                    </Form.Select>
                    {
                        buttontext === "Processing" ?
                            <Button class="btn btn-danger" style={{ backgroundColor: '#135592', color: '#fff', borderRadius: '0', border: 'none' }} onClick={getDeepSearch}>
                                {buttontext}
                            </Button> : ''
                    }

                    {
                        buttontext === "Search" ?
                            <Button class="btn btn-danger" style={{ backgroundColor: '#135592', color: '#fff', borderRadius: '0', border: 'none' }} onClick={getDeepSearch}>
                                {buttontext}
                            </Button> : ''
                    }
                </InputGroup>
            </p>
        </div>
    )
}

