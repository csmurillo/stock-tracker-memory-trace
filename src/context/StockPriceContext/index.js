import { useState, useEffect } from 'react';
import { isAuthenticated } from '../../authentication/authApi';

const StockPriceContext = (tickerSymbol,updateGraphValues,updateGraphValuesPeriodic,socket,socketLivePrice,currentPrice,inWatchList,setInWatchList)=>{

    const authInfo = isAuthenticated();

    const [ stockPriceLive, setStockPriceLive]=useState('~');
    const [ stockChangePrice, setStockChangePrice]=useState('-x');
    const [ stockChangePricePercentage, setStockChangePricePercentage]=useState('-x');
    const [ stockPriceDateFormatLive, setStockPriceDateFormatLive]=useState('');
    const [ stockAlertPriceReached, setStockAlertPriceReached]=useState(false);

    useEffect(()=>{
        if(inWatchList&&stockAlertPriceReached){
            setStockAlertPriceReached(false);
            setInWatchList(false);
        }
    },[inWatchList, stockAlertPriceReached]);

    useEffect(()=>{
        let id=authInfo._id;
        socketLivePrice.auth = { id };
        socketLivePrice.connect();

        socket.auth = { id };
        socket.connect();
        socket.emit('startStreamServerStockPrice',{tickerSymbol});
        
        socket.on('stockAlertPriceReached',({reached})=>{
            setStockAlertPriceReached(reached);
            setInWatchList(false);
        });


        socket.on('streamStockLivePrice',({price,changePrice,changePricePercentage,time})=>{
            // const formattedDate=getDateFormatted(time.split(':')[0],time.split(':')[1]);
            setStockPriceLive(price);
            setStockPriceDateFormatLive(time.split(':')[0]+':'+time.split(':')[1]);
            setStockChangePrice(changePrice);
            setStockChangePricePercentage(changePricePercentage);
        });

        socket.on('streamMod5LivePrice',({price,time})=>{
            updateGraphValues(price,time);
        });

        return ()=>{
            socketLivePrice.disconnect();
            socket.disconnect();
        };
    },[]);

    useEffect(()=>{
        updateGraphValuesPeriodic(stockPriceLive,stockPriceDateFormatLive);
        socketLivePrice.emit('onWatchList',{tickerSymbol});
    },[stockPriceLive]);

    const getDateFormatted = (hour,min)=>{
        var dateFormatted='';
        var d = new Date();
        dateFormatted= (d.getMonth()+1)+' '+ d.getDate()+', '+d.getFullYear()+', '+hour+':'+min;
        return dateFormatted;
    }

    const updateGraphStockPrice =(currentTimeStamp,updateStockPriceMovement,updateStockTimeMovement)=>{
        updateStockPriceMovement('time');
        updateStockTimeMovement('price');
    };


   return { stockPriceLive,stockChangePrice,stockChangePricePercentage, stockPriceDateFormatLive, stockAlertPriceReached, updateGraphStockPrice };
};

export { StockPriceContext };

