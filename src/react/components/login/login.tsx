import React, {ChangeEvent, FormEvent, useState} from 'react';
import OAuthButton from './oauthButton';
import {loginUser} from "../../api/auth.api";
import {Session} from "../../models/session.model";
import {useHistory} from 'react-router-dom';
import {authorizeClient} from "../../util/auth";

export const Login = () => {

    const history = useHistory();
    const [login, setLogin] = useState({email: '', password: ''});
    const [error, setError] = useState('');

    const postLogin = () => {
        // clear error (if any)
        setError('');
        loginUser(login.email, login.password).then(async (session: Session) => {
            // authorize client
            await authorizeClient(session.accessToken);
            // redirect to profile page
            history.push(`/profile/`);
        }).catch((error) => {
            setError(error.response.data);
        });
    };

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.persist();
        setLogin({
            ...login,
            [event.target.name]: event.target.value
        });
    };

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        if (event) {
            event.preventDefault();
        }
        postLogin();
    };

    return <main className="login_container paper elevation-3">
        <section className="oauth">
            <OAuthButton platform="facebook"/>
            <OAuthButton platform="google"/>
        </section>
        <h4>OR</h4>
        <section className="credentials">
            <form onSubmit={onSubmit}>
                <input type="email"
                       id="email"
                       name="email"
                       placeholder="Email address"
                       onChange={onChange}
                       required
                />
                <input type="password"
                       id="password"
                       name="password"
                       placeholder="Password"
                       onChange={onChange}
                       required
                />
                <button>Log in</button>
            </form>
            {error ? <p className="error">{error}</p> : ''}
        </section>
        <section>
            <p><a href="#">Forgot your password?</a></p>
            <p>Don't have an account? <a href="/register">Create one</a></p>
        </section>
    </main>
};

export default Login;