import React, {useState} from "react";
import "assets/scss/app.scss";
import {hot} from "react-hot-loader/root";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {useSelector} from "react-redux";
import {CircularProgress} from "@material-ui/core";

import Sidebar from "./sidebar/sidebar";
import Navbar from "./navbar/navbar";
import Register from "./login/register";
import Login from "./login/login";
import {BrowseEvents} from "./browse/browseEvents";
import {ViewEvent} from "./event/viewEvent";
import Home from "./home/home";
import ViewUser from "./user/viewUser";
import {ProtectedRoute} from "../util/protected.route";
import {ProfileEdit} from "./user/profileEdit";
import {ProfileFollowers} from "./user/profileFollowers";
import {CreateEvent} from "./event/createEvent";
import {loadClientAuthorization} from "../util/auth";
import {UpdateEvent} from "./event/updateEvent";
import {ErrorPage} from "./error/error";
import {Events} from "./event/events";
import {Discover} from "./discover/discover";
import {DiscoverCategory} from "./discover/discoverCategory";
import {DiscoverPlace} from "./discover/discoverPlace";
import {ListAttendees} from "./event/listAttendees";

const App = () => {
    const sidebarOpen = useSelector((state: any) => state.sidebar.open);
    const [loaded, setLoaded] = useState<boolean>(false);
    loadClientAuthorization().finally(() => {
        setLoaded(true);
    });

    if (loaded) {
        return <div className="app_container no-scroll">
            <BrowserRouter>
                <header>
                    <Navbar/>
                </header>
                <div className="app_inner">
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/login" component={Login}/>
                        <Route exact path="/register" component={Register}/>
                        <Route exact path="/browse" component={BrowseEvents}/>
                        <Route exact path="/discover" component={Discover}/>
                        <Route exact path="/discover/:category" component={DiscoverCategory}/>
                        <Route exact path="/discover/place/:place_id" component={DiscoverPlace}/>
                        <ProtectedRoute exact path="/events/" component={Events}/>
                        <Route exact path="/event/view/:id" component={ViewEvent}/>
                        <Route exact path="/event/view/:id/attendees/" component={ListAttendees}/>
                        <ProtectedRoute exact path="/event/update/:id" component={UpdateEvent}/>
                        <ProtectedRoute exact path="/event/create/" component={CreateEvent}/>
                        <ProtectedRoute exact path="/profile/edit/" component={ProfileEdit}/>
                        <Route exact path='/profile/:username' component={ViewUser}/>
                        <Route exact path='/profile/:username/followers' component={ProfileFollowers}/>
                        <Route path="/" component={ErrorPage}/>
                    </Switch>
                </div>
                <div className="app_modal_portal">
                    {sidebarOpen ? <Sidebar/> : ""}
                </div>
            </BrowserRouter>
        </div>
    } else {
        return <div className="loading">
            <CircularProgress/>
        </div>
    }
};

export default hot(App);