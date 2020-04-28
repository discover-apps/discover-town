import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import Placeholder from "../../../assets/img/placeholder_person.jpg";
import {banUser, readUserByUsername} from "../../api/user.api";
import {CircularProgress} from "@material-ui/core";
import {User} from "../../models/user.model";

export const ManageUser = () => {
    const {username} = useParams();
    const [user, setUser] = useState(undefined);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        readUserByUsername(username).then((user: User) => {
            setUser(user);
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <div className="loading">
            <CircularProgress/>
        </div>
    } else if (user == undefined) {
        return <div className="error">
            <p>Failed to load user please try again.</p>
        </div>
    } else {
        return <main className="profile-edit">
            <h3>Manage Profile</h3>
            <ProfilePicture/>
            <ProfileForm user={user} setUser={setUser}/>
        </main>
    }
};

const ProfilePicture = () => {
    return (
        <section className="picture">
            <div className="image">
                <img src={Placeholder} alt=""/>
            </div>
            <br/>
        </section>
    )
};

interface FormProps {
    user: User;
    setUser: any;
}

const ProfileForm = (props: FormProps) => {
    return (
        <section className="profile">
            <form autoComplete="off">
                <input type="username"
                       id="username"
                       name="username"
                       placeholder="Username"
                       value={props.user.username}
                       disabled
                />
                <input type="email"
                       id="email"
                       name="email"
                       placeholder="Email"
                       value={props.user.email}
                       disabled
                />
                <BanButton user={props.user} setUser={props.setUser}/>
            </form>
            <Link to={`/profile/${props.user.username}`}>Back to profile</Link>
        </section>
    );
};

interface BanButtonProps {
    user: User;
    setUser: any;
}

const BanButton = (props: BanButtonProps) => {
    const [loading, setLoading] = useState(false);
    const clickBanButton = (banned: boolean) => {
        setLoading(true);
        const delay = setTimeout(() => {
            banUser(props.user, banned).then(() => {
                props.setUser({...props.user, banned: banned});
            }).finally(() => {
                setLoading(false);
            });
        }, 250);
        return () => clearInterval(delay);
    };
    if (loading) {
        return <button type="button"><CircularProgress size={18} color="primary"/></button>;
    } else if (!props.user.banned) {
        return <button type="button" onClick={() => clickBanButton(true)}>Ban User</button>;
    } else {
        return <button type="button" onClick={() => clickBanButton(false)}>Unban User</button>;
    }
};