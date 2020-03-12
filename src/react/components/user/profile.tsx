import React, {useEffect, useState} from 'react';
import {User} from "../../models/user.model";
import {getUserProfile} from "../../api/user.api";
import {useParams} from 'react-router-dom';
import {ProfileHeader} from "./profileHeader";
import {ProfileActivity} from "./profileActivity";
import {ProfileEvents} from "./profileEvents";
import {useSelector} from "react-redux";

export const Profile = () => {

    const currentUser = useSelector((state: any) => state.auth.currentUser);
    const [user, setUser] = useState(undefined);
    const [page, setPage] = useState(0);
    const {username} = useParams();

    useEffect(() => {
        if (username) {
            getUserProfile(username).then((user: User) => {
                setUser(user);
            });
        } else {
            setUser(currentUser);
        }

    }, [username, currentUser]);

    const loadPage = () => {
        switch (page) {
            case 0:
                return <ProfileActivity user={user}/>;
            case 1:
                return <ProfileEvents user={user}/>;
            case 2:
                return '';
            default:
                return <ProfileActivity user={user}/>;
        }
    };

    return (
        <main>
            <ProfileHeader user={user} selectPage={setPage} selectedPage={page}/>
            {loadPage()}
        </main>
    )
};

export default Profile;