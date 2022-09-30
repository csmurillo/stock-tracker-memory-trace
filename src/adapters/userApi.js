import { API } from '../config';

export const getUserInformation = (userId, token) =>{ 
    return fetch(`${API}/user/account/${userId}`, {
        method:"GET",
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
    .then(res=>{return res.json()})
    .catch(err=>{console.log(err);})
};

export const getSmsAlerts = (userId, token) =>{ 
    return fetch(`${API}/user/account/enableAlerts/${userId}`, {
        method:"GET",
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
    .then(res=>{return res.json()})
    .catch(err=>{console.log(err);})
};
export const getStockHistory = (userId,token) => {
    return fetch(`${API}/stock/history/${userId}`,{
        method:"GET",
        headers:{
            Accept:'application/json',
            Authorization: `Bearder ${token}`
        }
    })
    .then(res=>{return res.json()})
    .catch(err=>{console.log(err);});
};

export const updateSmsAlerts = (userId, token, smsAlerts) => {
    return fetch(`${API}/user/account/enableAlerts/update/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(smsAlerts)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const updatePassword = (userId, token, password) => {
    return fetch(`${API}/user/account/passwordChange/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(password)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
export const updateProfile = (userId, token, updatedInformation) => {
    return fetch(`${API}/user/account/update/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(updatedInformation)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
export const getRelatedStocks = (symbol)=>{
    return fetch(`${API}/stock/search?symbol=${symbol}`, {
        method:"GET",
        headers: {
            Accept: 'application/json'
        }
    })
    .then(res=>{return res.json()})
    .catch(err=>{console.log(err);})
};
