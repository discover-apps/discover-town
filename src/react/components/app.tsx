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
import {ViewEvent} from './event/viewEvent';
import Home from "./home/home";
import Profile from "./user/profile";
import {ProtectedRoute} from "../util/protected.route";
import {ProfileEdit} from "./user/profileEdit";
import {ProfileFollowers} from "./user/profileFollowers";
import {CreateEvent} from "./event/createEvent";

const App = () => {
    const sidebarOpen = useSelector((state: any) => state.sidebar.open);

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
                        <Route exact path="/event/:id" component={ViewEvent}/>
                        <ProtectedRoute exact path="/event/create" component={CreateEvent}/>
                        <ProtectedRoute exact path="/profile/edit/" component={ProfileEdit}/>
                        <Route exact path='/profile/:username' component={Profile}/>
                        <Route exact path='/profile/:username/followers' component={ProfileFollowers}/>
                        <Route exact path='/profile' component={Profile}/>
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