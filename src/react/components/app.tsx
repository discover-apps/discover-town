import {hot} from 'react-hot-loader/root';
import React from 'react';
import 'assets/scss/app.scss';
import Navbar from "./navbar/navbar";
import Register from "./login/register";

const App = () => {
    return (
        <div className="app_container">
            <Navbar/>
            <div className="app_inner">
                {/*<Login/>*/}
                <Register/>
            </div>
        </div>
    )
};

export default hot(App);