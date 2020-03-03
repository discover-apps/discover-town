import React from 'react';
import 'assets/scss/app.scss';
import {hot} from 'react-hot-loader/root';
import {BrowserRouter, Route, Switch,} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import {setJwt} from "../store/actions/auth.action";

import Sidebar from "./sidebar/sidebar";
import Navbar from "./navbar/navbar";
import Register from "./login/register";
import Login from "./login/login";
import Browse from "./home/browse";
import Event from './event/event';
import Home from "./home/home";
import Profile from "./user/profile";

const App = () => {

    const dispatch = useDispatch();
    const sidebarOpen = useSelector((state: any) => state.sidebar.open);

    /* when app starts, load saved jwt if available, this acts as a authorized session. */
    // TODO: Authenticate loaded jwt before automatically logging in user
    localStorage.getItem("jwt") ? dispatch(setJwt(localStorage.getItem("jwt"))) : null;

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
                        <Route path="/profile" component={Profile}/>
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