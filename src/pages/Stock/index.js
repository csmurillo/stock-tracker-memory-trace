import React, {useEffect} from 'react';
import { useParams } from 'react-router-dom';

const Stock = () =>{
    const { handle } = useParams();
    useEffect(()=>{
        alert('PARAMS'+handle);
    },[]);

    return (
        <div>STOCK</div>
    );
};
export default Stock;
