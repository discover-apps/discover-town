import React from 'react';
import Placeholder from '../../../assets/img/placeholder_item.png';
import {User} from "../../models/user.model";

interface Props {
    user: User;
}

export const ProfileEvents = (props: Props) => {
    return (
        <section className="profile-events elevation-4">
            <Event/>
            <Event/>
            <Event/>
            <Event/>
            <Event/>
            <Event/>
            <Event/>
            <Event/>
        </section>
    )
};

const Event = () => {
    return (
        <div className="event">
            <div className="image">
                <img src={Placeholder} alt=""/>
            </div>
            <div className="details">
                <h3>The incredible ibex defies gravity and climbs a dam | Forces of Nature with… </h3>
                <h4>Google Events</h4>
                <h5>12 minutes ago</h5>
            </div>
        </div>
    )
};