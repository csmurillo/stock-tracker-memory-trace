import React from 'react';
import './styles.css';
import {BsSearch} from 'react-icons/bs';
import Button from '../Button';

import { SearchBoxContext } from '../../context/SearchBoxContext';

const SearchBox = () =>{
    const { key,searchQuery,searchResults,mobileSearchActive,searchActiveResize,
        onKeyHandle,onSearchQueryBlur,onSearchMobileQueryBlur,onSearchFocus,onSearchMobileFocus,
        onSearchQueryChange,onHandleSubmit,onStockSearch,onKeyHandleSearch }=SearchBoxContext();

    return (
        <div id="search-box"  className={(mobileSearchActive && searchActiveResize) ? 'search-box-mobile-active':''} onBlur={onSearchQueryBlur}>
            <div className={'d-flex justify-content-end d-md-none '+(mobileSearchActive?'search-active-toggle':'')}>
                <Button onclick={onSearchMobileFocus} id="search-button" styles={{border: "1px solid lightgray",borderRadius:5,height:'55px',marginRight:'8px',width:'22%', backgroundColor:"white"}}>
                    <BsSearch style={{color:'lightgreen',fontSize:28}}></BsSearch>
                </Button>
            </div>
            <div id="search-input-form" className={"d-md-block " + (mobileSearchActive?'':'d-none')} style={{backgroundColor:'white',height:'100%'}}>
                {
                    (mobileSearchActive && searchActiveResize) && 
                    <div id="search-input-back-container" className="d-flex justify-content-end mt-2 mb-3">
                        <Button id="search-input-back" onclick={onSearchMobileQueryBlur} className="p-2 border" styles={{backgroundColor:'white', borderRadius:5}}>
                            Back
                        </Button>
                    </div>
                }
                <form id="search-form" className="d-flex justify-content-end" onSubmit={onHandleSubmit} autoComplete="off" style={{height:'40px'}}>
                        {
                            (mobileSearchActive && searchActiveResize)
                            ?
                            (<input id="search-input" type="text" name="name" autoComplete="off" placeholder="Search"
                                style={{height:'100%', width:'80%'}}
                                value={searchQuery} onChange={ onSearchQueryChange } 
                                onKeyDown={ e=>{ onKeyHandle(e); onKeyHandleSearch(e);} } 
                                onFocus={onSearchFocus}
                            />)
                            :
                            (<input id="search-input" type="text" name="name" autoComplete="off" placeholder="Search"
                            style={{height:'100%', width:'80%'}}
                            value={searchQuery} onChange={ onSearchQueryChange }
                            onKeyDown={ e=>{ onKeyHandle(e); onKeyHandleSearch(e);} } 
                            onFocus={onSearchFocus}
                        />)
                        }
                        <Button id="search-button" styles={{border: "1px solid lightgray",height:'40px',width:'20%', backgroundColor:"white"}}>
                            <BsSearch style={{color:'lightgreen',fontSize:28}}></BsSearch>
                        </Button>
                </form>
                <div id="search-results-box-container" style={{zIndex:'999'}} tabIndex="0">
                    <div id="search-results-box" className={searchResults!=null?'border':''}>
                    {
                        searchResults!=null && 
                        <div>
                            {searchResults.map((relatedSearch, i) => (
                                    <div id={`item-${i}`} className={`search-result ${key==i?'active':''}`} key={i}>
                                        <div onClick={e=>{ onStockSearch(relatedSearch.symbol);}}>
                                            {'('+relatedSearch.symbol+')' +' '+relatedSearch.name}
                                        </div>
                                    </div>
                            ))}
                        </div>
                    }
                    </div>
                </div>
            </div>
        </div>
    );
};
export default SearchBox;




