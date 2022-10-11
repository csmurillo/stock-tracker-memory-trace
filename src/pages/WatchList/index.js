import React, {useRef} from 'react';
import socket from '../../context/Socketio';
import socketLivePrice from '../../context/SocketLivePrice';
import { WatchListContext } from '../../context/WatchListContext';

import './index.css';

import MainLayout from '../../layout/MainLayout';
import Card from './components/Card';

const Watchlist = () =>{

    const filterBtn= useRef();
    const { watchList, historicWatchList, livePrices,livesPricesLoaded, filterUpdate, cardUpdate, cardDelete } = WatchListContext(filterBtn,socket,socketLivePrice);

    return (
        <MainLayout>
            <div className="card-container flex flex-col">
                <div className="watchlist-filter mb-2">
                    <div class="dropdown">
                        <button class="dropdown-toggle filter-btn" type="button" id="filter" ref={filterBtn} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Show Active
                        </button>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                            <button class="dropdown-item" type="button" onClick={()=>{filterUpdate('showActive')}}>Show Active</button>
                            <button class="dropdown-item" type="button" onClick={()=>{filterUpdate('showAll')}}>Show All</button>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {
                        watchList && livesPricesLoaded && watchList.map((stocks,i)=>(
                            <div key={i} class="col-lg-4 col-md-6 col-6 mb-4 d-flex justify-content-center">
                                <Card stock={stocks} stockName={stocks.tickerName} stockSymbol={stocks.tickerSymbol} stockPrice={livePrices[i].livePrice}
                                    priceTarget={stocks.alertPrice} priceDirection={stocks.alertDirection} stockPriceTargetReached={stocks.priceTargetReached}
                                    stockPriceTargetReachedDate={stocks.datePriceTargetReached} cardUpdate={cardUpdate} cardDelete={cardDelete}>
                                </Card>
                            </div>
                        ))
                    }
                    {
                        historicWatchList && historicWatchList.map((stocks,i)=>(
                            <div key={i} class="col-lg-4 col-md-6 col-6 mb-4 d-flex justify-content-center">
                                <Card stock={stocks} stockName={stocks.tickerName} stockSymbol={stocks.tickerSymbol} priceTarget={stocks.alertPrice} stockPriceTargetReached={true}
                                        stockPriceTargetReachedDate={'10/10/2024'}>
                                </Card>
                            </div>
                        ))
                    }
                </div>
                { 
                    watchList && (watchList.length===0) && (historicWatchList.length===0) && 
                    <div class="watchlist-container">Watchlist Empty</div>
                }
            </div>
        </MainLayout>
    );
};

export default Watchlist;