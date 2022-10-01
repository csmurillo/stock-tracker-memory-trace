import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';

import './index.css';
import { FaRegCheckCircle } from 'react-icons/fa';

const UpdateProfileSuccess = () =>{
    const [sec,setSec]=useState(1.5);
    const [redirect,setRedirect]=useState(false);
    useEffect(()=>{
        const interval = setInterval(()=>{
            setSec(sec=>sec-1.5);
        },1500);
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
        <div id="update-profile-success">
            <div className="w-100 h-100 d-flex justify-content-center align-items-center">
                <div>
                    <div id="success-check-mark" className="d-flex justify-content-center align-items-center">
                        <FaRegCheckCircle></FaRegCheckCircle>
                    </div>
                    <div id="update-profile-information">Profile Information Updated</div>
                </div>
            </div>
            {redirect && <Redirect to="/settings" />}
        </div>
    );
};

export {UpdateProfileSuccess};