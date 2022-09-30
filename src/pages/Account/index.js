import React, { useState } from 'react';
import MainLayout from '../../layout/MainLayout';
import {AccountContext} from '../../context/AccountContext';
import { isAuthenticated } from '../../authentication/authApi';
import './index.css';
const Account = () =>{
    // profile information
    const { firstName, lastName, email } = isAuthenticated();
    const { stockHistory }=AccountContext();
    // options:
    // profile holds information about user
    // stock history holds information about past stocks that were tracked
    const [optionToggle,setOptionToggle]=useState(0);
    const profileOption= ()=>{
        setOptionToggle(0);
    };
    const stockTrackHistoryOption= ()=>{
        setOptionToggle(1);
    };
    return (
        <MainLayout>
            <h1>Account</h1>
            <div id="account-options-container" className="d-flex">
                <div id="profile-option" className={ (optionToggle==0) ? 'active-profile-option' : '' } onClick={profileOption}>
                    Profile
                </div>
                <div id="option-divider"></div>
                <div id="stock-track-history-option" className={ (optionToggle==1) ? 'active-stock-track-history-option' : '' }  onClick={stockTrackHistoryOption}>
                    Stock Track History
                </div>
            </div>
            {/* if profile option */}
            {
                optionToggle==0&&<div id="profile-information-container">
                <div id="user-name" className="profile-information">Username: { firstName } { lastName }</div>
                <div id="email" className="profile-information">Email: { email }</div>
            </div>
            }
            {/* if stock history */}
            {
                optionToggle==1&&<div id="stock-history-container">
                    {
                        stockHistory.map((stocks,i)=>(
                            <div class="stock-card">
                                <div class="d-flex">
                                    <p>{stocks.tickerName}&nbsp;</p>
                                    <p>({stocks.tickerSymbol})</p>
                                </div>
                                <div>
                                    <p>Price: ${stocks.alertPrice}</p>
                                    <p>Date Reached:{stocks.datePriceTargetReached}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            }
        </MainLayout>
    );
};
export default Account;