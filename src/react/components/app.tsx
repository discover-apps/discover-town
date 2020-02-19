import {hot} from 'react-hot-loader/root';
import React from 'react';
import 'assets/scss/app.scss';
import Navbar from "./navbar/navbar";
import Register from "./login/register";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Login from "./login/login";

const App = () => {
    return (
        <div className="app_container">
            <Navbar/>
            <div className="app_inner">
                <BrowserRouter>
                    <Switch>
                        <Route path="/login" component={Login}/>
                        <Route path="/register" component={Register}/>
                    </Switch>
                </BrowserRouter>
            </div>
        </div>
    )
};

export default hot(App);