import React, {ChangeEvent, FormEvent, useState} from 'react';
import OAuthButton from './oauthButton';
import {loginUser} from "../../api/auth.api";
import {AxiosError} from 'axios';
import {Session} from "../../models/session.model";
import {useDispatch} from "react-redux";
import {setJwt} from "../../store/actions/auth.action";

export const Login = () => {

    const dispatch = useDispatch();
    const [login, setLogin] = useState({email: '', password: ''});

    const postLogin = () => {
        loginUser(login.email, login.password).then((session: Session) => {
            console.log('successfully logged in user');
            console.log(session);
            // add jwt to localstorage and redux store
            dispatch(setJwt(session.refreshToken));
        }).catch((error: AxiosError) => {
            console.log(error.response.data);
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