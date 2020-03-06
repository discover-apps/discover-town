import React from 'react';
import 'assets/scss/app.scss';
import {hot} from 'react-hot-loader/root';
import {BrowserRouter, Route, Switch,} from "react-router-dom";
import {useSelector} from 'react-redux';

import Sidebar from "./sidebar/sidebar";
import Navbar from "./navbar/navbar";
import Register from "./login/register";
import Login from "./login/login";
import Browse from "./home/browse";
import Event from './event/event';
import Home from "./home/home";
import Profile from "./user/profile";
import {ProtectedRoute} from "../util/protected.route";
import {loadClientAuthorization} from "../util/auth";

const App = () => {
    const sidebarOpen = useSelector((state: any) => state.sidebar.open);

    loadClientAuthorization();

    return (
        <div className="app_container no-scroll">
            <BrowserRouter>
                <header>
                    <Navbar/>
                </header>
                <div className="app_inner">
                    <Switch>
                        <Route path="/login" component={Login}/>
                        <Route path="/register" component={Register}/>
                        <Route path="/browse" component={Browse}/>
                        <Route path="/event" component={Event}/>
                        <ProtectedRoute path="/profile" component={Profile}/>
                        <Route path="/" component={Home}/>
                    </Switch>
                </div>
                <div className="app_modal_portal">
                    {sidebarOpen ? <Sidebar/> : ''}
                </div>
            </BrowserRouter>
        </div>
    )
};

export default hot(App);