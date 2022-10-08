import { useState, useEffect } from 'react';
import { getStock, getStockPrice, getStockNews,getStockMovement,stockOnWatchList,
    getStockWeekMovement, getStockMonthMovement, getStockYearMovement, getStockFiveYearMovement
} from '../../adapters/stockApi';
import { addToWatchList, updateWatchList,deleteWatchList } from '../../adapters/watchlistApi';
import { getToken, isAuthenticated } from '../../authentication/authApi';

const StockContext = (tickerSymbol,socketLivePrice)=>{

    const authInfo = isAuthenticated();
    const token = getToken();

    const [inWatchList,setInWatchList]=useState(false);
    const [priceTarget,setPriceTarget]=useState(0);
    const [inputPriceTarget, setInputPriceTarget]=useState(0);
    const [loading,setLoading]=useState(false);

    const [currentTimeStamp,setCurrentTimeStamp]=useState('day');
    const [stockSymbol,setStockSymbol]=useState('');
    const [stockInfo,setStockInfo]=useState({});
    const [stockPrice,setStockPrice]=useState({stock:'',currentPrice:'',dollarPriceChange:'',percentPriceChange:''});
    const [stockNews, setStockNews]=useState([]);
    
    const [stockTimeMovement, setStockTimeMovement]=useState();
    const [stockPriceMovement, setStockPriceMovement]=useState();

    const [graphSize,setGraphSize]=useState();

    // use effect for graph resize
    useEffect(()=>{
        let id=authInfo._id;
        socketLivePrice.auth = { id };
        socketLivePrice.connect();
        socketLivePrice.on('updateOnWatchList',({insideWatchList})=>{
            if(!insideWatchList){
                setInWatchList(insideWatchList);
                socketLivePrice.disconnect();
            }
        });

        window.addEventListener('resize',resizeGraph);
        window.onload=resizeGraph();
        return ()=>{
            window.removeEventListener('resize',resizeGraph)
        };
    },[]);
    
    const resizeGraph = ()=>{
        if(window.innerWidth>=1200){
            setGraphSize(550);
        }
        else if(window.innerWidth>=1057.7){
            setGraphSize(450);
        }
        else if(window.innerWidth>=1045){
            setGraphSize(900);
        }
        else if(window.innerWidth>=1040){
            setGraphSize(920);
        }
        else if(window.innerWidth>=990){
            setGraphSize(900);
        }
        else if(window.innerWidth>=767){
            setGraphSize(670);
        }
        else{
            setGraphSize(490);
        }
    };

    useEffect(()=>{
        setStockSymbol(tickerSymbol);

        stockOnWatchList(tickerSymbol,authInfo._id,token).then(watchListInfo=>{
            const tempInWatchList=watchListInfo.inWatchList;
            const tempPriceTarget=watchListInfo.price;
            if(tempInWatchList){
                setInWatchList(tempInWatchList);
            }
            if(tempPriceTarget){
                setPriceTarget(tempPriceTarget);
                setInputPriceTarget(tempPriceTarget);
            }
        });
        getStock(tickerSymbol).then(stock=>{
            setStockInfo(stock);
        });
        getStockPrice(tickerSymbol).then(stockPriceInfo=>{
            setStockPrice(stockPriceInfo);
        });
        getStockNews(tickerSymbol).then(news=>{
            setStockNews(news.news.articles);
        });
        getStockMovement(tickerSymbol).then(stockData=>{
            setStockTimeMovement(stockData.time);
            setStockPriceMovement(stockData.price);
        });
    },[tickerSymbol]);

    const updateGraphValues = (stockPriceLive,stockPriceTime)=>{
        if(currentTimeStamp==='day'){
            const stockPriceMovementClone=[...stockPriceMovement];
            for(let i=0; i<stockPriceMovementClone.length;i++){
                if(stockPriceMovementClone[i]===null){
                    stockPriceMovementClone[i-1]=stockPriceLive;
                    setStockPriceMovement(stockPriceMovementClone);
                    break;
                }
            }
        }
    };

    const updateGraphValuesPeriodic =(stockPriceLive,stockPriceTime)=>{
        if(currentTimeStamp==='day'){
            const stockPriceHour=parseInt(stockPriceTime.split(':')[0]);
            const stockPriceMinute=parseInt(stockPriceTime.split(':')[1]);
            if(stockTimeMovement){
                for(let i=0;i<stockTimeMovement.length;i++){
                    let time=stockTimeMovement[i].split(' ')[1];
                    let hour=parseInt(time.split(':')[0]);
                    let minute=parseInt(time.split(':')[1]);
                    if(stockPriceHour===hour&&stockPriceMinute>minute){
                        if(minute===55){
                            const stockPriceMovementClone=[...stockPriceMovement];
                            stockPriceMovementClone[i-1]=stockPriceLive;
                            setStockPriceMovement(stockPriceMovementClone);
                            break;
                        }else{
                            const stockPriceMovementClone=[...stockPriceMovement];
                            stockPriceMovementClone[i-1]=stockPriceLive;
                            setStockPriceMovement(stockPriceMovementClone);
                            break;
                        }
                    }
                }
            }
        }
    };

    const deleteStockFromWatchList = ()=>{
        deleteWatchList(authInfo._id,token,{symbol:stockSymbol}).then(newWatchList=>{
            setInWatchList(false);
        });
    };

    const updatePriceTarget = (e)=>{
        e.target.parentNode.parentNode.class='dropdown-menu dropdown-menu-right';
        e.preventDefault();
        updateWatchList(authInfo._id,token,{symbol:stockSymbol,priceAlert:inputPriceTarget}).then(watchList=>{
            setPriceTarget(inputPriceTarget);
        });
    };

    const onChangeUpdatePriceTarget = (e)=>{
        setInputPriceTarget(e.target.value);
    };

    const onSubmitAddToWatchList=(e)=>{
        e.preventDefault();
        addToWatchList({stockName:stockInfo.stockName,stockSymbol:stockSymbol,priceAlert:priceTarget},authInfo._id,token).then(data=>{
            setInputPriceTarget(priceTarget);
            setInWatchList(true);
        });
    };

    const onChangeAddToWatchList = (e)=>{
        setPriceTarget(e.target.value);
    };

    const clickDayHistoricData = ()=>{
        setLoading(true);
        setCurrentTimeStamp('day');
        getStockMovement(stockSymbol).then(stockData=>{
            setStockTimeMovement(stockData.time);
            setStockPriceMovement(stockData.price);
            setLoading(false);
        });
    };

    const clickWeekHistoricData =()=>{
        setLoading(true);
        setCurrentTimeStamp('week');
        getStockWeekMovement(stockSymbol).then((stockData)=>{
            setStockTimeMovement(stockData.time);
            setStockPriceMovement(stockData.price);
            setLoading(false);
        });
    };

    const clickMonthHistoricData = ()=>{
        setLoading(true);
        setCurrentTimeStamp('month');
        getStockMonthMovement(stockSymbol).then((stockData)=>{
            setStockTimeMovement(stockData.time);
            setStockPriceMovement(stockData.price);
            setLoading(false);
        });
    };

    const clickYearHistoricData = ()=>{
        setLoading(true);
        setCurrentTimeStamp('year');
        getStockYearMovement(stockSymbol).then((stockData)=>{
            setStockTimeMovement(stockData.time);
            setStockPriceMovement(stockData.price);
            setLoading(false);
        });
    };

    const clickFiveYearHistoricData = ()=>{
        setLoading(true);
        setCurrentTimeStamp('fiveYear');
        getStockFiveYearMovement(stockSymbol).then((stockData)=>{
            setStockTimeMovement(stockData.time);
            setStockPriceMovement(stockData.price);
            setLoading(false);
        });
    };

   return { stockSymbol,inWatchList, loading, priceTarget, inputPriceTarget, stockInfo, stockPrice, stockNews, stockTimeMovement, stockPriceMovement,currentTimeStamp,graphSize,
    setInWatchList,updateGraphValues,updateGraphValuesPeriodic,
    onSubmitAddToWatchList, onChangeAddToWatchList,
    clickDayHistoricData,clickWeekHistoricData, clickMonthHistoricData, clickYearHistoricData, clickFiveYearHistoricData, onChangeUpdatePriceTarget,updatePriceTarget,deleteStockFromWatchList};
};

export {StockContext};


