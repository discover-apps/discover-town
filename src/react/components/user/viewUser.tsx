import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {CircularProgress} from "@material-ui/core";
import {readUserByUsername, readUserFollowerCount} from "../../api/user.api";
import {ProfileHeader} from "./profileHeader";
import {ProfileActivity} from "./profileActivity";
import {ProfileEvents} from "./profileEvents";
import {ProfileDetails} from "./profileDetails";
import {ErrorPage} from "../error/error";
import {User} from "../../models/user.model";

export const ViewUser = () => {
    let {username} = useParams();
    const [loading, setLoading] = useState<boolean>(true);
    const [user, setUser] = useState(undefined);
    const [followers, setFollowers] = useState<number>(0);
    const [page, setPage] = useState(0);

    useEffect(() => {
        const interval = setTimeout(() => {
            if (username) {
                // get user object from server
                readUserByUsername(username).then((user: User) => {
                    // get user followers from server
                    readUserFollowerCount(user).then((users: number) => {
                        setUser(user);
                        setFollowers(users);
                    }).finally(() => {
                        setLoading(false);
                    });
                }).finally(() => {
                    setLoading(false);
                });
            } else {
                setLoading(false);
            }
        }, 333);
        return () => clearInterval(interval);
    }, []);

    if (loading) {
        return <div className="loading">
            <CircularProgress/>
        </div>
    } else if (user != undefined) {
        return <main>
            <ProfileHeader user={user} setPage={setPage} page={page} followers={followers}/>
            <ProfileBody user={user} page={page}/>
        </main>
    } else {
        return <ErrorPage/>
    }
};
export default ViewUser;

interface ProfileBodyProps {
    page: number;
    user: User;
}

const ProfileBody = (props: ProfileBodyProps) => {
    switch (props.page) {
        case 0:
            return <ProfileEvents user={props.user}/>;
        case 1:
            return <ProfileActivity user={props.user}/>;
        case 2:
            return <ProfileDetails user={props.user}/>;
        default:
            return <ProfileEvents user={props.user}/>;
    }
};