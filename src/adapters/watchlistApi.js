import { API } from '../config';
    
export const getWatchList = (userId,token)=>{
    return fetch(`${API}/watchlist/${userId}`, {
        method:"GET",
        headers: {
            Authorization: `Bearer ${token}`
        },
    })
    .then(res=>{return res.json()})
    .catch(err=>{console.log(err);})
};
export const addToWatchList = (stockToAdd,userId,token) =>{ 
    return fetch(`${API}/add/to/watchlist/${userId}`, {
        method:'POST',
        headers: {
            Accept:'application/json',
            'Content-Type':'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(stockToAdd)
    })
    .then(res=>{return res.json()})
    .catch(err=>{console.log(err);})
};
export const updateWatchList = (userId, token, updatedWatchList) => {
    return fetch(`${API}/update/watchlist/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(updatedWatchList)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
export const deleteWatchList =(userId,token,stockToDelete)=>{
    return fetch(`${API}/remove/from/watchlist/${userId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(stockToDelete)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};




