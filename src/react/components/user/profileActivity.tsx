import React, {useEffect, useState} from 'react';
import EventIcon from '@material-ui/icons/Event';
import GroupIcon from '@material-ui/icons/Group';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Placeholder from '../../../assets/img/placeholder_item.png';
import {User} from "../../models/user.model";
import {CircularProgress} from "@material-ui/core";

interface Props {
    user: User;
}

export const ProfileActivity = (props: Props) => {
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        const delay = setTimeout(() => {
            setLoading(false);
        }, 333);
        return () => clearInterval(delay);
    });
    if (loading) {
        return <div className="loading">
            <CircularProgress/>
        </div>
    } else {
        return <section className="profile-activity elevation-4">
            <EventActivity/>
            <FollowActivity/>
            <LikeActivity/>
        </section>
    }
};
const EventActivity = () => {
    return (
        <div className="activity">
            <div className="image">
                <img src={Placeholder} alt="user_image"/>
            </div>
            <div className="details">
                Google Events posted an event: <b>The point of using Lorem Ipsum is that it has a more-or-less normal
                distribution</b>
            </div>
            <div className="icon">
                <EventIcon/>
            </div>
        </div>
    )
};
const FollowActivity = () => {
    return (
        <div className="activity">
            <div className="image">
                <img src={Placeholder} alt="user_image"/>
            </div>
            <div className="details">
                Google Events followed <b>Lorem Ipsum</b>
            </div>
            <div className="icon">
                <GroupIcon/>
            </div>
        </div>
    )
};
const LikeActivity = () => {
    return (
        <div className="activity">
            <div className="image">
                <img src={Placeholder} alt="user_image"/>
            </div>
            <div className="details">
                Google Events liked <b>Lorem Ipsum's</b> event: <b>This book is a treatise on the theory of</b>
            </div>
            <div className="icon">
                <FavoriteIcon/>
            </div>
        </div>
    )
};