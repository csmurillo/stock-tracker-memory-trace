import React from 'react';
import {HomeContext} from '../../../../context/HomeContext';
import Card from '../../../../components/Card';
import Slider from "react-slick";
const TopGainerStocks = () =>{
    const {sliderSettings,gainerStocks}=HomeContext();
    return (
        <div id="top-gainer-stocks">
            <h1 className="custom-font-two mb-4">Top Gainers</h1>
            <div>
                <div id="top-gainers-slider">
                    <Slider {...sliderSettings}>
                        {
                            gainerStocks && gainerStocks.map((gainer,i)=>(
                                <div key={i}>
                                    <div>
                                        <Card companyName={gainer.companyName} tickerSymbol={gainer.ticker} priceChange={gainer.changesPercentage} currentPrice={gainer.price} />
                                    </div>
                                </div>
                            ))
                        }
                    </Slider>
                </div>
            </div>
        </div>
    );
};
export {TopGainerStocks};