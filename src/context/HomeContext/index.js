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
    const [graphSize,setGraphSize]=useState();
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
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },
        ]
    });
    useEffect(()=>{
        window.addEventListener('resize',resizeGraph);
        window.onload=resizeGraph();
        return ()=>{
            window.removeEventListener('resize',resizeGraph)
        };
    },[]);
    const resizeGraph = ()=>{
        if(window.innerWidth>=1200){
            setGraphSize(660);
        }
        else if(window.innerWidth>=1057.7){
            setGraphSize(650);
        }
        else if(window.innerWidth>=1045){
            setGraphSize(750);
        }
        else if(window.innerWidth>=1040){
            setGraphSize(600);
        }
        else if(window.innerWidth>=990){
            setGraphSize(600);
        }
        else if(window.innerWidth>=767){
            setGraphSize(500);
        }
        else if(window.innerWidth>=567){
            setGraphSize(500);
        }
        else if(window.innerWidth>=400){
            setGraphSize(450);
        }
        else{
            setGraphSize(380);
        }
    };
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
    return {graphSize,sliderSettings,dowJonesPrice,dowJonesDate,gainerStocks,loserStocks};
};

export {HomeContext};