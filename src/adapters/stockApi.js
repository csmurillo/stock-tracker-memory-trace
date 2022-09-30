import { API } from '../config';
    
export const getDowJones = () =>{ 
    return fetch(`${API}/stock/dowjones`, {
        method:"GET"
    })
    .then(res=>{return res.json()})
    .catch(err=>{console.log(err);})
};
export const stockSearch = () =>{ 
    return fetch(`${API}/stock/search`, {
        method:"GET",
        headers: {
            Accept:'application/json',
            'Content-Type':'application/json'
        }
    })
    .then(res=>{return res.json()})
    .catch(err=>{console.log(err);})
};
export const getGainerStocks = () =>{ 
    return fetch(`${API}/stockgainers`, {
        method:"GET",
        headers: {
            Accept:'application/json',
            'Content-Type':'application/json',
        }
    })
    .then(res=>{
        return res.json();
    })
    .catch(err=>{console.log(err);})
};
export const getLoserStocks = () =>{ 
    return fetch(`${API}/stocklosers`, {
        method:"GET",
        headers: {
            Accept:'application/json',
            'Content-Type':'application/json',
        }
    })
    .then(res=>{return res.json()})
    .catch(err=>{console.log(err);})
};
export const getStock = (stockSymbol)=>{
    return fetch(`${API}/stock/${stockSymbol}`, {
        method:"GET"
    })
    .then(res=>{return res.json()})
    .catch(err=>{console.log(err);})
};
export const getStockPrice = (stockSymbol)=>{
    return fetch(`${API}/stock/price/${stockSymbol}`, {
        method:"GET"
    })
    .then(res=>{return res.json()})
    .catch(err=>{console.log(err);})
};
export const getStockNews = (stockSymbol)=>{
    return fetch(`${API}/stock/news/${stockSymbol}`, {
        method:"GET"
    })
    .then(res=>{return res.json()})
    .catch(err=>{console.log(err);})
};
export const getStockMovement = (stockSymbol)=>{
    return fetch(`${API}/stock/day/movement/${stockSymbol}`, {
        method:"GET"
    })
    .then(res=>{return res.json()})
    .catch(err=>{console.log(err);})
};
export const getStockWeekMovement = (stockSymbol)=>{
    return fetch(`${API}/stock/week/movement/${stockSymbol}`, {
        method:"GET"
    })
    .then(res=>{return res.json()})
    .catch(err=>{console.log(err);})
};
export const getStockMonthMovement = (stockSymbol)=>{
    return fetch(`${API}/stock/month/movement/${stockSymbol}`, {
        method:"GET"
    })
    .then(res=>{return res.json()})
    .catch(err=>{console.log(err);})
};
export const getStockYearMovement = (stockSymbol)=>{
    return fetch(`${API}/stock/year/movement/${stockSymbol}`, {
        method:"GET"
    })
    .then(res=>{return res.json()})
    .catch(err=>{console.log(err);})
};
export const getStockFiveYearMovement = (stockSymbol)=>{
    return fetch(`${API}/stock/fiveYear/movement/${stockSymbol}`, {
        method:"GET"
    })
    .then(res=>{return res.json()})
    .catch(err=>{console.log(err);})
};
export const stockOnWatchList = (stockSymbol,userId,token)=>{
    return fetch(`${API}/stock/on/watchlist/${stockSymbol}/${userId}`,{
        method:"GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then(res=>{return res.json();})
    .catch(err=>{console.log(err);})
};



