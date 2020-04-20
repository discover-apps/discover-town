import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {CircularProgress} from "@material-ui/core";
import {followUser, unfollowUser, userFollowsUser} from "../../api/user.api";
import {User} from "../../models/user.model";
import Placeholder from "../../../assets/img/placeholder_person.jpg";

interface Props {
    user: User;
    page: number;
    setPage: any;
    followers: number;
}

export const ProfileHeader = (props: Props) => {
    const history = useHistory();
    const selected = (page: number) => {
        return props.page == page ? 'selected' : '';
    };
    return (
        <section className="profile-header elevation-4">
            <div className="user">
                <div className="photo">
                    <img src={Placeholder} alt="user_image"/>
                </div>
                <div className="details">
                    <h3>{props.user ? props.user.username : 'Loading...'}</h3>
                    <h5 onClick={() => history.push(`/profile/${props.user.username}/followers/`)}>{props.followers} Followers</h5>
                </div>
                <div className="follow-button">
                    <FollowButton user={props.user}/>
                </div>
            </div>
            <div className="menu">
                <div className={`option ${selected(0)}`} onClick={() => props.setPage(0)}>
                    activity
                </div>
                <div className={`option ${selected(1)}`} onClick={() => props.setPage(1)}>
                    events
                </div>
                <div className={`option ${selected(2)}`} onClick={() => props.setPage(2)}>
                    details
                </div>
            </div>
        </section>
    )
};

interface FollowButtonProps {
    user: User;
}

export const FollowButton = (props: FollowButtonProps) => {
    const history = useHistory();
    const currentUser: User = useSelector((state: any) => state.auth.currentUser);
    const userIsCurrentUser: boolean = currentUser && currentUser.username === props.user.username;
    const [currentUserIsFollowingUser, setCurrentUserIsFollowingUser] = useState(false);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (currentUser && !userIsCurrentUser) {
            userFollowsUser(props.user).then((result: boolean) => {
                setCurrentUserIsFollowingUser(result);
            }).finally(() => {
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
    const clickEditButton = () => {
        history.push(`/profile/edit`);
    };
    if (loading) {
        return <button>
            <CircularProgress size={18} color="secondary"/>
        </button>
    } else if (userIsCurrentUser) {
        return <button className="outline-button" onClick={() => clickEditButton()}>
            Edit
        </button>
    } else if (currentUserIsFollowingUser) {
        return <button className="outline-button" onClick={() => clickUnfollowButton()}>
            Following
        </button>
    } else {
        return <button onClick={() => clickFollowButton()}>
            Follow
        </button>
    }
};