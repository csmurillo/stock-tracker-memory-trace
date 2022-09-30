
import {HomeContext} from '../../../../context/HomeContext';
import Card from '../../../../components/Card';
import Slider from "react-slick";
const TopLoserStocks = () =>{
    const {sliderSettings,loserStocks}=HomeContext();
    return (
        <div id="top-loser-stocks">
            <h1 className="custom-font-two mb-4">Top Losers</h1>
            <div className="row">
            <div id="top-losers" className="col-12">
                    <Slider {...sliderSettings}>
                    {
                        loserStocks && loserStocks.map((loser,i)=>(
                            <div key={i}>
                                <div>
                                    <Card companyName={loser.companyName} tickerSymbol={loser.ticker} priceChange={loser.changesPercentage} currentPrice={loser.price} />
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

export {TopLoserStocks};