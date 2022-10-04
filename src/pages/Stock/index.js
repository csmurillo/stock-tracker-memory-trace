import React, {useEffect} from 'react';
import { useParams } from 'react-router-dom';

const Stock = () =>{
    const { name } = useParams();
    useEffect(()=>{
        alert('PARAMS'+name);
    },[]);

    return (
        <div>STOCK {name}</div>
    );
};
export default Stock;
