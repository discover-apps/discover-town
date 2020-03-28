import React from 'react';
import TodayIcon from '@material-ui/icons/Today';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PersonIcon from '@material-ui/icons/Person';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import {User} from "../../models/user.model";

interface ProfileDetailsProps {
    user: User;
}

export const ProfileDetails = (props: ProfileDetailsProps) => {
    return (
        <section className="profile-details elevation-4">
            <h3>Joined</h3>
            <div className="property">
                <TodayIcon/><span>{props.user.joined}</span>
            </div>
            <h3>Location</h3>
            <div className="property">
                <LocationOnIcon/><span>{props.user.city}, {props.user.state}, {props.user.country}</span>
            </div>
            <h3>Name</h3>
            <div className="property">
                <PersonIcon/><span>Jason Efthimiou</span>
            </div>
            <h3>Social</h3>
            <div className="property">
                <FacebookIcon/><span>Jason Efthimiou</span>
            </div>
            <div className="property">
                <InstagramIcon/><span>@jasonefthimiou</span>
            </div>
        </section>
    )
};