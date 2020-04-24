import React, {useEffect, useState} from "react";
import TodayIcon from "@material-ui/icons/Today";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import {User} from "../../models/user.model";
import {CircularProgress} from "@material-ui/core";
import moment from "moment";

interface ProfileDetailsProps {
    user: User;
}

export const ProfileDetails = (props: ProfileDetailsProps) => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const delay = setTimeout(() => {
            setLoading(false);
        }, 333);
    }, []);
    if (loading) {
        return <div className="loading">
            <CircularProgress/>
        </div>
    } else {
        return <section className="profile-details elevation-4">
            <h3>Joined</h3>
            <div className="property">
                <TodayIcon/><span>{moment(props.user.joined).format("LL")}</span>
            </div>
            <h3>Location</h3>
            <div className="property">
                <LocationOnIcon/><span>{props.user.city}, {props.user.state}, {props.user.country}</span>
            </div>
        </section>
    }
};