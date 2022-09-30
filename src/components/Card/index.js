import React from 'react';
import './index.css';
const Card = ({companyName,tickerSymbol,priceChange,currentPrice}) =>{
    return (
        <div className="custom-card">
            <div className="card-top">
                <div className="ticker-symbol-container">
                    {tickerSymbol}
                </div>
                <div className="price-change-container">
                    {priceChange}
                </div>
            </div>
            <div className="card-bottom d-flex">
                <div className="company-name-container text-truncate">
                    {companyName}
                </div>
                <div className="price-container">
                    ${currentPrice}
                </div>
            </div>
        </div>
    );
};
export default Card;