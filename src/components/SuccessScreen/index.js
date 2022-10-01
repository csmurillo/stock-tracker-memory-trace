import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';

import './index.css';
import { FaRegCheckCircle } from 'react-icons/fa';

const SuccessScreen = () =>{
    const [sec,setSec]=useState(3);
    const [redirect,setRedirect]=useState(false);
    useEffect(()=>{
        const interval = setInterval(()=>{
            setSec(sec=>sec-1);
        },1000);
        return ()=>{
            clearInterval(interval);
        };
    },[]);
    useEffect(()=>{
        if(sec==0){
            setRedirect(true);
        }
    },[sec]);

    return (
        <div id="success-screen">
            <div className="w-100 h-100 d-flex justify-content-center align-items-center">
                <div>
                    <div id="success-check-mark" className="d-flex justify-content-center align-items-center">
                        <FaRegCheckCircle></FaRegCheckCircle>
                    </div>
                    <div id="success">Success</div>
                    <div id="redirect-in-sec">Redirects in {sec} seconds</div>
                </div>
            </div>
            {redirect && <Redirect to="/settings" />}
        </div>
    );
};

export default SuccessScreen;