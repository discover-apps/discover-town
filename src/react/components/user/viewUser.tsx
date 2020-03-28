import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {useSelector} from "react-redux";
import {User} from "../../models/user.model";
import {readUserByUsername} from "../../api/user.api";
import {ProfileHeader} from "./profileHeader";
import {ProfileActivity} from "./profileActivity";
import {ProfileEvents} from "./profileEvents";
import {ProfileDetails} from "./profileDetails";

export const ViewUser = () => {
    let {username} = useParams();
    const history = useHistory();
    const navigateTo = (url: string) => {
        history.push(url);
    };
    const currentUser = useSelector((state: any) => state.auth.currentUser);
    const [user, setUser] = useState(undefined);
    const [page, setPage] = useState(0);
    useEffect(() => {
        if (username) {
            readUserByUsername(username).then((user: User) => {
                setUser(user);
            });
        } else if (currentUser) {
            setUser(currentUser);
        } else {
            history.push('/');
        }
    }, [username, currentUser]);
    if (user) {
        return (
            <main>
                <ProfileHeader user={user}
                               currentUser={currentUser}
                               selectPage={setPage}
                               selectedPage={page}
                               navigateTo={navigateTo}
                />
                <ProfileBody page={page}
                             user={user}
                />
            </main>
        )
    } else {
        return <ProfileNotFound/>;
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
            return <ProfileActivity user={props.user}/>;
        case 1:
            return <ProfileEvents user={props.user}/>;
        case 2:
            return <ProfileDetails user={props.user}/>;
        default:
            return <ProfileActivity user={props.user}/>;
    }
};

const ProfileNotFound = () => {
    return (
        <main>
            <h1>User not found</h1>
        </main>
    )
};