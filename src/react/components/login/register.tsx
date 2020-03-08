import React, {ChangeEvent, FormEvent, useState} from 'react';
import OAuthButton from "./oauthButton";
import {useHistory} from "react-router-dom";
import {registerUser} from "../../api/auth.api";
import {RegisterUser} from "../../models/user.model";
import {Session} from "../../models/session.model";
import {authorizeClient} from "../../util/auth";

export const Register = () => {

    const history = useHistory();
    const [user, setUser] = useState<RegisterUser>({name: '', email: '', password: '', confirm: ''});
    const [error, setError] = useState('');

    const postRegister = () => {
        // clear error
        setError('');
        registerUser(user).then(async (session: Session) => {
            // authorize client
            await authorizeClient(session.accessToken);
            // redirect to profile page
            history.push('/profile');
        }).catch((error) => {
            setError(error.response.data);
        });
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
        postRegister();
    };

    return (
        <main className="register_container paper elevation-3">
            <section className="oauth">
                <OAuthButton platform="facebook"/>
                <OAuthButton platform="google"/>
            </section>
            <h4>OR</h4>
            <section className="credentials">
                <form onSubmit={onSubmit}>
                    <input type="text"
                           id="name"
                           name="name"
                           placeholder="Your name"
                           onChange={onChange}
                    />
                    <input type="text"
                           id="email"
                           name="email"
                           placeholder="Email address"
                           onChange={onChange}
                    />
                    <input type="password"
                           id="password"
                           name="password"
                           placeholder="Password"
                           onChange={onChange}
                    />
                    <input type="password"
                           id="confirm"
                           name="confirm"
                           placeholder="Confirm Password"
                           onChange={onChange}
                    />
                    <p>Your name is public. We'll use your email address to send you updates, and your location to find
                        events near you.</p>
                    <button>Create account</button>
                </form>
            </section>
            <section className="policy">
                <p>When you "Continue", you agree to our <a href="#">Terms of Service</a>.</p>
                <p>We will manage information about you as described in our <a href="#">Privacy Policy</a>, and <a
                    href="#">Cookie Policy</a>.</p>
                <hr/>
                <p>Already a member? <a href="/login">Log in</a></p>
            </section>
        </main>
    )
};

export default Register;