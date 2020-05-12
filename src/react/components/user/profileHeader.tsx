import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {Link, useHistory} from "react-router-dom";
import {CircularProgress} from "@material-ui/core";
import {followUser, unfollowUser, userFollowsUser} from "../../api/user.api";
import {User} from "../../models/user.model";
import Placeholder from "../../../assets/img/placeholder_person.jpg";
import {verifyAdmin} from "../../api/auth.api";

interface Props {
    user: User;
    page: number;
    setPage: any;
    followers: number;
}

export const ProfileHeader = (props: Props) => {
    const history = useHistory();
    const selected = (page: number) => {
        return props.page == page ? "selected" : "";
    };
    const [admin, setAdmin] = useState(false);

    useEffect(() => {
        // check if user is an admin
        verifyAdmin().then((admin: boolean) => {
            setAdmin(admin);
        });
    }, []);

    return (
        <header className="sub-menu elevation-4">
            <div className="actions">
                <div className="back-action">
                    <a onClick={() => history.goBack()}>{"< Back"}</a>
                </div>
                <h3 className="title">User</h3>
                <div className="forward-action">
                    {admin ? <Link to={`/user/${props.user.username}/manage`}>Manage</Link> : ""}
                </div>
            </div>
            <div className="user">
                <div className="photo">
                    <img src={Placeholder} alt="user_image"/>
                </div>
                <div className="details">
                    <h3>{props.user ? props.user.username : "Loading..."}</h3>
                    <h5 onClick={() => history.push(`/profile/${props.user.username}/followers/`)}>{props.followers} Followers</h5>
                </div>
                <div className="follow-button">
                    <FollowButton user={props.user}/>
                </div>
            </div>
            <div className="tabs tabs-3">
                <div className={`tab ${selected(0)}`} onClick={() => props.setPage(0)}>
                    events
                </div>
                <div className={`tab ${selected(1)}`} onClick={() => props.setPage(1)}>
                    activity
                </div>
                <div className={`tab ${selected(2)}`} onClick={() => props.setPage(2)}>
                    details
                </div>
            </div>
        </header>
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