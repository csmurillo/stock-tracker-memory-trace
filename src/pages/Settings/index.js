import React from 'react';
import { Link } from 'react-router-dom';

import './index.css';
import {CgProfile} from "react-icons/cg";
import {SiWebauthn} from "react-icons/si";
import {MdDialerSip} from "react-icons/md";
import {AiOutlineUserDelete} from "react-icons/ai";

import MainLayout from '../../layout/MainLayout';

const Settings = () =>{
    return (
        <MainLayout>
                <div className="row">
                    <div className="security-options-container col-md-4 col-6 mb-3">
                        <Link to="profile">
                            <div id="security-option-profile" className="security-options h-100 d-flex flex-column justify-content-center align-items-center border rounded">
                                <CgProfile id="profile-icon" className="icons"></CgProfile>
                                <div id="profile">Profile</div>
                            </div>
                        </Link>
                    </div>
                    <div className="security-options-container col-md-4 col-6 mb-3">
                        <Link to="changepassword">
                            <div id="security-option-change-password" className="security-options h-100 d-flex flex-column justify-content-center align-items-center border rounded">
                                <SiWebauthn id="change-password-icon" className="icons"></SiWebauthn>
                                <div id="change-password">Change Password</div>
                            </div>
                        </Link>
                    </div>
                    <div className="security-options-container col-md-4 col-6 mb-3">
                        <Link to="smsalerts">
                            <div id="security-option-enable-alerts" className="security-options h-100 d-flex flex-column justify-content-center align-items-center border rounded">
                                <MdDialerSip id="enable-alerts-icon" className="icons"></MdDialerSip>
                                <div id="sms-alerts">Sms Alerts</div>
                            </div>
                        </Link>
                    </div>
                    <div className="security-options-container col-md-4 col-6 mb-3">
                        <Link to="delete">
                            <div id="security-option-delete-user" className="security-options h-100 d-flex flex-column justify-content-center align-items-center border rounded">
                                <AiOutlineUserDelete id="delete-user-icon" className="icons"></AiOutlineUserDelete>
                                <div id="delete-user">Delete Account</div>
                            </div>
                        </Link>
                    </div>
                </div>
        </MainLayout>
    );
};

export default Settings;