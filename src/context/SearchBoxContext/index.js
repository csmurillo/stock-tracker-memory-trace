import { getRelatedStocks } from "../../adapters/userApi";
import { useState,useEffect } from 'react';
const SearchBoxContext = ()=>{
    const [key,setKey]=useState(0);
    const [searchQuery, setSearchQuery]=useState(undefined);
    const [searchResults, setSearchResults]=useState(null);
    const [searchActive, setSearchActive] = useState(false);
    const [mobileSearchActive,setMobileSearchActive] = useState(false);
    const [searchActiveResize, setSearchActiveResize] = useState(false);
    const clearSearch=()=>{
        setSearchResults(null);
        setSearchActive(false);
    };
    const onKeyHandleSearch = (e) =>{
        if(e.keyCode==13){
            const searchSymbol=searchResults[key].symbol;
            window.location.href='/stock/'+searchSymbol;
            e.target.blur();
        }
    };
    const onStockSearch = (stockSymbol) =>{
        window.location.href='/stock/'+stockSymbol;
        clearSearch();
    };
    const onKeyHandle = (e) => {
        if(searchResults!=null){
            if(e.keyCode===38){
                let newKey=key-1;
                if(newKey<0){
                    newKey=searchResults.length;
                }
                setKey(newKey);
            }
            else if(e.keyCode===40){
                let newKey=key+1;
                if(newKey>searchResults.length){
                    newKey=0;
                }
                setKey(newKey);
            }
        }
    };
    const onHandleSubmit = (e) => {
        e.preventDefault();
        submitForm();
    };
    const onSearchFocus = ()=>{
        setSearchActive(true);
    };
    const onSearchMobileFocus=()=>{
        setMobileSearchActive(true);
    };
    const onSearchQueryBlur = (e)=>{
        if(!e.currentTarget.contains(e.relatedTarget)){
            clearSearch();
        }
    };
    const onSearchMobileQueryBlur = (e)=>{
        setSearchResults(null);
        setMobileSearchActive(false);
    };
    const onSearchQueryChange = (e) => {
        const {value}=e.target;
        if(value==''){
            setSearchQuery(undefined);
            setSearchResults(null);
        }
        else{
            setSearchQuery(value);
        }
    };
    const submitForm = () => {
        getRelatedStocks(searchQuery).then((res)=>{
            const searchResult=res.searchResult;
            setSearchResults(searchResult)
        });
    };
    useEffect(()=>{
        getRelatedStocks(searchQuery).then((res)=>{
            const searchResult=res.searchResult;
            setSearchResults(searchResult);
        });

    },[searchQuery]);
    useEffect(()=>{
        const resize = () =>{
            if(window.innerWidth>768){
                setSearchActiveResize(false);
            }
            else{
                setSearchActiveResize(true);
            }
        };
        resize();
        window.addEventListener('resize',resize);
        return ()=>{
            window.removeEventListener('resize',resize);
        };
    },[]);
    return { key,searchQuery,searchResults,searchActive,mobileSearchActive,searchActiveResize,
        onKeyHandle,onSearchQueryBlur,onSearchMobileQueryBlur,onSearchFocus,onSearchMobileFocus,
        onSearchQueryChange,onHandleSubmit,onStockSearch,onKeyHandleSearch };
};

export {SearchBoxContext};