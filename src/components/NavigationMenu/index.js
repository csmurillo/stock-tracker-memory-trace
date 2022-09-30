import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {isAuthenticated} from '../../authentication/authApi';
import './index.css';
import { GrMenu,GrFormClose } from "react-icons/gr";
import {FaUserCircle} from "react-icons/fa";
const NavigationMenu = ({setMenuActive}) =>{
    const [active, setActive]=useState(false);
    const menuIconClick = () =>{
        setActive(!active);
        setMenuActive(!active);
    };
    const linkCloseMenu = ()=>{
        setActive(!active);
        setMenuActive(!active);
    };
    const userNavigate = ()=>(
        <ul id="user-navigate-mobile" className="container">
            <li id="profile-logo" className="user-profile nav-items">
                <div style={{ fontSize:'55px'}}>
                    <FaUserCircle style={{color:'lightgreen'}}/>
                </div>
            </li>
            <Link to="/signin" onClick={linkCloseMenu} style={{color:'black',textDecoration:'none'}}>
                <li id="login-mobile" className="nav-items link-cont">
                    Login
                </li>
            </Link>
            <Link to="/signup" onClick={linkCloseMenu} style={{color:'black',textDecoration:'none'}}>
                <li id="signup-mobile" className="nav-items link-cont">
                    Signup
                </li>
            </Link>
        </ul>
    );
    const userSignedin = ()=>(
        <ul id='user-signedin-mobile' className="container">
            <li id="profile-signedin-logo" className="user-profile nav-items">
                <div style={{ fontSize:'55px'}}>
                    <FaUserCircle style={{color:'lightgreen'}}/>
                </div>
                <div style={{ fontSize:'35px'}}>Angel M</div>
            </li>
            <Link to="/watchlist" onClick={linkCloseMenu} style={{color:'black',textDecoration:'none'}}>
                <li className="nav-items link-cont">
                        Watch List
                </li>
            </Link>
            <Link to="/account" onClick={linkCloseMenu} style={{color:'black',textDecoration:'none'}}>
                <li id="account-mobile" className="nav-items link-cont">
                    Account
                </li>
            </Link>
            <Link to="/security" onClick={linkCloseMenu} style={{color:'black',textDecoration:'none'}} className="link">
                <li id="security-mobile" className="nav-items link-cont">
                    Settings
                </li>
            </Link>
            {/* <Link  style={{color:'black',textDecoration:'none'}}> */}
                <li id="logout-mobile" className="nav-items link-cont">
                    Logout
                </li>
            {/* </Link> */}
        </ul>
    );
    return (
        <div id="navigation-menu">
            <div id="menu-icon-container" onClick={menuIconClick}>
                { active ? <GrFormClose style={{fontSize:50}}/> : <GrMenu style={{fontSize:28}}/> }
            </div>
            <div id="navigation-sidebar-menu-container" className={`${ active ? 'd-flex':'' }`}>
                <nav id="navigation-sidebar-menu"  className={`container ${ active ? 'active':'' }`}>
                    {/* user visitor */}
                    {!isAuthenticated() && userNavigate()}
                    {/* user logged in */}
                    {isAuthenticated() && userSignedin()}
                </nav>
            </div>
        </div>
    );
};
export default NavigationMenu;