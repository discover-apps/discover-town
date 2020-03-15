import React, {useEffect, useState} from 'react';
import {User} from "../../models/user.model";
import Placeholder from '../../../assets/img/placeholder_person.jpg';
import {followUser, unfollowUser, userFollowsUser} from "../../api/user.api";
import {CircularProgress} from "@material-ui/core";

interface Props {
    user: User;
    currentUser: User;
    selectPage: any;
    selectedPage: number;
    navigateTo: any;
}

export const ProfileHeader = (props: Props) => {

    const selected = (page: number) => {
        return props.selectedPage == page ? 'selected' : '';
    };

    return (
        <section className="profile-header elevation-4">
            <div className="user">
                <div className="photo">
                    <img src={Placeholder} alt="user_image"/>
                </div>
                <div className="details">
                    <h3>{props.user ? props.user.username : 'Loading...'}</h3>
                    <h5>100 Followers</h5>
                </div>
                <div className="follow-button">
                    <FollowButton user={props.user} currentUser={props.currentUser} navigateTo={props.navigateTo}/>
                </div>
            </div>
            <div className="menu">
                <div className={`option ${selected(0)}`} onClick={() => props.selectPage(0)}>
                    activity
                </div>
                <div className={`option ${selected(1)}`} onClick={() => props.selectPage(1)}>
                    events
                </div>
                <div className={`option ${selected(2)}`} onClick={() => props.selectPage(2)}>
                    details
                </div>
            </div>
        </section>
    )
};

interface FollowButtonProps {
    user: User;
    currentUser: User;
    navigateTo: any;
}

const FollowButton = (props: FollowButtonProps) => {
    const userIsCurrentUser: boolean = props.currentUser && props.currentUser.username === props.user.username;
    const navigateToEditProfile = () => props.navigateTo('/profile/edit/');
    const [currentUserIsFollowingUser, setCurrentUserIsFollowingUser] = useState(false);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (props.currentUser && !userIsCurrentUser) {
            userFollowsUser(props.user).then((result: boolean) => {
                setCurrentUserIsFollowingUser(result);
                setLoading(false);
            });
        } else {
            setLoading(false);
        }
    }, [loading]);

    const clickFollowButton = async () => {
        setLoading(true);
        await followUser(props.user);
    };

    const clickUnfollowButton = async () => {
        setLoading(true);
        await unfollowUser(props.user);
    };

    if (loading) {
        return (
            <button>
                <CircularProgress size={18} color="primary"/>
            </button>
        )
    } else if (userIsCurrentUser) {
        return (
            <button className="outline-button"
                    onClick={() => navigateToEditProfile()}>
                Edit
            </button>
        );
    } else if (currentUserIsFollowingUser) {
        return (
            <button className="outline-button"
                    onClick={() => clickUnfollowButton()}>
                Following
            </button>
        );
    } else {
        return (
            <button onClick={() => clickFollowButton()}>
                Follow
            </button>
        )
    }
};