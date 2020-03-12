import React, {useEffect, useState} from 'react';
import {User} from "../../models/user.model";
import {getUserProfile} from "../../api/user.api";
import {deauthorizeClient} from "../../util/auth";
import {useHistory} from 'react-router-dom';
import {ProfileHeader} from "./profileHeader";
import {ProfileActivity} from "./profileActivity";
import {ProfileEvents} from "./profileEvents";

export const Profile = () => {

    const [user, setUser] = useState(undefined);
    const [page, setPage] = useState(0);

    useEffect(() => {
        getUserProfile().then((user: User) => {
            setUser(user);
        });
    }, []);

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

const ProfilePage = (user: User) => {

    const history = useHistory();

    const logoutUser = async () => {
        await deauthorizeClient();
        history.push('/');
    };

    return (
        <section>
            <p><b>Email: </b> {user.email}</p>
            <button onClick={() => logoutUser()}>Log out</button>
        </section>
    )
};