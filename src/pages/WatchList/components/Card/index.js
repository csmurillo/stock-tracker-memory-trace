import React, {useEffect, useState} from 'react';
import './index.css';
import Button from '../../../../components/Button';
import { AiOutlineCheckCircle } from "react-icons/ai";
import { Link } from 'react-router-dom';

const Card = ({ stock, stockName, stockSymbol, stockPrice, stockPriceTargetReached=false, stockPriceTargetReachedDate, priceTarget, priceDirection, InProgress,cardUpdate, cardDelete }) =>{

    const [cardPriceTarget,setCardPriceTarget]=useState();
    const [targetReached,setTargetReached]=useState(false);

    useEffect(()=>{
        if(priceDirection==='above'){
            if(parseFloat(stockPrice)>parseFloat(priceTarget)){
                // alert('above price');
                // setTargetReached(true);
            }
        }
        else if(priceDirection==='below'){
            if(parseFloat(stockPrice)<parseFloat(priceTarget)){
                // alert('below price');
                // setTargetReached(true);
            }
        }
    },[stockPrice]);

    useEffect(()=>{
        // set values
        setCardPriceTarget(priceTarget);
    },[]);

    const cardUpdatePriceTarget=(e)=>{
        e.preventDefault();
        cardUpdate(stockSymbol,cardPriceTarget);
    };

    const onChangeCardPriceTarget=(e)=>{
        setCardPriceTarget(e.target.value);
    };
    return (
        <div className='wl-card'>
            <div className='wl-card-top'>
                <div className='wl-card-top-content'>
                    <div className='wl-card-top-left'>
                        <div className='wl-stock-info'>
                            <div className='wl-stock-name'>
                                <Link to={'/stock/'+stockSymbol}>{stockName}</Link>
                            </div>
                            <div className='wl-stock-price'>
                                ${!stockPriceTargetReached ?
                                    stockPrice: cardPriceTarget

                                }
                            </div>
                        </div>
                        <div className='wl-stock-status' style={stockPriceTargetReached?{ border:'2px solid lightgreen',color:'green', backgroundColor:'rgb(192, 255, 208)'}:{}}>
                            {/* <div className='wl-stock-status'> */}
                                {
                                    stockPriceTargetReached || targetReached ?
                                    (<div className='wl-stock-status-reached'>
                                        <p>Reached</p>
                                        <span><AiOutlineCheckCircle/></span>
                                    </div>):
                                    (<p  className='wl-stock-status-in-progress'>In Progress</p>)
                                }
                            {/* // </div> */}
                        </div>
                    </div>
                    <div className='wl-card-top-right' style={stockPriceTargetReached?{justifyContent:'flex-end'}:{}}>
                        {(!stockPriceTargetReached) &&
                            (<div className='dropdown'>
                                <div className='wl-card-settings' data-toggle='dropdown'>...</div>
                                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropDownMenu">
                                    <div className='wl-card-delete-listing' onClick={()=>{cardDelete(stockSymbol)}}>Delete Listing</div>
                                </div>
                            </div>)
                        }
                        <div className="wl-card-date-price-reached">
                            {stockPriceTargetReached?<p>Date: {stockPriceTargetReachedDate}</p>:<></>}
                        </div>
                    </div>
                </div>
            </div>
            <div className='wl-card-bottom'>
                <div className='wl-card-bottom-content'>
                    <div className='wl-card-bottom-left'>
                        <div className='wl-card-bottom-price-target-title'>Price Target:</div>
                    </div>
                    <div className='wl-card-bottom-right dropup'>
                        <div class='wl-card-bottom-price-target' style={stockPriceTargetReached?{cursor:'default'}:{}} data-toggle="dropdown">${priceTarget}</div>
                        {!stockPriceTargetReached&&
                        <div class="dropdown-menu dropdown-menu-right">
                            <form onSubmit={cardUpdatePriceTarget} className=''>
                                <div className=''>
                                    <input type='number' name='price' value={cardPriceTarget} onChange={onChangeCardPriceTarget}/>
                                </div>
                                <div className=''>
                                    <Button type='submit' className='btn' styles={{fontSize:'1em',width:'100%',backgroundColor:'rgb(138, 233, 138)', color:'white'}}>Update</Button>
                                </div>
                            </form>
                        </div>
                        }   
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;









