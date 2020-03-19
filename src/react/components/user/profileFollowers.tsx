import React, {useEffect, useState} from 'react';
import Placeholder from "../../../assets/img/placeholder_person.jpg";
import {User} from "../../models/user.model";
import {getUserFollowers, getUserFollowing, getUserProfile} from "../../api/user.api";
import {useHistory, useParams} from "react-router-dom";
import {FollowButton} from "./profileHeader";
import {useSelector} from "react-redux";

export const ProfileFollowers = () => {
    let {username} = useParams();
    const history = useHistory();
    const currentUser = useSelector((state: any) => state.auth.currentUser);
    const [page, setPage] = useState(0);

    return (
        <main className="profile-followers">
            <section className="menu elevation-3">
                <div className={`option ${page == 0 ? 'selected' : ''}`} onClick={() => setPage(0)}>
                    Followers
                </div>
                <div className={`option ${page == 1 ? 'selected' : ''}`} onClick={() => setPage(1)}>
                    Following
                </div>
            </section>
            {
                page == 0 ?
                    <ProfileFollowersFollowers history={history} username={username} currentUser={currentUser}
                                               page={page}/>
                    :
                    <ProfileFollowersFollowing history={history} username={username} currentUser={currentUser}
                                               page={page}/>
            }
        </main>
    );
};

interface ProfileFollowersProps {
    history: any;
    username: string;
    currentUser: User;
    page: number;
}

const ProfileFollowersFollowers = (props: ProfileFollowersProps) => {
    const [followers, setFollowers] = useState([]);
    const navigateTo = (url: string) => {
        props.history.push(url);
    };

    useEffect(() => {
        getUserProfile(props.username).then((user: User) => {
            getUserFollowers(user).then((followers: User[]) => {
                setFollowers(followers);
            });
        });
    }, [props.page]);
    return (
        <section className="followers">
            {
                followers.map((f, i) => <ProfileFollower key={i} user={f} currentUser={props.currentUser}
                                                         navigateTo={navigateTo}/>)
            }
        </section>
    )
};

const ProfileFollowersFollowing = (props: ProfileFollowersProps) => {
    const [followers, setFollowers] = useState([]);
    const navigateTo = (url: string) => {
        props.history.push(url);
    };

    useEffect(() => {
        getUserProfile(props.username).then((user: User) => {
            getUserFollowing(user).then((followers: User[]) => {
                setFollowers(followers);
            });
        });
    }, [props.page]);
    return (
        <section className="followers">
            {
                followers.map((f, i) => <ProfileFollower key={i} user={f} currentUser={props.currentUser}
                                                         navigateTo={navigateTo}/>)
            }
        </section>
    )
};

interface ProfileFollower {
    user: User;
    navigateTo: any;
    currentUser: User;
}

const ProfileFollower = (props: ProfileFollower) => {
    return (
        <div className="follower">
            <div className="image">
                <img src={Placeholder} alt="user_image"/>
            </div>
            <div className="details">
                <span className="name">{props.user.name}</span>
                <span className="username">{props.user.username}</span>
            </div>
            <div className="follow-button">
                <FollowButton user={props.user} currentUser={props.currentUser} navigateTo={props.navigateTo}/>
            </div>
        </div>
    );
};