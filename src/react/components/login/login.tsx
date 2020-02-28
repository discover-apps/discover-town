import React, {ChangeEvent, FormEvent, useState} from 'react';
import OAuthButton from './oauthButton';
import {loginUser} from "../../api/auth/auth";
import {User} from "../../models/user";

export const Login = () => {

    const [login, setLogin] = useState({email: '', password: ''});

    const postLogin = () => {
        loginUser(login.email, login.password).then((user: User) => {
            console.log('successfully logged in user ', user.email);
        }).catch((error: string) => {
            console.log(error);
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
                />
                <input type="password"
                       id="password"
                       name="password"
                       placeholder="Password"
                       onChange={onChange}
                />
                <button>Log in</button>
            </form>
        </section>
        <section>
            <p><a href="#">Forgot your password?</a></p>
            <p>Don't have an account? <a href="/register">Create one</a></p>
        </section>
    </main>
};

export default Login;