import React, {useEffect, useState} from 'react';
import {User} from "../../models/user";
import {getUserProfile} from "../../api/user.api";

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
    return (<p><b>Email: </b> {user.email}</p>)
};