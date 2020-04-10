import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {CircularProgress} from "@material-ui/core";
import {Link, useHistory} from "react-router-dom";
import {useSelector} from "react-redux";
import Placeholder from '../../../assets/img/placeholder_person.jpg';
import {editUserProfile, readUserByUsername} from "../../api/user.api";
import {User} from "../../models/user.model";
import {loadClientAuthorization} from "../../util/auth";

export const ProfileEdit = () => {

    const history = useHistory();
    const currentUser = useSelector((state: any) => state.auth.currentUser);
    const [error, setError] = useState('');
    const [user, setUser] = useState(undefined);
    const [loading, setLoading] = useState(false);

    const postEdit = async () => {
        setError(''); // clear error (if any)
        setLoading(true); // lock submit button
        await setTimeout(() => {
            editUserProfile(user).then(async (message: string) => {
                // update client information
                await loadClientAuthorization();
                // redirect to profile section
                history.push(`/profile/${user.username}`);
            }).catch(async (error) => {
                if (error && error.response) {
                    setError(error.response.data);
                }
            }).finally(async () => {
                setLoading(false);

            });
        }, 1000);
    };

    useEffect(() => {
        if (currentUser) {
            readUserByUsername(currentUser.username).then((user: User) => {
                setUser(user);
            });
        }
    }, [currentUser]);

    return (
        <main className="profile-edit">
            <h3>Edit Profile</h3>
            {user ?
                <div>
                    <ProfilePicture/>
                    <ProfileForm user={user} setUser={setUser} postEdit={postEdit} setError={setError}
                                 loading={loading} error={error}/>
                </div>
                :
                <div className="loading-spinner">
                    <CircularProgress/>
                </div>
            }
        </main>
    )
};

// TODO: Add support for profile pictures
const ProfilePicture = () => {
    return (
        <section className="picture">
            <div className="image">
                <img src={Placeholder} alt=""/>
            </div>
            <p>Change Profile Picture</p>
        </section>
    )
};

interface FormProps {
    user: any;
    setUser: any;
    postEdit: any;
    error: string;
    setError: any;
    loading: boolean;
}

const ProfileForm = (props: FormProps) => {
    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.persist();
        props.setUser({
            ...props.user,
            [event.target.name]: event.target.value
        });
    };
    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        if (event) {
            event.preventDefault();
        }
        props.postEdit();
    };
    return (
        <section className="profile">
            <form onSubmit={onSubmit} autoComplete="off">
                <input type="username"
                       id="username"
                       name="username"
                       placeholder="Username"
                       value={props.user.username || ''}
                       onChange={onChange}
                       required
                />
                <input type="email"
                       id="email"
                       name="email"
                       placeholder="Email"
                       value={props.user.email || ''}
                       onChange={onChange}
                       required
                />
                <input type="city"
                       id="city"
                       name="city"
                       placeholder="City"
                       value={props.user.city || ''}
                       onChange={onChange}
                       required
                />
                <input type="state"
                       id="state"
                       name="state"
                       placeholder="State"
                       value={props.user.state || ''}
                       onChange={onChange}
                       required
                />
                <input type="country"
                       id="country"
                       name="country"
                       placeholder="Country"
                       value={props.user.country || ''}
                       onChange={onChange}
                       required
                />
                {props.loading ?
                    <button type="button"><CircularProgress size={18} color="primary"/></button>
                    :
                    <button>Save Changes</button>
                }
                {props.error ? <p className="form-error">{props.error}</p> : ''}
            </form>
            <Link to={`/profile/${props.user.username}`}>Back to profile</Link>
        </section>
    );
};