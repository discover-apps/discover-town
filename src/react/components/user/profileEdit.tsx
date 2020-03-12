import React, {ChangeEvent, FormEvent, useState} from 'react';
import Placeholder from '../../../assets/img/placeholder_person.jpg';
import {useHistory} from "react-router-dom";

export const ProfileEdit = () => {

    const history = useHistory();
    const [error, setError] = useState('');
    const [user, setUser] = useState({
        username: '',
        email: '',
        city: '',
        state: '',
        country: ''
    });

    const postEdit = () => {
        // clear error (if any)
        setError('');
        console.log(user);
    };

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.persist();
        setUser({
            ...user,
            [event.target.name]: event.target.value
        });
    };

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        if (event) {
            event.preventDefault();
        }
        postEdit();
    };

    return (
        <main className="profile-edit">
            <h3>Edit Profile</h3>
            <section className="picture">
                <div className="image">
                    <img src={Placeholder} alt=""/>
                </div>
                <p>Change Profile Picture</p>
            </section>
            <section className="profile">
                <form onSubmit={onSubmit}>
                    <input type="username"
                           id="username"
                           name="username"
                           placeholder="Username"
                           onChange={onChange}
                           required
                    />
                    <input type="email"
                           id="email"
                           name="email"
                           placeholder="Email"
                           onChange={onChange}
                           required
                    />
                    <input type="city"
                           id="city"
                           name="city"
                           placeholder="City"
                           onChange={onChange}
                           required
                    />
                    <input type="state"
                           id="state"
                           name="state"
                           placeholder="State"
                           onChange={onChange}
                           required
                    />
                    <input type="country"
                           id="country"
                           name="country"
                           placeholder="Country"
                           onChange={onChange}
                           required
                    />
                    <button>Save Changes</button>
                </form>
            </section>
        </main>
    )
};