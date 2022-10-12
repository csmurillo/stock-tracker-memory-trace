import React,{useState} from 'react';
import { Link, Redirect } from 'react-router-dom';
import { isAuthenticated, logout } from '../../authentication/authApi';
import SearchBox from '../SearchBox';
import NavigationMenu from '../NavigationMenu';
import Button from '../Button';
import logo from '../../assets/images/stock-tracker-logos.png';
import {FaUserCircle} from "react-icons/fa";
import './index.css';
const Header = () =>{
    const [menuActive,setMenuActive]=useState(false);
    const { firstName, lastName } = isAuthenticated();
    const logOff = ()=>{
        logout();
        window.location='/';
    };
    const userNavigate = ()=>(
        <ul id="user-navigate" className="align-self-center d-md-flex d-none mr-4 mb-0">
            <li id="signup" style={{listStyleType:'none'}}>
                <Link to="/signup">
                    <Button className="btn btn-secondary" >
                        Signup
                    </Button>
                </Link>
            </li>
            <li id="login" style={{listStyleType:'none'}}>
                <Link to="/signin">
                    <Button className="ml-3 btn" styles={{backgroundColor:'rgb(138, 233, 138)', color:'white'}}>
                        Login
                    </Button>
                </Link>
            </li>
        </ul>
    );
    const userSignedin = ()=>(
        <div id="user-signedin" className="align-self-center d-md-flex d-none mr-4">
            <div className="dropdown">
                <div data-toggle="dropdown">
                    <div id="user-icon"><FaUserCircle style={{color:'lightgreen'}}/></div>
                    <div id="user-name">
                        {firstName} {lastName}
                    </div>
                </div> 
                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropDownMenu">
                    <Link to="/watchlist">
                        <button id="watchlist" className="dropdown-item" type="button">Watch List</button>
                    </Link>
                    <div className="dropdown-divider"></div>
                    <Link to="/account">
                        <button id="account" className="dropdown-item" type="button">Account</button>
                    </Link>
                    <Link to="/settings">
                        <button id="security" className="dropdown-item" type="button">Settings</button>
                    </Link>
                    <button id="logout" className="dropdown-item" type="button" onClick={logOff}>Logout</button>
                </div>
            </div>
        </div>
    );
    const header= ()=>(
        <div id="header" className="d-flex justify-content-between" style={menuActive?{zIndex:2}:{}}>
                <div id="start" className="d-flex align-self-center ml-4">
                    <Link to="/">
                        <img id="logo"  src={logo}/>
                    </Link>
                </div>
                <div id="end" className="d-flex justify-content-end" style={menuActive?{zIndex:2,backgroundColor:'white'}:{}}>
                    {isAuthenticated() && 
                        <div id="search-box-container" className="d-flex justify-content-center align-items-center w-100" style={{backgroundColor:'white'}}>
                            <div className="w-100">
                                <SearchBox></SearchBox>
                            </div>
                        </div>
                    }
                    <div id="header-options-container" className="d-flex justify-content-center align-self-center">
                        <div className="d-md-none d-flex align-self-center">
                            <NavigationMenu setMenuActive={setMenuActive}></NavigationMenu>
                        </div>
                        {/* user: signed in */}
                        {/* desktop/laptop screen */}
                        {isAuthenticated() && userSignedin()}
                        {/* user: not signin */}
                        {/* desktop/laptop screen */}
                        {!isAuthenticated() && userNavigate()}
                    </div>
                </div>
                
        </div>
    );
    return (
        <header className="container">
            {header()}
        </header>
    );
};
export default Header;