import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import PrivateRoute from "./authentication/PrivateRoute";

// auth
import Signin from "./authentication/Signin";
import Signup from "./authentication/Signup";

// stock
import Stock from "./pages/Stock";

import WatchList from "./pages/WatchList";

import Home from "./pages/Home";
import Account from "./pages/Account";
import Settings from "./pages/Settings";

// Settings Subpages
import EditProfile from "./pages/EditProfile";
import ChangePassword from "./pages/ChangePassword";
import SmsAlerts from "./pages/SmsAlerts";
import DeleteAccount from "./pages/DeleteAccount";

const Routes = () =>{
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/signin" exact component={Signin}/>
                <Route path="/signup" exact component={Signup}/>
                <Route path="/stock/:tickerSymbol" component={Stock}/>
                <PrivateRoute path="/account" exact component={Account}/>
                <PrivateRoute path="/settings" exact component={Settings}/>
                <PrivateRoute path="/profile" exact component={EditProfile}/>
                <PrivateRoute path="/changepassword" exact component={ChangePassword}/>
                <PrivateRoute path="/smsalerts" exact component={SmsAlerts}/>
                <PrivateRoute path="/delete" exact component={DeleteAccount}/>
                <PrivateRoute path="/watchlist" exact component={WatchList}/>
            </Switch>
        </BrowserRouter>
    );
}
export default Routes;