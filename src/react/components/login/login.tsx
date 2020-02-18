import React from 'React';
import OAuthButton from './oauthButton';

export const Login = () => {
    return <main className="login_container paper elevation-3">
        <section className="oauth">
            <OAuthButton platform="facebook"/>
            <OAuthButton platform="google"/>
        </section>
        <h4>OR</h4>
        <section className="credentials">
            <form>
                <input type="email" id="email" name="email" placeholder="Email address"/>
                <input type="password" id="password" name="password" placeholder="Password"/>
                <button>Log in</button>
            </form>
        </section>
        <p><a href="#">Forgot your password?</a></p>
        <p>Don't have an account? <a href="#">Create one</a></p>
    </main>
};

export default Login;