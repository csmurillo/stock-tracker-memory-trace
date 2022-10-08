import React from 'react';
import { useParams } from 'react-router-dom';

import Plot from 'react-plotly.js';

import './index.css';
import MainLayout from '../../layout/MainLayout';
import Button from '../../components/Button';

import { StockContext } from '../../context/StockContext';
import { StockPriceContext } from '../../context/StockPriceContext';
import socket from '../../context/Socketio';
import socketLivePrice from '../../context/SocketLivePrice';

const Stock = () =>{
    const { tickerSymbol } = useParams();

    const { stockSymbol,stockPrice, inWatchList, loading, priceTarget, inputPriceTarget, 
            stockInfo:{stockName,marketCap,volume,averageVolume,fiftytwoWeekHigh,fiftytwoWeekLow,openPrice},
            stockPrice:{stock,currentPrice,dollarPriceChange,percentPriceChange},
            stockNews,stockTimeMovement, stockPriceMovement, currentTimeStamp,graphSize,
            setInWatchList,updateGraphValues,updateGraphValuesPeriodic,
            onSubmitAddToWatchList, onChangeAddToWatchList,
            clickDayHistoricData, clickWeekHistoricData, clickMonthHistoricData, clickYearHistoricData, clickFiveYearHistoricData,
            onChangeUpdatePriceTarget,updatePriceTarget,deleteStockFromWatchList
        }=StockContext(tickerSymbol,socketLivePrice);

        const { stockPriceLive,stockChangePrice,stockChangePricePercentage,stockAlertPriceReached }=StockPriceContext(tickerSymbol,updateGraphValues,updateGraphValuesPeriodic,socket,socketLivePrice,currentPrice,inWatchList,setInWatchList);

    return (
        <MainLayout>
            <div id="stock">
                <div id="stock-symbol-information">
                    <div id="stock-symbol-header">
                        <div id="stock-symbol">
                            <div id="stock-name">{stockName} ({stock}) </div>
                            <div className='d-flex'>
                                <div id="stock-price">${(stockPriceLive==='~')?stockPrice.currentPrice:stockPriceLive}</div>
                                <div id="stock-change">{stockChangePrice} ({stockChangePricePercentage})</div>
                            </div>
                        </div>
                        <div class="dropdown">
                            <div id="stock-symbol-add-to-watchlist-button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <Button className='btn' styles={{fontSize:'20px',width:'150px',borderRadius:'15px',backgroundColor:'rgb(138, 233, 138)', color:'white'}}>{(inWatchList&&!stockAlertPriceReached) ? 'Price Target $'+priceTarget:'WatchList +'}</Button>
                            </div>
                            {(inWatchList&&!stockAlertPriceReached)?
                                        <div className='dropdown-menu dropdown-menu-right' aria-labelledby="dropDownMenu">    
                                            <div>
                                                <form onSubmit={updatePriceTarget}>
                                                    <input type="number" min="0" max="2000" value={inputPriceTarget} onChange={onChangeUpdatePriceTarget}/>
                                                    <div className="d-flex">
                                                        <Button class="dropdown-item" type='submit' styles={{fontSize:'15px',width:'80px',borderRadius:'15px',backgroundColor:'rgb(138, 233, 138)', color:'white'}}>Update</Button>
                                                        <Button class="dropdown-item" onclick={deleteStockFromWatchList} styles={{fontSize:'15px',width:'80px',borderRadius:'15px',backgroundColor:'rgb(138, 233, 138)', color:'white'}}>Remove</Button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                        :
                                        <div className='dropdown-menu dropdown-menu-right' aria-labelledby="dropDownMenu">    
                                            <div>
                                                <form onSubmit={onSubmitAddToWatchList}>
                                                    <input class="dropdown-item" type="number" min="0" max="2000" value={priceTarget} onChange={onChangeAddToWatchList}/>
                                                    <Button class="dropdown-item" type='submit' styles={{fontSize:'20px',width:'150px',borderRadius:'15px',backgroundColor:'rgb(138, 233, 138)', color:'white'}}>Add</Button>
                                                </form>
                                            </div>
                                        </div>
                            }
                        </div>
                    </div>
                    <div>
                        <div id="stock-symbol-graph">
                            <div id="graph-container">
                                {
                                    loading && <div id="graph-loading" className="d-flex justify-content-center align-items-center">
                                                    <div className="spinner-border text-success" role="status" style={{width:'50px', height:'50px'}}></div>
                                                </div>
                                }
                                <Plot
                                    data={[
                                        {
                                        x: stockTimeMovement,
                                        y: stockPriceMovement,
                                        type: 'line',
                                        mode: 'lines',
                                        marker: {color: 'lightgreen'},
                                        }
                                    ]}
                                    layout={ 
                                        {width: graphSize, height:250,margin: {
                                        l: 30,
                                        r: 10,
                                        b: 30,
                                        t: 10,
                                        pad: 4},
                                        yaxis: {},
                                        xaxis : {
                                            // fixedrange: true, 
                                            // autorange: false,
                                            showticklabels:false,
                                            // range:['Febuary 17, 2022, 9:30', 'Febuary 17, 2022, 18:30']
                                        }
                                    }}
                                    
                                    config = {{displayModeBar: false}}
                                    />
                            </div>
                        </div>
                        <div id="stock-symbol-timestamps">
                            <Button onclick={()=>{clickDayHistoricData()}} className={'btn '+(currentTimeStamp=='day'?'active':'')} styles={{height:'45px',backgroundColor:'lightgreen',color:'white',marginRight:'5px', outline:'none',boxShadow: 'none'}}>1d</Button>
                            <Button onclick={()=>{clickWeekHistoricData()}} className={'btn '+(currentTimeStamp=='week'?'active':'')} styles={{height:'45px',backgroundColor:'lightgreen',color:'white',marginRight:'5px', outline:'none',boxShadow: 'none'}}>1w</Button>
                            <Button onclick={()=>{clickMonthHistoricData()}} className={'btn '+(currentTimeStamp=='month'?'active':'')} styles={{height:'45px',backgroundColor:'lightgreen',color:'white',marginRight:'5px', outline:'none',boxShadow: 'none'}}>1m</Button>
                            <Button onclick={()=>{clickYearHistoricData()}} className={'btn '+(currentTimeStamp=='year'?'active':'')} styles={{height:'45px',backgroundColor:'lightgreen',color:'white',marginRight:'5px', outline:'none',boxShadow: 'none'}}>1y</Button>
                            <Button onclick={()=>{clickFiveYearHistoricData()}} className={'btn '+(currentTimeStamp=='fiveYear'?'active':'')} styles={{height:'45px',backgroundColor:'lightgreen',color:'white',marginRight:'5px', outline:'none',boxShadow: 'none'}}>5y</Button>
                        </div>
                    </div>
                    <div id="stock-information-container">
                            <div class="stock-info" id="stock-info-marketCap">
                                <h2>Market Cap</h2>
                                <div>{marketCap}</div>
                            </div>
                            <div class="stock-info" id="stock-info-volume">
                                <h2>Volume</h2>
                                <div>{volume}</div>
                            </div>
                            <div class="stock-info" id="stock-info-avg-volume">
                                <h2>Avg Volume</h2>
                                <div>{averageVolume}</div>
                            </div>
                            <div class="stock-info" id="stock-52-week-high">
                                <h2>52 Week High</h2>
                                <div>{fiftytwoWeekHigh}</div>
                            </div>
                            <div class="stock-info" id="stock-52-week-low">
                                <h2>52 Week Low</h2>
                                <div>{fiftytwoWeekLow}</div>
                            </div>
                            <div class="stock-info" id="stock-open-price">
                                <h2>Open Price</h2>
                                <div>{openPrice}</div>
                            </div>
                    </div>
                </div>
                <div id="stock-symbol-news">
                    <div id="stock-news-title" className='d-flex justify-content-center'>
                        <h1>Stock News</h1>
                    </div>
                    <div id="stock-news">
                        {
                            stockNews.map((newsInfo,i)=>(
                                <a target="_blank" rel="noreferrer" href={newsInfo.url}>
                                    <div class="news-row">
                                        <div class="news-content">
                                            <div class="news-img">
                                                <img style={{width:'100%',height:'100%'}} src={newsInfo.urlToImage}/>
                                            </div>
                                            <div class="news-info">
                                                <div class="news-title">
                                                    <p>{newsInfo.title}</p>
                                                </div>
                                                <div class="news-description text-truncate">
                                                    {newsInfo.description}
                                                </div>
                                            </div>    
                                        </div>
                                    </div> 
                                </a>      
                            ))
                        }
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};
export default Stock;