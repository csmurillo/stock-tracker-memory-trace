import { useState, useEffect } from 'react';
import { getToken, isAuthenticated } from '../../authentication/authApi';
import { getStockHistory } from '../../adapters/userApi';
const AccountContext = ()=>{
    const [stockHistory,setStockHistory]=useState([]);
    const authInfo = isAuthenticated();
    const token = getToken();
    useEffect(()=>{
        getStockHistory(authInfo._id,token).then((res)=>{
            const {stocks}=res;
            setStockHistory(stocks);
        });
    },[]);
    return {stockHistory};
};

export {AccountContext};