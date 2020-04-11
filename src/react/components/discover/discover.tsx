import React from "react";
import {Link} from "react-router-dom";
import Placeholder from "../../../assets/img/placeholder_item.png";

export const Discover = () => {
    return (
        <main className="discover">
            <DiscoverCategory/>
        </main>
    );
};

const DiscoverCategory = () => {
    return (
        <div className="category">
            <div className="menu">
                <div className="title">
                    Monuments
                </div>
                <div className="link">
                    <Link to={`/`}>See all ></Link>
                </div>
            </div>
            <div className="items">
                <DiscoverItem/>
                <DiscoverItem/>
            </div>
        </div>
    );
};

const DiscoverItem = () => {
    return (
        <div className="item">
            <img src={Placeholder} alt="place_image"/>
            <div className="overlay">
                <span>Item Title Goes Here</span>
            </div>
        </div>
    );
};