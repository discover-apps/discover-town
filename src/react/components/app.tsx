import {hot} from 'react-hot-loader/root';
import React from 'react';
import 'assets/scss/app.scss';
import {BrowserRouter, Route, Switch,} from "react-router-dom";
import Navbar from "./navbar/navbar";
import Register from "./login/register";
import Login from "./login/login";
import Browse from "./home/browse";
import Event from './event/event';

const App = () => {
    return (
        <div className="app_container">
            <Navbar/>
            <div className="app_inner">
                <BrowserRouter>
                    <Switch>
                        <Route path="/login" component={Login}/>
                        <Route path="/register" component={Register}/>
                        <Route path="/browse" component={Browse}/>
                        <Route path="/event" component={Event}/>
                    </Switch>
                </BrowserRouter>
            </div>
        </div>
    )
};

export default hot(App);