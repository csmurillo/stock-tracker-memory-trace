import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import PrivateRoute from "./authentication/PrivateRoute";

// auth
import Signin from "./authentication/Signin";
import Signup from "./authentication/Signup";

import Home from "./pages/Home";
import Account from "./pages/Account";
import Settings from "./pages/Settings";

const Routes = () =>{
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/signin" exact component={Signin}/>
                <Route path="/signup" exact component={Signup}/>
                <PrivateRoute path="/account" exact component={Account}/>
                <PrivateRoute path="/settings" exact component={Settings}/>
            </Switch>
        </BrowserRouter>
    );
}
export default Routes;