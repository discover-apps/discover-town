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
                return <ProfileActivity/>;
            case 1:
                return <ProfileEvents/>;
            case 2:
                return '';
            default:
                return <ProfileActivity/>;
        }
    };

    return (
        <main>
            <ProfileHeader selectPage={setPage} selectedPage={page}/>
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