import { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { getDowJones, getGainerStocks, getLoserStocks } from '../../adapters/stockApi';
import { MdKeyboardArrowLeft,MdKeyboardArrowRight } from 'react-icons/md';
const HomeContext = ()=>{
    // dow jones and current top gainer/loser
    // used respectively: component: DowJones, TopGainerStocks, TopLoserStocks
    const [ dowJonesPrice,setDowJonesPrice] = useState([]);
    const [ dowJonesDate, setDowJonesDate] = useState([]);
    const [ gainerStocks, setGainerStocks ]=useState([]);
    const [ loserStocks, setLoserStocks ]=useState([]);
    // slider settings
    const history=useHistory();
    const [ sliderSettings,setSliderSettings ]= useState({
        arrows:true,
        infinite: true,
        nextArrow:null,
        prevArrow:null,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive:[
            {
                breakpoint: 1900,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 750,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },

        ]
    });
    // communcates with stockapi adapter to get live data on dowjones, current top gainer/loser stocks
    useEffect(()=>{
        getDowJones().then(dowjones=>{
            const dowJonesValue=dowjones.dowjones.dowjones.values;
            setDowJonesValues(dowJonesValue);
        });
        getGainerStocks().then(gainers=>{
            const mostGainStocks=gainers.gainers.gainers.mostGainerStock;
            setGainerStocks(mostGainStocks);
        });
        getLoserStocks().then(losers=>{
            // console.log(losers.losers.losers.mostLoserStock+'1!!');
            const mostLoserStocks=losers.losers.losers.mostLoserStock;
            // console.log(mostLoserStocks+'!!!');
            setLoserStocks(mostLoserStocks);
        });
    },[]);
    const setDowJonesValues = (dowJones)=>{
        let DowJonesPrice=[];
        let DowJonesDate=[];
        for(let i=0; i<dowJones.length;i++){
            DowJonesPrice.push(dowJones[i].close);
            DowJonesDate.push(dowJones[i].datetime);
        }
        setDowJonesPrice(DowJonesPrice.reverse());
        setDowJonesDate(DowJonesDate.reverse());
    };
    // slider arrow will be set on home page
    useEffect(()=>{
        if(history.location.pathname=='/'){
            setSliderArrows();
        }
    },[]);
    const setSliderArrows = ()=>{
        setSliderSettings({...sliderSettings,nextArrow:<SliderRightArrow to="next"/>,prevArrow:<SliderLeftArrow to="prev"/>});
    };
    const SliderLeftArrow = ({ className, style, onClick })=>(
        <div className="left-arrow" onClick={onClick} ><MdKeyboardArrowLeft></MdKeyboardArrowLeft></div>
    );
    const SliderRightArrow = ({ className, style, onClick })=>(
        <div className="right-arrow" onClick={onClick} style={style}><MdKeyboardArrowRight></MdKeyboardArrowRight></div>
    );
    return {sliderSettings,dowJonesPrice,dowJonesDate,gainerStocks,loserStocks};
};

export {HomeContext};