import {hot} from 'react-hot-loader/root';
import React from 'react';
import 'assets/scss/app.scss';
import Navbar from "./navbar/navbar";
import Login from "./login/login";

const App = () => {
    return (
        <div className="app_container">
            <Navbar/>
            <div className="app_inner">
                <Login/>
            </div>
        </div>
    )
};

export default hot(App);