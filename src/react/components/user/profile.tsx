import React, {useEffect, useState} from 'react';
import {User} from "../../models/user.model";
import {getUserProfile} from "../../api/user.api";
import {deauthorizeClient} from "../../util/auth";
import {useHistory} from 'react-router-dom';

export const Profile = () => {

    const [user, setUser] = useState(undefined);

    useEffect(() => {
        getUserProfile().then((user: User) => {
            setUser(user);
        });
    }, []);

    return (<main>
        <h1>My Profile</h1>
        {user ? ProfilePage(user) : 'Logging in user...'}
    </main>)
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