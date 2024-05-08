import { React, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


export const Logout = () => {


    const navigate = useNavigate();

    const logout = async () => {

    localStorage.clear();
    navigate('/login');
    
    };


    useEffect(() => {
        logout();
    }, []);





    return (
        <div>

        </div >
    )
}
